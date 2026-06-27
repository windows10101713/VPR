const http = require('http');
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');
const { spawn, execSync } = require('child_process');
const PORT = Number(process.env.PORT || 8080);
const AI_MAX_OUTPUT_TOKENS = 2048;
const AI_REQUEST_TIMEOUT_MS = 90000;
const MAX_JSON_BODY_BYTES = 1024 * 1024; // 1MB
const ENABLE_TERMINAL_EXEC = process.env.VPR_ENABLE_TERMINAL_EXEC === '1';
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'vpr.db');
const activeProcesses = new Map();
let processIdCounter = 0;
const requestBuckets = new Map();

function isLoopbackAddress(addr) {
  const value = String(addr || '').trim();
  return (
    value === '127.0.0.1' ||
    value === '::1' ||
    value === '::ffff:127.0.0.1' ||
    value === '::ffff:localhost' ||
    value === 'localhost'
  );
}

function getClientAddress(req) {
  return String(req?.socket?.remoteAddress || req?.connection?.remoteAddress || '').trim();
}

function applySecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
}

function isRateLimited(req, key, limit, windowMs) {
  const client = getClientAddress(req) || 'unknown';
  const bucketKey = `${client}:${key}`;
  const now = Date.now();
  const bucket = requestBuckets.get(bucketKey) || [];
  const active = bucket.filter((ts) => now - ts < windowMs);
  if (active.length >= limit) {
    requestBuckets.set(bucketKey, active);
    return true;
  }
  active.push(now);
  requestBuckets.set(bucketKey, active);
  return false;
}

function getRequestErrorStatus(error) {
  const message = String(error?.message || '');
  if (message === 'Payload too large') {
    return 413;
  }
  if (/JSON|Unexpected token|unexpected end of JSON input/i.test(message)) {
    return 400;
  }
  return 500;
}

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new DatabaseSync(DB_PATH);
db.exec(`
CREATE TABLE IF NOT EXISTS projects (
  name TEXT PRIMARY KEY,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  updatedAt INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS public_snippets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  author TEXT NOT NULL,
  createdAt INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  username TEXT PRIMARY KEY,
  passwordHash TEXT NOT NULL,
  profileJson TEXT NOT NULL
);
`);

const selectProjectsStmt = db.prepare('SELECT name, language, code, updatedAt FROM projects ORDER BY updatedAt DESC');
const deleteProjectsStmt = db.prepare('DELETE FROM projects');
const insertProjectStmt = db.prepare('INSERT OR REPLACE INTO projects (name, language, code, updatedAt) VALUES (?, ?, ?, ?)');

const selectPublicSnippetsStmt = db.prepare('SELECT title, description, language, code, author, createdAt FROM public_snippets ORDER BY createdAt DESC');
const deletePublicSnippetsStmt = db.prepare('DELETE FROM public_snippets');
const insertPublicSnippetStmt = db.prepare(
  'INSERT INTO public_snippets (title, description, language, code, author, createdAt) VALUES (?, ?, ?, ?, ?, ?)'
);

const selectUsersStmt = db.prepare('SELECT username, passwordHash, profileJson FROM users ORDER BY username ASC');
const deleteUsersStmt = db.prepare('DELETE FROM users');
const insertUserStmt = db.prepare('INSERT OR REPLACE INTO users (username, passwordHash, profileJson) VALUES (?, ?, ?)');

function runInTransaction(work) {
  db.exec('BEGIN');
  try {
    work();
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

function replaceProjects(projects) {
  runInTransaction(() => {
    deleteProjectsStmt.run();
    for (const project of projects) {
      insertProjectStmt.run(project.name, project.language, project.code, Number(project.updatedAt) || Date.now());
    }
  });
}

function replacePublicSnippets(items) {
  runInTransaction(() => {
    deletePublicSnippetsStmt.run();
    for (const item of items) {
      insertPublicSnippetStmt.run(
        item.title,
        item.description || '',
        item.language,
        item.code,
        item.author,
        Number(item.createdAt) || Date.now()
      );
    }
  });
}

function replaceUsers(users) {
  runInTransaction(() => {
    deleteUsersStmt.run();
    for (const user of users) {
      const profileJson = JSON.stringify(user.profile || {});
      insertUserStmt.run(user.username, user.passwordHash, profileJson);
    }
  });
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const declaredLength = Number(req.headers['content-length'] || 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_JSON_BODY_BYTES) {
      return reject(new Error('Payload too large'));
    }

    let body = '';
    let totalBytes = 0;
    req.on('data', (chunk) => {
      totalBytes += Buffer.byteLength(chunk);
      if (totalBytes > MAX_JSON_BODY_BYTES) {
        reject(new Error('Payload too large'));
        try {
          req.destroy();
        } catch {
          // no-op
        }
        return;
      }
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

function detectInputPatterns(code, language) {
  const patterns = {
    python: {
      input: [/input\s*\(/gi, /sys\.stdin\.read/gi, /input_raw\s*\(/gi, /raw_input\s*\(/gi],
      gui: [/^import\s+(tkinter|pygame|ursina|pyopengl|pyglet|arcade)/gim, /from\s+(tkinter|pygame|ursina|pyopengl|pyglet|arcade)/gim],
    },
    javascript: {
      input: [/prompt\s*\(/gi, /readline\s*\(/gi, /require\s*\(['"]readline/gi],
      gui: [/require\s*\(['"]electron/gi, /import.*electron/gi],
    },
    typescript: {
      input: [/prompt\s*\(/gi, /readline\s*\(/gi, /require\s*\(['"]readline/gi],
      gui: [/require\s*\(['"]electron/gi, /import.*electron/gi],
    },
    c: {
      input: [/scanf\s*\(/gi, /gets\s*\(/gi, /fgets\s*\(/gi, /getchar\s*\(/gi],
      gui: [/SDL_/gi, /GLFW_/gi, /allegro_/gi],
    },
    cpp: {
      input: [/cin\s*>>/gi, /scanf\s*\(/gi, /gets\s*\(/gi, /fgets\s*\(/gi, /getchar\s*\(/gi],
      gui: [/SDL_/gi, /GLFW_/gi, /allegro_/gi, /Qt::/gi],
    },
    'c#': {
      input: [/Console\.Read/gi, /ReadLine/gi, /reader\.Read/gi],
      gui: [/using\s+System\.Windows\./gi, /WinForms/gi, /WPF/gi],
    },
    java: {
      input: [/Scanner\s*\(/gi, /BufferedReader\s*\(/gi, /readLine\s*\(/gi, /System\.in/gi],
      gui: [/import\s+javax\.swing/gi, /JFrame/gi, /JDialog/gi, /import\s+javafx/gi],
    },
    go: {
      input: [/bufio\./gi, /fmt\.Scan/gi, /fmt\.Scanf/gi],
      gui: [/github\.com\/getlantern\/lantern-ui/gi, /fyne/gi],
    },
    rust: {
      input: [/stdin\s*\(/gi, /read_line\s*\(/gi, /std::io/gi],
      gui: [],
    },
    fortran: {
      input: [/read\s*\(/gi, /^\s*read\b/gim],
      gui: [],
    },
    zig: {
      input: [/stdin\s*\(/gi, /readUntilDelimiter/gi, /reader\s*\(/gi],
      gui: [],
    },
    asm: {
      input: [],
      gui: [],
    },
    ruby: {
      input: [/gets(\s*\(|\s|$)/gi, /STDIN\./gi, /readline\s*\(/gi],
      gui: [/require.*gtk/gi, /require.*shoes/gi, /require.*tk/gi],
    },
    sql: {
      input: [],
      gui: [],
    },
    bash: {
      input: [/read\s+/gi, /read\s+-/gi],
      gui: [/zenity/gi, /dialog/gi, /whiptail/gi],
    },
    powershell: {
      input: [/Read-Host/gi, /Get-Content/gi],
      gui: [/\[Windows\.Forms/gi, /Add-Type.*PresentationFramework/gi],
    },
  };

  const lang = language.toLowerCase().replace(/\+\+/g, 'cpp');
  const langPatterns = patterns[lang] || { input: [], gui: [] };

  const hasInput = langPatterns.input.some(pattern => pattern.test(code));
  const hasGui = langPatterns.gui.some(pattern => pattern.test(code));

  return { hasInput, hasGui };
}

function runShellCommand(command, stdinText = '', timeoutMs = 15000, cwd = __dirname) {
  return new Promise((resolve) => {
    const isWindows = process.platform === 'win32';
    const fullCmd = isWindows ? `chcp 65001 > nul & ${command}` : command;

    const child = spawn(fullCmd, {
      shell: true,
      cwd,
      env: {
        ...process.env,
        PYTHONIOENCODING: 'utf-8',
        LANG: 'en_US.UTF-8',
        LC_ALL: 'en_US.UTF-8'
      }
    });
    const stdoutChunks = [];
    const stderrChunks = [];
    let stdout = '';
    let stderr = '';
    let finished = false;

    const timer = setTimeout(() => {
      if (!finished) {
        child.kill('SIGTERM');
        stderr += '\nProcess timed out';
      }
    }, timeoutMs);

    child.stdout.on('data', (chunk) => {
      stdoutChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    child.stderr.on('data', (chunk) => {
      stderrChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    child.on('close', (code) => {
      if (finished) {
        return;
      }
      finished = true;
      clearTimeout(timer);
      stdout = decodeShellOutput(Buffer.concat(stdoutChunks), isWindows);
      stderr = decodeShellOutput(Buffer.concat(stderrChunks), isWindows);
      resolve({ stdout, stderr, code: Number.isInteger(code) ? code : 1 });
    });

    child.on('error', (error) => {
      if (finished) {
        return;
      }
      finished = true;
      clearTimeout(timer);
      resolve({ stdout, stderr: `${stderr}\n${error.message}`.trim(), code: 1 });
    });

    if (stdinText) {
      child.stdin.write(String(stdinText));
      if (!String(stdinText).endsWith('\n')) {
        child.stdin.write('\n');
      }
    }
    child.stdin.end();
  });
}

function decodeShellOutput(buffer, isWindows) {
  if (!buffer || buffer.length === 0) {
    return '';
  }

  const utf8 = buffer.toString('utf8');
  if (!isWindows || !utf8.includes('\uFFFD')) {
    return utf8;
  }

  try {
    return new TextDecoder('euc-kr').decode(buffer);
  } catch {
    return utf8;
  }
}

function looksLikeLegacyDosAsm(code) {
  const text = String(code || '').toLowerCase();
  return [
    /(^|\n)\s*\.model\b/,
    /(^|\n)\s*\.stack\b/,
    /(^|\n)\s*\.code\b/,
    /(^|\n)\s*\.data\b/,
    /\bmain\s+proc\b/,
    /\bendp\b/,
    /\bint\s+21h\b/,
    /\bmov\s+ax\s*,\s*@data\b/,
    /\bdb\b.*\$/,
  ].some((pattern) => pattern.test(text));
}

function buildHuggingFaceModelEndpoint(baseEndpoint, model) {
  const cleanBase = String(baseEndpoint || '').replace(/\/+$/, '');
  const safeModel = String(model || '')
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');
  if (cleanBase.includes('{model}')) {
    return cleanBase.replace('{model}', safeModel);
  }
  if (cleanBase.endsWith(`/${safeModel}`) || cleanBase.endsWith(`/${model}`)) {
    return cleanBase;
  }
  return `${cleanBase}/${safeModel}`;
}

async function probeHuggingFaceModel({ endpoint, model, apiKey }) {
  const resolvedKey = String(apiKey || process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || '').trim();
  if (!resolvedKey) {
    return { ok: false, status: 401, message: 'Missing Hugging Face token' };
  }

  const url = buildHuggingFaceModelEndpoint(endpoint, model);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${resolvedKey}`,
    },
    body: JSON.stringify({
      inputs: 'hello',
      parameters: { max_new_tokens: 32, temperature: 0.2 },
    }),
    timeout: 30000,
  });

  const rawText = await response.text();
  let data = {};
  try {
    data = rawText ? JSON.parse(rawText) : {};
  } catch {
    data = { message: rawText };
  }

  if (!response.ok) {
    const message = String(data.error || data.message || `HTTP ${response.status}`);
    return { ok: false, status: response.status, message };
  }

  if (Array.isArray(data)) {
    if (data[0]?.generated_text || data[0]?.summary_text || data[0]?.translation_text || data[0]?.score !== undefined) {
      return { ok: true, status: response.status, message: 'ok' };
    }
  }
  if (typeof data.generated_text === 'string' || typeof data.summary_text === 'string' || typeof data.translation_text === 'string') {
    return { ok: true, status: response.status, message: 'ok' };
  }

  return { ok: false, status: response.status, message: 'Unexpected response format' };
}

async function callAiProvider({ provider, endpoint, model, apiKey, prompt }) {
  if (provider !== 'huggingface') {
    throw new Error(`Unsupported AI provider: ${provider}. Only Hugging Face (free) is available.`);
  }

  const normalizedModel = String(model || '').trim() || 'HuggingFaceBio/Carbon-3B';

  const headers = { 'Content-Type': 'application/json; charset=utf-8' };
  const resolvedKey = String(apiKey || process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || '').trim();
  if (!resolvedKey) {
    throw new Error('Hugging Face 토큰이 필요합니다. API Key 입력 또는 HF_TOKEN/HUGGINGFACE_API_KEY 환경변수를 설정하세요.');
  }
  headers.Authorization = `Bearer ${resolvedKey}`;
  const useRouterChatCompletions = /router\.huggingface\.co/i.test(String(endpoint || ''));

  async function requestModel(targetModel) {
    if (useRouterChatCompletions) {
      const chatUrl = 'https://router.huggingface.co/v1/chat/completions';
      const chatBody = JSON.stringify({
        model: targetModel,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: AI_MAX_OUTPUT_TOKENS,
        temperature: 0.4,
      });

      const chatResponse = await fetch(chatUrl, {
        method: 'POST',
        headers,
        body: chatBody,
        timeout: AI_REQUEST_TIMEOUT_MS,
      });

      const chatRaw = await chatResponse.text();
      let chatData = {};
      try {
        chatData = chatRaw ? JSON.parse(chatRaw) : {};
      } catch {
        chatData = { message: chatRaw };
      }

      if (chatResponse.ok) {
        return { response: chatResponse, data: chatData, url: chatUrl, targetModel };
      }
    }

    const inferenceUrl = buildHuggingFaceModelEndpoint(endpoint, targetModel);
    const inferenceBody = JSON.stringify({
      inputs: prompt,
      parameters: { max_new_tokens: AI_MAX_OUTPUT_TOKENS, temperature: 0.4 },
    });

    const response = await fetch(inferenceUrl, {
      method: 'POST',
      headers,
      body: inferenceBody,
      timeout: AI_REQUEST_TIMEOUT_MS,
    });

    const rawText = await response.text();
    let data = {};
    try {
      data = rawText ? JSON.parse(rawText) : {};
    } catch {
      data = { message: rawText };
    }
    return { response, data, url: inferenceUrl, targetModel };
  }

  function extractOutput(data) {
    const trimPromptEcho = (value) => {
      const text = String(value || '').trim();
      const promptText = String(prompt || '').trim();
      if (!text) return '';
      if (promptText && text.startsWith(promptText)) {
        const withoutPrompt = text.slice(promptText.length).trim();
        return withoutPrompt || text;
      }
      return text;
    };

    if (Array.isArray(data)) {
      if (data[0]?.generated_text) {
        return trimPromptEcho(data[0].generated_text);
      }
      if (data[0]?.summary_text) {
        return trimPromptEcho(data[0].summary_text);
      }
      if (data[0]?.translation_text) {
        return trimPromptEcho(data[0].translation_text);
      }
      if (data[0]?.score !== undefined) {
        return JSON.stringify(data, null, 2);
      }
    }

    if (Array.isArray(data?.choices) && data.choices[0]?.message?.content) {
      return trimPromptEcho(data.choices[0].message.content);
    }

    if (typeof data.generated_text === 'string') {
      return trimPromptEcho(data.generated_text);
    }

    if (typeof data.summary_text === 'string') {
      return trimPromptEcho(data.summary_text);
    }

    if (typeof data.translation_text === 'string') {
      return trimPromptEcho(data.translation_text);
    }

    if (typeof data.result === 'string') {
      return trimPromptEcho(data.result);
    }

    if (typeof data === 'string') {
      return trimPromptEcho(data);
    }

    return '';
  }

  const fallbackModels = [
    'HuggingFaceBio/Carbon-3B',
    'Qwen/Qwen2.5-Coder-32B-Instruct',
    'Qwen/Qwen2.5-7B-Instruct',
    'microsoft/Phi-3-mini-4k-instruct',
    'meta-llama/Llama-3.1-8B-Instruct',
    'mistralai/Mistral-7B-Instruct-v0.3',
  ];
  
  try {
    let attempt = await requestModel(normalizedModel);

    if (!attempt.response.ok) {
      const errorMsg = String(attempt.data?.error || attempt.data?.message || `Hugging Face request failed (${attempt.response.status})`);
      console.error(`[HF API] ${attempt.targetModel} -> Status ${attempt.response.status}: ${errorMsg}`);

      if (attempt.response.status === 401 || attempt.response.status === 403) {
        throw new Error('Hugging Face 토큰이 유효하지 않습니다. 새 Access Token(Read 권한)으로 다시 설정하세요.');
      }

      const unsupportedModel =
        attempt.response.status === 404 ||
        /model not supported by provider hf-inference/i.test(errorMsg) ||
        /model not supported/i.test(errorMsg) ||
        /unsupported model/i.test(errorMsg) ||
        /model not found/i.test(errorMsg) ||
        /not found/i.test(errorMsg) ||
        /index out of range in self/i.test(errorMsg) ||
        /index out of range/i.test(errorMsg);
      if (unsupportedModel) {
        const candidates = fallbackModels.filter((m) => m !== normalizedModel);
        for (const candidate of candidates) {
          const fallbackAttempt = await requestModel(candidate);
          if (!fallbackAttempt.response.ok) {
            const fallbackError = String(
              fallbackAttempt.data?.error || fallbackAttempt.data?.message || `Hugging Face request failed (${fallbackAttempt.response.status})`
            );
            console.error(`[HF API] ${candidate} -> Status ${fallbackAttempt.response.status}: ${fallbackError}`);
            continue;
          }

          const fallbackOutput = extractOutput(fallbackAttempt.data);
          if (fallbackOutput) {
            return fallbackOutput;
          }
        }

        throw new Error(
          `선택 모델(${normalizedModel})이 hf-inference에서 지원되지 않습니다.\n` +
          `다른 모델을 선택하세요: ${fallbackModels.join(', ')}`
        );
      }

      if (attempt.response.status === 503 || attempt.response.status === 500) {
        throw new Error(`모델 로딩 중 (나중에 다시 시도): ${errorMsg}`);
      }

      throw new Error(errorMsg);
    }

    const output = extractOutput(attempt.data);
    if (output) {
      return output;
    }

    if (Array.isArray(attempt.data) && attempt.data.length === 0) {
      throw new Error('모델이 로딩 중입니다 - 나중에 다시 시도하세요.');
    }

    console.error('[HF API] Unexpected response format:', JSON.stringify(attempt.data).slice(0, 200));
    throw new Error('Hugging Face response format을 인식하지 못했습니다. API 키를 추가하거나 다른 모델을 선택해보세요.');
  } catch (error) {
    if (error.message.includes('모델 로딩') || error.message.includes('인식하지 못')) {
      throw error;
    }
    const causeMessage = error?.cause?.message ? String(error.cause.message) : '';
    const causeCode = error?.cause?.code ? String(error.cause.code) : '';
    const parts = [
      `Hugging Face 연결 실패: ${error.message}`,
      causeCode ? `원인 코드: ${causeCode}` : '',
      causeMessage ? `원인 상세: ${causeMessage}` : '',
      `endpoint: ${endpoint}`,
      `model: ${normalizedModel}`,
    ].filter(Boolean);
    throw new Error(parts.join('\n'));
  }
}

// Check if command exists in system
function commandExists(cmd) {
  try {
    const isWindows = process.platform === 'win32';
    execSync(isWindows ? `where ${cmd}` : `which ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Check if python is actually a real interpreter (not Windows Store alias)
function pythonRealExists(pythonCmd) {
  try {
    const out = execSync(`${pythonCmd} --version 2>&1`, { stdio: 'pipe' }).toString();
    return /Python \d+\.\d+/.test(out);
  } catch {
    return false;
  }
}

function requireCommand(cmd, language) {
  if (!commandExists(cmd)) {
    throw new Error(`Runtime for ${language} is not installed: missing command '${cmd}'`);
  }
}

function resolvePreferredTool(candidates, fallback = '') {
  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) {
      return `"${candidate}"`;
    }
  }
  return fallback;
}

function cleanupPath(targetPath) {
  try {
    if (!fs.existsSync(targetPath)) {
      return;
    }
    const stat = fs.statSync(targetPath);
    if (stat.isDirectory()) {
      fs.rmSync(targetPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(targetPath);
    }
  } catch {
    // best-effort cleanup
  }
}

function cleanupStaleTempArtifacts() {
  try {
    const entries = fs.readdirSync(__dirname);
    for (const entry of entries) {
      if (entry.startsWith('temp_') || entry === 'Main.java' || entry === 'Main.class') {
        cleanupPath(path.join(__dirname, entry));
      }
    }
  } catch {
    // best-effort startup cleanup
  }
}

function resolveDotnetHost() {
  const host = 'C:\\Program Files\\dotnet\\dotnet.exe';
  if (fs.existsSync(host)) {
    return `"${host}"`;
  }
  return 'dotnet';
}

// Supported languages and their commands
const languages = {
  javascript: { cmd: 'node', ext: 'js', installed: true },
  typescript: { cmd: 'ts-node', ext: 'ts', fallback: 'npx ts-node' },
  python: { cmd: 'python', ext: 'py' },
  c: { cmd: 'gcc', ext: 'c', compile: true },
  cpp: { cmd: 'g++', ext: 'cpp', compile: true },
  'c++': { cmd: 'g++', ext: 'cpp', compile: true },
  csharp: { cmd: 'csc', ext: 'cs', compile: true },
  java: { cmd: 'javac', ext: 'java', compile: true },
  go: { cmd: 'go', ext: 'go' },
  rust: { cmd: 'rustc', ext: 'rs', compile: true },
  fortran: { cmd: 'gfortran', ext: 'f90', compile: true },
  zig: { cmd: 'zig', ext: 'zig', compile: true },
  asm: { cmd: 'gcc', ext: 's', compile: true },
  'asm-x64': { cmd: 'gcc', ext: 's', compile: true },
  'asm-nasm': { cmd: 'nasm', ext: 'asm', compile: true },
  ruby: { cmd: 'ruby', ext: 'rb' },
  sql: { cmd: 'sqlite3', ext: 'sql' },
  bash: { cmd: 'bash', ext: 'sh' },
  powershell: { cmd: 'pwsh', ext: 'ps1' },
};

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, 'http://localhost');
  const pathname = requestUrl.pathname;
  const origin = String(req.headers.origin || '').trim();
  const clientAddr = getClientAddress(req);

  applySecurityHeaders(res);

  const isAllowedOrigin =
    !origin ||
    origin === 'null' ||
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin) ||
    /^https:\/\/[a-zA-Z0-9-]+\.azurewebsites\.net$/.test(origin);

  if (isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    return res.writeHead(200), res.end();
  }

  if (pathname === '/api/data/health' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.writeHead(200);
    res.end(JSON.stringify({ ok: true, dbPath: DB_PATH }));
    return;
  }

  if (pathname === '/api/data/projects' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.writeHead(200);
    res.end(JSON.stringify({ projects: selectProjectsStmt.all() }));
    return;
  }

  if (pathname === '/api/data/projects/bulk' && req.method === 'POST') {
    if (isRateLimited(req, 'projects-bulk', 20, 60_000)) {
      res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: 'Too many requests' }));
      return;
    }
    try {
      const payload = await readJsonBody(req);
      const projects = Array.isArray(payload.projects) ? payload.projects : [];
      replaceProjects(projects);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: true, count: projects.length }));
    } catch (error) {
      res.writeHead(getRequestErrorStatus(error), { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: error.message }));
    }
    return;
  }

  if (pathname === '/api/data/public-snippets' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ items: selectPublicSnippetsStmt.all() }));
    return;
  }

  if (pathname === '/api/data/public-snippets/bulk' && req.method === 'POST') {
    if (isRateLimited(req, 'snippets-bulk', 20, 60_000)) {
      res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: 'Too many requests' }));
      return;
    }
    try {
      const payload = await readJsonBody(req);
      const items = Array.isArray(payload.items) ? payload.items : [];
      replacePublicSnippets(items);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: true, count: items.length }));
    } catch (error) {
      res.writeHead(getRequestErrorStatus(error), { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: error.message }));
    }
    return;
  }

  if (pathname === '/api/data/users' && req.method === 'GET') {
    const users = selectUsersStmt.all().map((user) => {
      let profile = {};
      try {
        profile = JSON.parse(user.profileJson || '{}');
      } catch {
        profile = {};
      }
      return {
        username: user.username,
        passwordHash: user.passwordHash,
        profile,
      };
    });
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ users }));
    return;
  }

  if (pathname === '/api/data/users/bulk' && req.method === 'POST') {
    if (isRateLimited(req, 'users-bulk', 10, 60_000)) {
      res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: 'Too many requests' }));
      return;
    }
    try {
      const payload = await readJsonBody(req);
      const users = Array.isArray(payload.users) ? payload.users : [];
      replaceUsers(users);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: true, count: users.length }));
    } catch (error) {
      res.writeHead(getRequestErrorStatus(error), { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: error.message }));
    }
    return;
  }

  if (pathname === '/api/ai/chat' && req.method === 'POST') {
    if (isRateLimited(req, 'ai-chat', 60, 60_000)) {
      res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: 'Too many AI requests' }));
      return;
    }
    try {
      const { provider, endpoint, model, apiKey, prompt } = await readJsonBody(req);
      if (!provider || !endpoint || !model || !prompt) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ message: 'Missing required fields: provider, endpoint, model, prompt' }));
      }

      const output = await callAiProvider({
        provider: String(provider),
        endpoint: String(endpoint),
        model: String(model),
        apiKey: String(apiKey || ''),
        prompt: String(prompt),
      });

      if (!output) {
        throw new Error('AI provider returned empty response');
      }

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ output }));
    } catch (error) {
      console.error('[AI ERROR]', error.message);
      res.writeHead(getRequestErrorStatus(error), { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: error.message }));
    }
    return;
  }

  if (pathname === '/api/ai/models/audit' && req.method === 'POST') {
    try {
      const payload = await readJsonBody(req);
      const endpoint = String(payload.endpoint || 'https://router.huggingface.co/hf-inference/models').trim();
      const apiKey = String(payload.apiKey || '').trim();
      const models = Array.isArray(payload.models)
        ? [...new Set(payload.models.map((m) => String(m || '').trim()).filter(Boolean))]
        : [];

      if (!models.length) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ message: 'No models to audit' }));
      }

      const working = [];
      const failed = [];
      for (const model of models) {
        const result = await probeHuggingFaceModel({ endpoint, model, apiKey });
        if (result.ok) {
          working.push({ model, status: result.status });
        } else {
          failed.push({ model, status: result.status, reason: result.message });
        }
      }

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        endpoint,
        total: models.length,
        working,
        failed,
      }));
    } catch (error) {
      res.writeHead(getRequestErrorStatus(error), { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: error.message }));
    }
    return;
  }

  if (pathname === '/api/terminal/exec' && req.method === 'POST') {
    if (!ENABLE_TERMINAL_EXEC) {
      res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: 'Terminal exec endpoint is disabled by default. Set VPR_ENABLE_TERMINAL_EXEC=1 to enable.' }));
      return;
    }
    if (isRateLimited(req, 'terminal-exec', 10, 60_000)) {
      res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: 'Too many terminal requests' }));
      return;
    }
    try {
      const { command, cwd } = await readJsonBody(req);
      const cmd = String(command || '').trim();
      if (!cmd) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ message: 'Missing command' }));
      }

      const requestedCwd = String(cwd || '').trim();
      const safeCwd = requestedCwd && fs.existsSync(requestedCwd) ? requestedCwd : __dirname;
      const result = await runShellCommand(cmd, '', 120000, safeCwd);

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(
        JSON.stringify({
          ok: result.code === 0,
          code: result.code,
          stdout: String(result.stdout || ''),
          stderr: String(result.stderr || ''),
        })
      );
    } catch (error) {
      res.writeHead(getRequestErrorStatus(error), { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: error.message }));
    }
    return;
  }

  if (pathname === '/api/v2/piston/execute' && req.method === 'POST') {
    if (isRateLimited(req, 'piston-execute', 120, 60_000)) {
      res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: 'Too many execute requests' }));
      return;
    }
    try {
      const { language, files, stdin } = await readJsonBody(req);
        const code = files?.[0]?.content || '';
        const stdinText = String(stdin || '');
        const langInfo = languages[language];

        if (!langInfo) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ message: `Unsupported language: ${language}` }));
        }

        let cmd = '';
        let cleanupFiles = [];
        const tmpFile = path.join(__dirname, `temp_${Date.now()}.${langInfo.ext}`);

        // Real execution only: if runtime is missing, return explicit error.
        if (language === 'javascript') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          // Use the same node binary that is running this server
          cmd = `"${process.execPath}" "${tmpFile}"`;
        } else if (language === 'typescript') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          if (commandExists('tsx')) {
            cmd = `tsx "${tmpFile}"`;
          } else if (commandExists('npx')) {
            cmd = `npx --yes tsx "${tmpFile}"`;
          } else if (commandExists('ts-node')) {
            cmd = `ts-node --transpile-only "${tmpFile}"`;
          } else {
            // Fallback: strip types with a simple regex and run with node
            cmd = `"${process.execPath}" --input-type=module --eval "$(cat '${tmpFile}')"`;
            throw new Error("Runtime for typescript is not installed: missing command 'tsx'/'ts-node' or 'npx'");
          }
        } else if (language === 'python') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          if (pythonRealExists('python')) {
            cmd = `python "${tmpFile}"`;
          } else if (pythonRealExists('python3')) {
            cmd = `python3 "${tmpFile}"`;
          } else {
            throw new Error("Runtime for python is not installed: missing real python interpreter");
          }
        } else if (language === 'c') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          requireCommand('gcc', language);
          const outFile = path.join(__dirname, 'temp_c.exe');
          cmd = `gcc "${tmpFile}" -o "${outFile}" && "${outFile}"`;
          cleanupFiles.push(outFile);
        } else if (language === 'cpp' || language === 'c++') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          requireCommand('g++', language);
          const outFile = path.join(__dirname, 'temp_cpp.exe');
          cmd = `g++ "${tmpFile}" -o "${outFile}" && "${outFile}"`;
          cleanupFiles.push(outFile);
        } else if (language === 'ruby') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          requireCommand('ruby', language);
          cmd = `ruby "${tmpFile}"`;
        } else if (language === 'go') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          requireCommand('go', language);
          cmd = `go run "${tmpFile}"`;
        } else if (language === 'rust') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          requireCommand('rustc', language);
          const outFile = path.join(__dirname, 'temp_rust.exe');
          cmd = `rustc "${tmpFile}" -o "${outFile}" && "${outFile}"`;
          cleanupFiles.push(outFile);
        } else if (language === 'fortran') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          requireCommand('gfortran', language);
          const outFile = path.join(__dirname, 'temp_fortran.exe');
          cmd = `gfortran "${tmpFile}" -o "${outFile}" && "${outFile}"`;
          cleanupFiles.push(outFile);
        } else if (language === 'zig') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          requireCommand('zig', language);
          cmd = `zig run "${tmpFile}"`;
        } else if (language === 'asm' || language === 'asm-x64') {
          if (looksLikeLegacyDosAsm(code)) {
            throw new Error(
              '현재 ASM 실행기는 GCC/GAS x64 문법만 지원합니다. 입력한 코드는 MASM/TASM 16-bit DOS 문법(.model/.stack/.code/proc/int 21h)이라 이 환경에서 바로 실행할 수 없습니다. GAS x64 문법으로 바꾸거나, MASM/TASM + DOSBox 계열 런타임이 필요합니다.'
            );
          }
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          requireCommand('gcc', language);
          const outFile = path.join(__dirname, 'temp_asm.exe');
          cmd = `gcc -x assembler "${tmpFile}" -o "${outFile}" && "${outFile}"`;
          cleanupFiles.push(outFile);
        } else if (language === 'asm-nasm') {
          const nasmHost = resolvePreferredTool([
            'C:\\msys64\\mingw64\\bin\\nasm.exe',
            'C:\\msys64\\clang64\\bin\\nasm.exe',
          ], commandExists('nasm') ? 'nasm' : '');
          if (!nasmHost) {
            throw new Error('Runtime for asm-nasm is not installed: missing command \'nasm\'. 현재 환경에서는 NASM 소스 편집은 가능하지만 실행은 불가합니다.');
          }
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          const objFile = path.join(__dirname, 'temp_nasm.obj');
          const outFile = path.join(__dirname, 'temp_nasm.exe');
          const gcc64 = resolvePreferredTool([
            'C:\\msys64\\mingw64\\bin\\gcc.exe',
          ], commandExists('gcc') ? 'gcc' : '');
          if (!gcc64) {
            throw new Error('Runtime for asm-nasm is not installed: missing GCC linker backend for NASM objects.');
          }
          cmd = `${nasmHost} -f win64 "${tmpFile}" -o "${objFile}" && ${gcc64} "${objFile}" -o "${outFile}" && "${outFile}"`;
          cleanupFiles.push(objFile, outFile);
        } else if (language === 'java') {
          // Java requires filename to match public class name
          const javaFile = path.join(__dirname, 'Main.java');
          fs.writeFileSync(javaFile, code);
          cleanupFiles.push(javaFile);
          cleanupFiles.push(path.join(__dirname, 'Main.class'));
          requireCommand('javac', language);
          requireCommand('java', language);
          cmd = `javac "${javaFile}" && java -cp "${path.dirname(javaFile)}" Main`;
        } else if (language === 'csharp') {
          requireCommand('dotnet', language);
          const dotnetHost = resolveDotnetHost();
          const csDir = path.join(__dirname, `temp_cs_${Date.now()}`);
          fs.mkdirSync(csDir, { recursive: true });
          cleanupFiles.push(csDir);

          const csprojFile = path.join(csDir, 'TempRunner.csproj');
          const programFile = path.join(csDir, 'Program.cs');
          fs.writeFileSync(
            csprojFile,
            `<Project Sdk="Microsoft.NET.Sdk">\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net8.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n</Project>\n`
          );
          fs.writeFileSync(programFile, code);

          cmd = `${dotnetHost} run --project "${csprojFile}" --nologo`;
        } else if (language === 'bash') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          const bashHost = resolvePreferredTool([
            'C:\\msys64\\usr\\bin\\bash.exe',
            'C:\\Program Files\\Git\\bin\\bash.exe',
            'C:\\Program Files\\Git\\usr\\bin\\bash.exe',
          ], commandExists('bash') ? 'bash' : '');
          if (!bashHost) {
            throw new Error("Runtime for bash is not installed: missing command 'bash'");
          }
          cmd = `${bashHost} "${tmpFile}"`;
        } else if (language === 'sql') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          const sqlite3Path = commandExists('sqlite3') ? 'sqlite3' : 'C:\\msys64\\usr\\bin\\sqlite3.exe';
          cmd = `"${sqlite3Path}" < "${tmpFile}"`;
        } else if (language === 'powershell') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          if (commandExists('pwsh')) {
            cmd = `pwsh -NonInteractive -File "${tmpFile}"`;
          } else if (commandExists('powershell')) {
            cmd = `powershell -NonInteractive -File "${tmpFile}"`;
          } else {
            throw new Error("Runtime for powershell is not installed: missing command 'pwsh' or 'powershell'");
          }
        }

        if (!cmd) {
          throw new Error(`Unsupported execution route for language: ${language}`);
        }

        // GUI event-loop apps (e.g., Ursina) do not terminate in this 15s sandbox runner.
        // Return a clear guidance message instead of a confusing command-failed error.
        const preflight = detectInputPatterns(code, language);
        const isGuiEventLoop =
          preflight.hasGui &&
          /\b(app\.run\s*\(|mainloop\s*\(|pygame\.display\.set_mode\s*\()/i.test(String(code || ''));
        if (isGuiEventLoop) {
          const guide =
            'GUI 앱(Ursina/pygame/tkinter 등)은 에디터의 제한 실행기(약 15초)에서 네이티브 창 루프를 유지할 수 없어 자동 종료됩니다.\n' +
            '해결: 터미널에서 직접 실행하세요.\n' +
            '예시: python your_file.py\n\n' +
            '참고: 현재 로그(info: Using primary monitor...)는 창 초기화 로그이며 문법 에러가 아닙니다.';

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            language,
            run: { output: guide, stdout: guide, stderr: '' },
            compile: { output: '' },
            meta: {
              hasInput: preflight.hasInput,
              hasGui: preflight.hasGui,
              inputWarning: preflight.hasInput && !stdinText ? '⚠️ 이 프로그램은 입력(input)을 받기를 기다리는 것으로 보입니다. 좌측 "표준 입력(stdin)" 박스에 값을 입력하고 다시 실행하세요.' : null,
              guiWarning: '⚠️ GUI 루프 앱은 브라우저 실행기에서 유지되지 않습니다. 로컬 터미널에서 실행하세요.'
            }
          }));
          return;
        }

        console.log(`[${language.toUpperCase()}] Executing...`);

        const { stdout, stderr, code: exitCode } = await runShellCommand(cmd, stdinText, 15000, __dirname);

        // Cleanup
        cleanupFiles.forEach(cleanupPath);

        const output = stdout.trim() || stderr.trim() || '(no output)';
        if (exitCode !== 0) {
          throw new Error(`Command failed (${exitCode}): ${output}`);
        }
        console.log(`[RESULT] ${output.substring(0, 60)}`);

        // Detect input patterns and GUI libraries
        const { hasInput, hasGui } = preflight;

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          language,
          run: { output: output, stdout: output, stderr: stderr.trim() },
          compile: { output: stderr.trim() || '' },
          meta: {
            hasInput,
            hasGui,
            inputWarning: hasInput && !stdinText ? '⚠️ 이 프로그램은 입력(input)을 받기를 기다리는 것으로 보입니다. 좌측 "표준 입력(stdin)" 박스에 값을 입력하고 다시 실행하세요.' : null,
            guiWarning: hasGui ? '⚠️ 경고: 이 코드는 GUI 라이브러리(tkinter, pygame, ursina 등)를 사용합니다. 브라우저에서는 네이티브 창으로 렌더링될 수 없습니다. 대안: pyscript, streamlit, 웹 기반 라이브러리 사용을 권장합니다.' : null,
          }
        }));
    } catch (error) {
      if (error.message === 'Payload too large') {
        res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ message: error.message }));
        return;
      }
      console.error('[ERROR]', error.message);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ 
        message: error.message,
        run: { output: `Error: ${error.message}`, stdout: `Error: ${error.message}`, stderr: '' },
        compile: { output: '' },
        meta: { hasInput: false, hasGui: false }
      }));
    }
    return;
  }

  // Interactive execution endpoint - streams output and accepts stdin
  if (pathname === '/api/execute-interactive' && req.method === 'POST') {
    console.log('[Interactive] Request received');
    if (isRateLimited(req, 'interactive-execute', 30, 60_000)) {
      res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: 'Too many interactive requests' }));
      return;
    }
    try {
      const payload = await readJsonBody(req);
        const language = payload.language;
        const files = payload.files;
        const code = files?.[0]?.content || '';
        const langInfo = languages[language];

        console.log(`[Interactive] Language: ${language}, Code length: ${code.length}`);

        if (!langInfo) {
          console.log(`[Interactive] Unsupported language: ${language}`);
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ message: `Unsupported language: ${language}` }));
        }

        const interactiveSupported = new Set(['python', 'javascript', 'bash', 'c']);
        if (!interactiveSupported.has(language)) {
          console.log(`[Interactive] Unsupported interactive language: ${language}`);
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ message: `Interactive mode not yet supported for ${language}` }));
        }

        // Set SSE headers
        res.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        });

        const sessionId = `sess_${++processIdCounter}`;
        console.log(`[Interactive] Session created: ${sessionId}`);
        res.write(`data: ${JSON.stringify({ type: 'session', sessionId })}\n\n`);

        // Build command
        let cmd = '';
        let cleanupFiles = [];
        const tmpFile = path.join(__dirname, `temp_${Date.now()}.${langInfo.ext}`);

        if (language === 'python') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          cmd = pythonRealExists('python3') ? `python3 "${tmpFile}"` : `python "${tmpFile}"`;
        } else if (language === 'javascript') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          cmd = `node "${tmpFile}"`;
        } else if (language === 'bash') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          cmd = `bash "${tmpFile}"`;
        } else if (language === 'c') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          const outFile = path.join(__dirname, 'temp_c.exe');
          cmd = `gcc "${tmpFile}" -o "${outFile}" && "${outFile}"`;
          cleanupFiles.push(outFile);
        }

        console.log(`[Interactive] Spawning process: ${cmd}`);

        // Spawn process (keep stdin open, interactive mode)
        const child = spawn(cmd, { shell: true, cwd: __dirname, stdio: ['pipe', 'pipe', 'pipe'] });

        const session = {
          sessionId,
          process: child,
          stdin: child.stdin,
          closed: false,
          buffering: '',
          timer: setTimeout(() => {
            if (!session.closed) {
              child.kill('SIGTERM');
              session.closed = true;
              res.write(`data: ${JSON.stringify({ type: 'timeout' })}\n\n`);
              res.end();
            }
          }, 120000), // 120 sec timeout
        };

        activeProcesses.set(sessionId, session);
        console.log(`[Interactive] Session started: ${sessionId}`);

        // Send stdout to client as SSE (unbuffered, line-by-line)
        child.stdout.on('data', (chunk) => {
          const text = chunk.toString();
          console.log(`[Interactive] stdout: ${JSON.stringify(text)}`);
          res.write(`data: ${JSON.stringify({ type: 'output', data: text })}\n\n`);
        });

        child.stderr.on('data', (chunk) => {
          const text = chunk.toString();
          console.log(`[Interactive] stderr: ${JSON.stringify(text)}`);
          res.write(`data: ${JSON.stringify({ type: 'error', data: text })}\n\n`);
        });

        child.on('close', (code) => {
          console.log(`[Interactive] child.on('close'): code=${code}`);
          if (!session.closed) {
            session.closed = true;
            clearTimeout(session.timer);
            activeProcesses.delete(sessionId);
            cleanupFiles.forEach(cleanupPath);
            console.log(`[Interactive] Session ended: ${sessionId} (code: ${code})`);
            res.write(`data: ${JSON.stringify({ type: 'exit', code: code || 0 })}\n\n`);
            res.end();
          }
        });

        child.on('error', (error) => {
          console.log(`[Interactive] child.on('error'): ${error.message}`);
          if (!session.closed) {
            session.closed = true;
            clearTimeout(session.timer);
            activeProcesses.delete(sessionId);
            cleanupFiles.forEach(cleanupPath);
            console.log(`[Interactive] Error: ${error.message}`);
            res.write(`data: ${JSON.stringify({ type: 'error', data: error.message })}\n\n`);
            res.end();
          }
        });

        // Keep connection alive - don't close stdin yet!
        // User will send input via /api/send-stdin endpoint
    } catch (error) {
      if (error.message === 'Payload too large') {
        res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ message: error.message }));
        return;
      }
      console.error('[ERROR]', error.message);
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: error.message }));
    }
    return;
  }

  // Send stdin to active process
  if (pathname.startsWith('/api/send-stdin/') && req.method === 'POST') {
    if (isRateLimited(req, 'interactive-stdin', 240, 60_000)) {
      res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: 'Too many stdin requests' }));
      return;
    }
    const sessionId = pathname.replace('/api/send-stdin/', '');
    const session = activeProcesses.get(sessionId);

    if (!session || session.closed) {
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ message: 'Session not found' }));
    }

    try {
      const { input } = await readJsonBody(req);
      if (session.stdin && !session.stdin.destroyed) {
        const text = String(input);
        console.log(`[Interactive] Sending input: ${text}`);
        session.stdin.write(text + '\n');
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: true }));
      } else {
        throw new Error('Process stdin is closed');
      }
    } catch (error) {
      if (error.message === 'Payload too large') {
        res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ message: error.message }));
        return;
      }
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: error.message }));
    }
    return;
  }

  // Kill session endpoint
  if (pathname.startsWith('/api/kill-session/') && req.method === 'POST') {
    if (isRateLimited(req, 'interactive-kill', 60, 60_000)) {
      res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: 'Too many kill requests' }));
      return;
    }
    const sessionId = pathname.replace('/api/kill-session/', '');
    const session = activeProcesses.get(sessionId);

    if (!session) {
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ message: 'Session not found' }));
    }

    session.process.kill('SIGTERM');
    session.closed = true;
    activeProcesses.delete(sessionId);
    clearTimeout(session.timer);

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // Serve static files
  const staticHtmlRoutes = new Set([
    '/',
    '/index.html',
    '/editor',
    '/editor.html',
    '/assistant.html',
    '/errors.html',
    '/community.html',
    '/login.html',
    '/profile.html',
    '/examples.html',
  ]);

  if (staticHtmlRoutes.has(pathname) || pathname === '/app.js' || pathname === '/styles.css') {
    let filePath;
    if (pathname === '/' || pathname === '/index.html') {
      filePath = path.join(__dirname, 'index.html');
    } else if (pathname === '/editor') {
      filePath = path.join(__dirname, 'editor.html');
    } else {
      filePath = path.join(__dirname, pathname.replace(/^\//, ''));
    }

    try {
      const stat = fs.statSync(filePath);
      if (!stat.isFile()) {
        throw new Error('Not a file');
      }

      const ext = path.extname(filePath);
      const contentTypes = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
      };
      const contentType = contentTypes[ext] || 'application/octet-stream';
      const content = fs.readFileSync(filePath);

      res.setHeader('Content-Type', contentType);
      res.writeHead(200);
      res.end(content);
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: 'Not found' }));
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ message: 'Not found' }));
});

server.listen(PORT, () => {
  cleanupStaleTempArtifacts();
  console.log(`✓ Local Piston running on http://localhost:${PORT}`);
  console.log(`Available languages: ${Object.keys(languages).join(', ')}`);
});
