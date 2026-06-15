const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const PORT = 3000;

function buildHuggingFaceModelEndpoint(baseEndpoint, model) {
  const cleanBase = String(baseEndpoint || '').replace(/\/+$/, '');
  if (cleanBase.includes('{model}')) {
    return cleanBase.replace('{model}', encodeURIComponent(model));
  }
  if (cleanBase.endsWith(`/${encodeURIComponent(model)}`) || cleanBase.endsWith(`/${model}`)) {
    return cleanBase;
  }
  return `${cleanBase}/${encodeURIComponent(model)}`;
}

async function callAiProvider({ provider, endpoint, model, apiKey, prompt }) {
  if (provider === 'ollama') {
    const url = `${String(endpoint).replace(/\/$/, '')}/api/chat`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        stream: false,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || `Ollama request failed (${response.status})`);
    }
    return String(data.message?.content || '').trim();
  }

  if (provider === 'huggingface') {
    const url = buildHuggingFaceModelEndpoint(endpoint, model);
    const headers = { 'Content-Type': 'application/json' };
    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`;
    }
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 700, return_full_text: false, temperature: 0.4 },
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || data.message || `Hugging Face request failed (${response.status})`);
    }
    if (Array.isArray(data) && data[0]?.generated_text) {
      return String(data[0].generated_text).trim();
    }
    if (typeof data.generated_text === 'string') {
      return data.generated_text.trim();
    }
    throw new Error('Hugging Face response format was unexpected');
  }

  if (provider === 'openrouter') {
    if (!apiKey) {
      throw new Error('OpenRouter requires API key');
    }
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'VPR Assistant',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        max_tokens: 700,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error?.message || data.message || `OpenRouter request failed (${response.status})`);
    }
    return String(data.choices?.[0]?.message?.content || '').trim();
  }

  throw new Error(`Unsupported AI provider: ${provider}`);
}

// Check if command exists in system
function commandExists(cmd) {
  try {
    execSync(`where ${cmd}`, { stdio: 'ignore' });
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
  ruby: { cmd: 'ruby', ext: 'rb' },
  sql: { cmd: 'sqlite3', ext: 'sql' },
  bash: { cmd: 'bash', ext: 'sh' },
  powershell: { cmd: 'pwsh', ext: 'ps1' },
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.writeHead(200), res.end();
  }

  if (req.url === '/api/ai/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { provider, endpoint, model, apiKey, prompt } = JSON.parse(body || '{}');
        if (!provider || !endpoint || !model || !prompt) {
          res.writeHead(400);
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

        res.writeHead(200);
        res.end(JSON.stringify({ output }));
      } catch (error) {
        console.error('[AI ERROR]', error.message);
        res.writeHead(500);
        res.end(JSON.stringify({ message: error.message }));
      }
    });
    return;
  }

  if (req.url === '/api/v2/piston/execute' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { language, files } = JSON.parse(body);
        const code = files?.[0]?.content || '';
        const langInfo = languages[language];

        if (!langInfo) {
          res.writeHead(400);
          return res.end(JSON.stringify({ message: `Unsupported language: ${language}` }));
        }

        let cmd = '';
        let cleanupFiles = [];
        const tmpFile = path.join(__dirname, `temp_${Date.now()}.${langInfo.ext}`);

        // Real execution only: if runtime is missing, return explicit error.
        if (language === 'javascript') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          requireCommand('node', language);
          cmd = `node "${tmpFile}"`;
        } else if (language === 'typescript') {
          fs.writeFileSync(tmpFile, code);
          cleanupFiles.push(tmpFile);
          if (commandExists('tsx')) {
            cmd = `tsx "${tmpFile}"`;
          } else if (commandExists('npx')) {
            cmd = `npx --yes tsx "${tmpFile}"`;
          } else if (commandExists('ts-node')) {
            cmd = `ts-node --transpile-only "${tmpFile}"`;
          } else if (commandExists('npx')) {
            cmd = `npx --yes ts-node --transpile-only "${tmpFile}"`;
          } else {
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
          requireCommand('bash', language);
          cmd = `bash "${tmpFile}"`;
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

        console.log(`[${language.toUpperCase()}] Executing...`);

        const { stdout, stderr } = await execAsync(cmd, { 
          timeout: 15000, 
          maxBuffer: 10 * 1024 * 1024,
          shell: true
        }).catch(e => ({
          stdout: e.stdout || '',
          stderr: e.stderr || e.message || ''
        }));

        // Cleanup
        cleanupFiles.forEach(cleanupPath);

        const output = stdout.trim() || stderr.trim() || '(no output)';
        console.log(`[RESULT] ${output.substring(0, 60)}`);

        res.writeHead(200);
        res.end(JSON.stringify({
          language,
          run: { output: output, stdout: output, stderr: stderr.trim() },
          compile: { output: stderr.trim() || '' }
        }));
      } catch (error) {
        console.error('[ERROR]', error.message);
        res.writeHead(500);
        res.end(JSON.stringify({ 
          message: error.message,
          run: { output: `Error: ${error.message}`, stdout: `Error: ${error.message}`, stderr: '' },
          compile: { output: '' }
        }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Not found' }));
});

server.listen(PORT, () => {
  cleanupStaleTempArtifacts();
  console.log(`✓ Local Piston running on http://localhost:${PORT}`);
  console.log(`Available languages: ${Object.keys(languages).join(', ')}`);
});
