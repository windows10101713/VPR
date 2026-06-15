const content = {
  ko: {
    runReady: "준비됨",
    runDone: "실행 완료",
    runSaved: "저장 완료",
    runError: "실행 오류",
    outputReady:
      "실행 결과가 여기에 표시됩니다.\n\n힌트:\n- 대부분의 언어는 클라우드 런타임으로 실제 실행됩니다.\n- HTML은 미리보기 프레임에서 렌더링됩니다.\n- Arduino/ESP-IDF는 회로도 템플릿을 함께 제공합니다.",
    ideaFallback: "예제를 찾는 중이라면, 간단한 계산기나 숫자 맞추기 게임부터 시작해 보세요.",
    learningIntro: "선택한 언어 학습 포인트",
    errorEmpty: "오류 메시지를 입력하면 원인과 해결 방향을 제안합니다.",
    saveEmpty: "프로젝트 이름을 먼저 입력하세요.",
    saveMetaEmpty: "아직 저장된 프로젝트가 없습니다.",
    libraryEmpty: "저장된 프로젝트가 없습니다. 저장 버튼으로 현재 코드를 보관해 보세요.",
    homeEmpty: "아직 저장된 프로젝트가 없습니다. 에디터 페이지에서 첫 프로젝트를 저장해 보세요.",
  },
  en: {
    runReady: "Ready",
    runDone: "Run complete",
    runSaved: "Saved",
    runError: "Run error",
    outputReady:
      "Execution results will appear here.\n\nHints:\n- Most languages run on a cloud runtime.\n- HTML renders in preview frame.\n- Arduino/ESP-IDF include a circuit template panel.",
    ideaFallback: "If you need a starter idea, build a calculator or a number guessing game first.",
    learningIntro: "Learning points for the selected language",
    errorEmpty: "Paste an error message to get a likely cause and fix direction.",
    saveEmpty: "Enter a project name first.",
    saveMetaEmpty: "No saved project yet.",
    libraryEmpty: "No saved projects yet. Use Save to keep the current draft.",
    homeEmpty: "No saved projects yet. Save your first project from the editor page.",
  },
};

const storageKey = "vpr-projects";
const lastProjectKey = "vpr-last-project";
const localeKey = "vpr-locale";
const pendingSnippetKey = "vpr-pending-snippet";
const usersKey = "vpr-users";
const sessionUserKey = "vpr-session-user";
const publicSnippetsKey = "vpr-public-snippets";
const runThrottleKey = "vpr-last-run-ts";
const runtimeConfigKey = "vpr-runtime-config";
const circuitStateKey = "vpr-circuit-state";
const aiConfigKey = "vpr-ai-config";
const defaultRuntimeEndpoint = "http://localhost:3000/api/v2/piston/execute";
const defaultAiProxyEndpoint = "http://localhost:3000/api/ai/chat";

const aiProviderPresets = {
  ollama: {
    provider: "ollama",
    endpoint: "http://localhost:11434",
    model: "qwen2.5:3b",
    apiKey: "",
  },
  huggingface: {
    provider: "huggingface",
    endpoint: "https://api-inference.huggingface.co/models",
    model: "google/gemma-2-2b-it",
    apiKey: "",
  },
  openrouter: {
    provider: "openrouter",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    model: "mistralai/mistral-7b-instruct:free",
    apiKey: "",
  },
};

const languageSamples = {
  javascript: {
    label: "JavaScript",
    extension: "js",
    runner: { language: "javascript", version: "18.15.0" },
    guide: [
      "브라우저 DOM과 런타임 API를 구분하세요.",
      "작은 함수 단위로 분리하면 디버깅이 쉬워집니다.",
      "실행 전 입력값 검증을 습관화하세요.",
    ],
    code: "console.log('Hello from JavaScript');\nconsole.log(2 + 3);",
  },
  typescript: {
    label: "TypeScript",
    extension: "ts",
    runner: { language: "typescript", version: "5.0.3" },
    guide: ["타입 추론을 활용하되 핵심 API는 명시 타입을 지정하세요.", "interface와 type의 용도를 구분하세요."],
    code: "const sum = (a: number, b: number): number => a + b;\nconsole.log(sum(2, 5));",
  },
  python: {
    label: "Python",
    extension: "py",
    runner: { language: "python", version: "3.10.0" },
    guide: ["들여쓰기 정렬을 항상 일정하게 유지하세요.", "Traceback 마지막 줄부터 원인 파악을 시작하세요."],
    code: "def greet(name):\n    return f'Hello, {name}'\n\nprint(greet('VPR'))",
  },
  c: {
    label: "C",
    extension: "c",
    runner: { language: "c", version: "10.2.0" },
    guide: ["헤더, 타입, 포인터 초기화를 꼼꼼히 확인하세요.", "경계 검사 없는 배열 접근을 피하세요."],
    code: "#include <stdio.h>\n\nint main(void) {\n    printf(\"Hello from C\\n\");\n    return 0;\n}",
  },
  cpp: {
    label: "C++",
    extension: "cpp",
    runner: { language: "c++", version: "10.2.0" },
    guide: ["컴파일 에러와 런타임 에러를 분리해 해석하세요.", "STL 사용 시 범위 체크를 우선하세요."],
    code: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello from C++\\n\";\n    return 0;\n}",
  },
  csharp: {
    label: "C#",
    extension: "cs",
    runner: { language: "csharp", version: "6.12.0" },
    guide: ["null 가능 참조를 고려한 방어 코드를 작성하세요.", "작은 메서드 단위로 책임을 분리하세요."],
    code: "using System;\n\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Hello from C#\");\n  }\n}",
  },
  java: {
    label: "Java",
    extension: "java",
    runner: { language: "java", version: "15.0.2" },
    guide: ["클래스명과 파일명 일치를 지키세요.", "예외 메시지를 그대로 숨기지 마세요."],
    code: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello from Java\");\n  }\n}",
  },
  go: {
    label: "Go",
    extension: "go",
    runner: { language: "go", version: "1.16.2" },
    guide: ["error 반환값을 무시하지 마세요.", "패키지 구조를 단순하게 유지하세요."],
    code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n  fmt.Println(\"Hello from Go\")\n}",
  },
  ruby: {
    label: "Ruby",
    extension: "rb",
    runner: { language: "ruby", version: "3.0.1" },
    guide: ["메서드 책임을 작게 유지하세요.", "동적 타입이라도 입력 검증은 필수입니다."],
    code: "puts 'Hello from Ruby'",
  },
  sql: {
    label: "SQL",
    extension: "sql",
    runner: { language: "sql", version: "3.40.0" },
    guide: ["SELECT 전에 테이블 구조를 먼저 설계하세요.", "WHERE 조건 없는 UPDATE/DELETE는 위험합니다."],
    code: "SELECT 'Hello from SQL' AS greeting;\nSELECT 3 + 7 AS result;",
  },
  powershell: {
    label: "PowerShell",
    extension: "ps1",
    runner: { language: "powershell", version: "7.3.0" },
    guide: ["파이프라인(|)으로 커맨드를 연결하세요.", "오류 처리에 try/catch를 사용하세요."],
    code: "Write-Output 'Hello from PowerShell'\nWrite-Output (3 + 7)",
  },
  bash: {
    label: "Bash",
    extension: "sh",
    runner: { language: "bash", version: "5.2.0" },
    guide: ["변수에 공백 없이 대입하세요 (a=1).", "문자열 비교는 == 대신 = 또는 [[ ]] 사용을 권장합니다."],
    code: "#!/bin/bash\necho \"Hello from Bash\"\necho $((3 + 7))",
  },
  html: {
    label: "HTML",
    extension: "html",
    mode: "preview",
    guide: ["시맨틱 태그를 우선 사용하세요.", "스타일/동작 분리를 유지하세요."],
    code: "<!DOCTYPE html>\n<html lang=\"ko\">\n  <body>\n    <h1>Hello from HTML</h1>\n    <p>Preview works in the panel.</p>\n  </body>\n</html>",
  },
  css: {
    label: "CSS",
    extension: "css",
    mode: "preview",
    guide: ["컴포넌트 단위 클래스로 스타일 범위를 관리하세요.", "간격/색상은 변수로 관리하면 유지보수가 쉬워집니다."],
    code: ":root {\n  --bg: #f2efe9;\n  --ink: #1f2a37;\n  --accent: #d97706;\n}\n\nbody {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  font-family: 'Segoe UI', sans-serif;\n  background: radial-gradient(circle at top, #fff, var(--bg));\n}\n\n.card {\n  width: min(420px, 90vw);\n  padding: 24px;\n  border-radius: 20px;\n  background: #fff;\n  box-shadow: 0 12px 30px rgba(31, 42, 55, 0.16);\n}\n\n.title {\n  margin: 0 0 8px;\n  color: var(--ink);\n}\n\n.badge {\n  display: inline-block;\n  margin-top: 12px;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: var(--accent);\n  color: #fff;\n  font-size: 12px;\n}\n",
  },
  arduino: {
    label: "Arduino",
    extension: "ino",
    mode: "circuit",
    guide: ["핀 번호와 전원 연결을 먼저 설계하세요.", "센서 전압 범위 확인 후 연결하세요."],
    code: "void setup() {\n  Serial.begin(9600);\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(500);\n  digitalWrite(13, LOW);\n  delay(500);\n}",
  },
  espidf: {
    label: "ESP-IDF",
    extension: "c",
    mode: "circuit",
    guide: ["ESP32 핀맵과 전원 요구사항을 먼저 확인하세요.", "FreeRTOS task 분리를 작게 시작하세요."],
    code: "#include <stdio.h>\n#include \"freertos/FreeRTOS.h\"\n#include \"freertos/task.h\"\n\nvoid app_main(void) {\n  while (1) {\n    printf(\"Hello from ESP-IDF\\n\");\n    vTaskDelay(1000 / portTICK_PERIOD_MS);\n  }\n}",
  },
};

const ideaTemplates = [
  {
    match: /게임|game/i,
    text: "초보자용 게임 아이디어\n1. 숫자 맞추기 게임\n2. 반응 속도 측정 게임\n3. 사칙연산 퀴즈 게임",
  },
  {
    match: /임베디드|arduino|esp/i,
    text: "임베디드 아이디어\n1. 온습도 모니터\n2. LED 패턴 제어기\n3. Wi-Fi 상태 알림 장치",
  },
  {
    match: /웹|html|js|javascript/i,
    text: "웹 프로젝트 아이디어\n1. 메모장형 온라인 에디터\n2. 학습 타이머\n3. 에러 메시지 해설 페이지",
  },
];

const errorGuides = [
  {
    match: /syntaxerror|invalid syntax|unexpected token/i,
    text: "문법 오류입니다. 괄호/따옴표/세미콜론 누락을 먼저 확인하세요.",
  },
  {
    match: /null|undefined|none/i,
    text: "값이 없는 상태 접근 가능성이 큽니다. 초기화와 null 체크를 확인하세요.",
  },
  {
    match: /index|out of range|segmentation/i,
    text: "인덱스 또는 메모리 접근 범위를 벗어났을 수 있습니다. 길이와 경계 조건을 점검하세요.",
  },
];

const snippets = [
  {
    title: "숫자 맞추기 게임",
    description: "조건문과 반복문을 연습하는 입문용 콘솔 프로젝트",
    language: "javascript",
    code: "const answer = 7;\nconst guess = 5;\nif (guess === answer) {\n  console.log('정답입니다!');\n} else {\n  console.log('다시 시도하세요.');\n}",
  },
  {
    title: "HTML 포트폴리오 페이지",
    description: "태그 구조와 CSS 레이아웃을 배우기 좋은 예제",
    language: "html",
    code: "<!DOCTYPE html>\n<html lang=\"ko\">\n  <body>\n    <main><h1>홍길동 포트폴리오</h1><p>웹 프론트엔드 입문 학습 중입니다.</p></main>\n  </body>\n</html>",
  },
  {
    title: "Arduino Blink",
    description: "LED 제어와 핀 설정 입문 예제",
    language: "arduino",
    code: languageSamples.arduino.code,
  },
];

let currentLocale = localStorage.getItem(localeKey) || "ko";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeName(value) {
  return String(value).trim().replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 20);
}

function getProjects() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function setProjects(projects) {
  localStorage.setItem(storageKey, JSON.stringify(projects));
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(usersKey) || "[]");
  } catch {
    return [];
  }
}

function setUsers(users) {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

function getCurrentUser() {
  return localStorage.getItem(sessionUserKey);
}

function setCurrentUser(username) {
  if (username) {
    localStorage.setItem(sessionUserKey, username);
  } else {
    localStorage.removeItem(sessionUserKey);
  }
}

function getPublicSnippets() {
  try {
    return JSON.parse(localStorage.getItem(publicSnippetsKey) || "[]");
  } catch {
    return [];
  }
}

function setPublicSnippets(items) {
  localStorage.setItem(publicSnippetsKey, JSON.stringify(items));
}

function formatTimestamp(timestamp) {
  return new Intl.DateTimeFormat(currentLocale === "ko" ? "ko-KR" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

function buildIdeaResponse(prompt) {
  const found = ideaTemplates.find((template) => template.match.test(prompt));
  return found ? found.text : content[currentLocale].ideaFallback;
}

function buildErrorResponse(message) {
  if (!message.trim()) {
    return content[currentLocale].errorEmpty;
  }

  const found = errorGuides.find((guide) => guide.match.test(message));
  return found
    ? found.text
    : currentLocale === "ko"
      ? "오류 유형이 명확하지 않습니다. 최근 변경 코드와 에러 라인을 우선 확인하세요."
      : "Error type is unclear. Start with recently changed lines and the reported line number.";
}

function applyLocaleSelections() {
  document.querySelectorAll("#localeSelect").forEach((select) => {
    select.value = currentLocale;
    select.addEventListener("change", (event) => {
      currentLocale = event.target.value;
      localStorage.setItem(localeKey, currentLocale);
      location.reload();
    });
  });
}

function renderAuthShortcut() {
  const sessionUser = getCurrentUser();
  document.querySelectorAll(".topbar-actions").forEach((container) => {
    const wrapper = document.createElement("div");
    wrapper.className = "auth-inline";

    if (sessionUser) {
      wrapper.innerHTML = `
        <span class="auth-chip">@${escapeHtml(sessionUser)}</span>
        <a class="ghost-button" href="profile.html">프로필</a>`;
    } else {
      wrapper.innerHTML = `<a class="ghost-button" href="login.html">로그인</a>`;
    }

    container.appendChild(wrapper);
  });
}

function populateLanguageSelect(select) {
  if (!select) {
    return;
  }

  select.innerHTML = Object.entries(languageSamples)
    .map(([value, sample]) => `<option value="${value}">${sample.label}</option>`)
    .join("");
}

function renderLearningGuide(target, languageKey) {
  if (!target) {
    return;
  }

  const sample = languageSamples[languageKey];
  target.innerHTML = `${content[currentLocale].learningIntro}<br /><br />${sample.guide
    .map((line) => `- ${line}`)
    .join("<br />")}`;
}

function resetPreview(previewFrame) {
  if (!previewFrame) {
    return;
  }

  previewFrame.srcdoc = `
    <body style="font-family: sans-serif; padding: 24px; color: #475569; background: #fff;">
      <h3 style="margin-top: 0;">Preview standby</h3>
      <p>HTML 코드를 실행하면 이 영역에 실제 결과가 표시됩니다.</p>
    </body>`;
}

function getDefaultCircuitModel(languageKey) {
  if (languageKey === "arduino") {
    return {
      nodes: [
        { id: "a-board", name: "Arduino UNO", pin: "5V/GND", x: 34, y: 38 },
        { id: "a-bread", name: "Breadboard", pin: "+ / - rail", x: 250, y: 42 },
        { id: "a-res", name: "Resistor", pin: "220R", x: 430, y: 128 },
        { id: "a-led", name: "LED", pin: "D13", x: 620, y: 130 },
      ],
      wires: [
        { from: "a-board", to: "a-bread" },
        { from: "a-board", to: "a-res" },
        { from: "a-res", to: "a-led" },
      ],
    };
  }

  return {
    nodes: [
      { id: "e-esp32", name: "ESP32 DevKit", pin: "3V3/GND", x: 34, y: 38 },
      { id: "e-sensor", name: "Sensor", pin: "VCC/GND", x: 260, y: 54 },
      { id: "e-res", name: "Resistor", pin: "220R", x: 462, y: 136 },
      { id: "e-led", name: "LED", pin: "GPIO2", x: 650, y: 140 },
    ],
    wires: [
      { from: "e-esp32", to: "e-sensor" },
      { from: "e-esp32", to: "e-res" },
      { from: "e-res", to: "e-led" },
    ],
  };
}

async function hashPassword(raw) {
  const encoder = new TextEncoder();
  const data = encoder.encode(raw);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function canRunNow() {
  const last = Number(localStorage.getItem(runThrottleKey) || 0);
  const now = Date.now();
  if (now - last < 1200) {
    return false;
  }
  localStorage.setItem(runThrottleKey, String(now));
  return true;
}

function getRuntimeConfig() {
  try {
    const parsed = JSON.parse(localStorage.getItem(runtimeConfigKey) || "{}");
    const endpoint = String(parsed.endpoint || defaultRuntimeEndpoint).trim();
    const headers = parsed.headers && typeof parsed.headers === "object" ? parsed.headers : {};
    return { endpoint, headers };
  } catch {
    return { endpoint: defaultRuntimeEndpoint, headers: {} };
  }
}

function setRuntimeConfig(config) {
  localStorage.setItem(runtimeConfigKey, JSON.stringify(config));
}

function getAiConfig() {
  try {
    const parsed = JSON.parse(localStorage.getItem(aiConfigKey) || "{}");
    const provider = Object.prototype.hasOwnProperty.call(aiProviderPresets, parsed.provider) ? parsed.provider : "ollama";
    const preset = aiProviderPresets[provider];
    return {
      provider,
      endpoint: String(parsed.endpoint || preset.endpoint || "").trim(),
      model: String(parsed.model || preset.model || "").trim(),
      apiKey: String(parsed.apiKey || "").trim(),
    };
  } catch {
    return { ...aiProviderPresets.ollama };
  }
}

function setAiConfig(config) {
  localStorage.setItem(aiConfigKey, JSON.stringify(config));
}

function buildAiPrompt(task, params) {
  if (task === "idea") {
    return [
      "You are a practical coding mentor for beginners.",
      "Generate concrete project ideas with short steps.",
      "Keep answer concise and structured.",
      `User request: ${params.prompt}`,
    ].join("\n");
  }

  if (task === "coach") {
    return [
      "You are a senior code reviewer.",
      "Return: 1) issues, 2) improved code, 3) why this is better.",
      "Be specific and action-oriented.",
      `Language: ${params.language}`,
      `Goal: ${params.goal || "general improvement"}`,
      "Code:",
      params.code,
    ].join("\n");
  }

  return [
    "You are a software architect assistant.",
    "Break request into phased implementation steps.",
    "Include MVP scope, data model, API/UI tasks, testing checklist.",
    `Request: ${params.prompt}`,
  ].join("\n");
}

async function callOllama(config, prompt) {
  const response = await fetch(`${config.endpoint.replace(/\/$/, "")}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: config.model,
      messages: [{ role: "user", content: prompt }],
      stream: false,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Ollama request failed (${response.status})`);
  }

  const text = data.message?.content || "";
  if (!text.trim()) {
    throw new Error("Ollama returned empty response");
  }
  return text;
}

async function callHuggingFace(config, prompt) {
  const modelEndpoint = `${config.endpoint.replace(/\/$/, "")}/${encodeURIComponent(config.model)}`;
  const headers = { "Content-Type": "application/json" };
  if (config.apiKey) {
    headers.Authorization = `Bearer ${config.apiKey}`;
  }

  const response = await fetch(modelEndpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      inputs: prompt,
      parameters: { max_new_tokens: 700, return_full_text: false, temperature: 0.4 },
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = data.error || data.message || `Hugging Face request failed (${response.status})`;
    throw new Error(detail);
  }

  if (Array.isArray(data) && data[0]?.generated_text) {
    return String(data[0].generated_text);
  }
  if (typeof data.generated_text === "string") {
    return data.generated_text;
  }
  throw new Error("Hugging Face response format was unexpected");
}

async function callOpenRouter(config, prompt) {
  if (!config.apiKey) {
    throw new Error("OpenRouter requires API key");
  }

  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "VPR Assistant",
    },
    body: JSON.stringify({
      model: config.model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: 700,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = data.error?.message || data.message || `OpenRouter request failed (${response.status})`;
    throw new Error(detail);
  }

  const text = data.choices?.[0]?.message?.content || "";
  if (!String(text).trim()) {
    throw new Error("OpenRouter returned empty response");
  }
  return text;
}

async function requestAi(task, params) {
  const config = getAiConfig();
  const prompt = buildAiPrompt(task, params);
  let response;
  try {
    response = await fetch(defaultAiProxyEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: config.provider,
        endpoint: config.endpoint,
        model: config.model,
        apiKey: config.apiKey,
        prompt,
      }),
    });
  } catch (error) {
    throw new Error(
      "AI 프록시에 연결할 수 없습니다. local-server.js를 실행 중인지 확인하세요. (http://localhost:3000)"
    );
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = String(data.message || "");
    if (/fetch failed|ECONNREFUSED|ENOTFOUND/i.test(message)) {
      throw new Error(
        "선택한 AI 제공자에 연결할 수 없습니다. Ollama라면 앱 실행 상태/포트(11434), 클라우드 제공자라면 endpoint와 API key를 확인하세요."
      );
    }
    throw new Error(message || `AI request failed (${response.status})`);
  }
  return String(data.output || "").trim();
}

function getStoredCircuitStates() {
  try {
    return JSON.parse(localStorage.getItem(circuitStateKey) || "{}");
  } catch {
    return {};
  }
}

function setStoredCircuitStates(stateMap) {
  localStorage.setItem(circuitStateKey, JSON.stringify(stateMap));
}

async function executeRemote(runtime, code) {
  const runtimeConfig = getRuntimeConfig();
  const headers = { "Content-Type": "application/json", ...runtimeConfig.headers };
  const response = await fetch(runtimeConfig.endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      language: runtime.language,
      version: runtime.version || "*",
      files: [{ content: code }],
      stdin: "",
      args: [],
      compile_timeout: 10,
      run_timeout: 10,
    }),
  });

  if (!response.ok) {
    if (response.status === 401 && runtimeConfig.endpoint.includes("emkc.org")) {
      throw new Error(
        "공개 Piston API가 화이트리스트 전용으로 전환되었습니다.\n실행 결과 패널의 '런타임 설정'에서 자체 엔드포인트와 헤더를 저장해 주세요."
      );
    }
    throw new Error(`Runtime request failed (${response.status})`);
  }

  return response.json();
}

function initHomePage() {
  const summary = document.getElementById("homeProjectSummary");
  if (!summary) {
    return;
  }

  const projects = getProjects().sort((left, right) => right.updatedAt - left.updatedAt);
  if (!projects.length) {
    summary.innerHTML = `<p>${content[currentLocale].homeEmpty}</p>`;
    return;
  }

  const latest = projects[0];
  summary.innerHTML = `
    <strong>최근 프로젝트</strong>
    <p>${escapeHtml(latest.name)}</p>
    <strong>언어</strong>
    <p>${escapeHtml(languageSamples[latest.language]?.label || latest.language)}</p>
    <strong>마지막 저장</strong>
    <p>${formatTimestamp(latest.updatedAt)}</p>
    <a class="primary-button small" href="editor.html">이어서 작업</a>`;
}

function initEditorPage() {
  const languageSelect = document.getElementById("languageSelect");
  const codeEditor = document.getElementById("codeEditor");
  if (!languageSelect || !codeEditor) {
    return;
  }

  const projectName = document.getElementById("projectName");
  const lineNumbers = document.getElementById("lineNumbers");
  const outputConsole = document.getElementById("outputConsole");
  const statusBadge = document.getElementById("statusBadge");
  const saveMeta = document.getElementById("saveMeta");
  const projectCount = document.getElementById("projectCount");
  const projectList = document.getElementById("projectList");
  const previewFrame = document.getElementById("previewFrame");
  const circuitEditor = document.getElementById("circuitEditor");
  const circuitWorkspace = document.getElementById("circuitWorkspace");
  const circuitWireLayer = document.getElementById("circuitWireLayer");
  const circuitNodeLayer = document.getElementById("circuitNodeLayer");
  const circuitStatus = document.getElementById("circuitStatus");
  const addComponentButton = document.getElementById("addComponentButton");
  const connectComponentButton = document.getElementById("connectComponentButton");
  const resetCircuitButton = document.getElementById("resetCircuitButton");
  const applyCircuitNodeButton = document.getElementById("applyCircuitNodeButton");
  const deleteCircuitNodeButton = document.getElementById("deleteCircuitNodeButton");
  const circuitNameInput = document.getElementById("circuitNameInput");
  const circuitPinInput = document.getElementById("circuitPinInput");
  const circuitXInput = document.getElementById("circuitXInput");
  const circuitYInput = document.getElementById("circuitYInput");
  const toggleRuntimeConfigButton = document.getElementById("toggleRuntimeConfigButton");
  const runtimeConfigBody = document.getElementById("runtimeConfigBody");
  const runtimeEndpointInput = document.getElementById("runtimeEndpointInput");
  const runtimeHeadersInput = document.getElementById("runtimeHeadersInput");
  const saveRuntimeConfigButton = document.getElementById("saveRuntimeConfigButton");
  const resetRuntimeConfigButton = document.getElementById("resetRuntimeConfigButton");
  const runtimeConfigStatus = document.getElementById("runtimeConfigStatus");
  const importFileInput = document.getElementById("importFileInput");
  const runButton = document.getElementById("runButton");
  const saveButton = document.getElementById("saveButton");
  const newProjectButton = document.getElementById("newProjectButton");
  const downloadButton = document.getElementById("downloadButton");
  const runModePill = document.getElementById("runModePill");

  let circuitStateMap = getStoredCircuitStates();
  let circuitModel = null;
  let selectedNodeId = null;
  let connectFromNodeId = null;
  let dragState = null;

  function isCircuitLanguage(languageKey) {
    return languageSamples[languageKey]?.mode === "circuit";
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function updateRuntimeStatusLine() {
    if (!runtimeConfigStatus) {
      return;
    }
    const runtimeConfig = getRuntimeConfig();
    if (runtimeConfig.endpoint === defaultRuntimeEndpoint) {
      runtimeConfigStatus.textContent = "현재 기본 공개 런타임 엔드포인트를 사용 중입니다.";
      return;
    }
    runtimeConfigStatus.textContent = `사용 중: ${runtimeConfig.endpoint}`;
  }

  function fillRuntimeConfigForm() {
    if (!runtimeEndpointInput || !runtimeHeadersInput) {
      return;
    }
    const runtimeConfig = getRuntimeConfig();
    runtimeEndpointInput.value = runtimeConfig.endpoint;
    runtimeHeadersInput.value = JSON.stringify(runtimeConfig.headers || {}, null, 2);
    updateRuntimeStatusLine();
  }

  function parseRuntimeHeadersInput() {
    const raw = runtimeHeadersInput?.value.trim() || "{}";
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Headers는 JSON 객체 형식이어야 합니다.");
    }
    return parsed;
  }

  function persistCircuitModel(languageKey) {
    if (!isCircuitLanguage(languageKey) || !circuitModel) {
      return;
    }
    circuitStateMap[languageKey] = circuitModel;
    setStoredCircuitStates(circuitStateMap);
  }

  function getCircuitModel(languageKey, forceReset = false) {
    if (!isCircuitLanguage(languageKey)) {
      return null;
    }
    if (!forceReset && circuitStateMap[languageKey]) {
      return JSON.parse(JSON.stringify(circuitStateMap[languageKey]));
    }
    return getDefaultCircuitModel(languageKey);
  }

  function getNodeById(nodeId) {
    return circuitModel?.nodes.find((node) => node.id === nodeId) || null;
  }

  function setCircuitStatus(message) {
    if (circuitStatus) {
      circuitStatus.textContent = message;
    }
  }

  function toggleCircuitEnabled(enabled) {
    if (!circuitEditor) {
      return;
    }
    circuitEditor.classList.toggle("is-disabled", !enabled);
    const controls = [
      addComponentButton,
      connectComponentButton,
      resetCircuitButton,
      applyCircuitNodeButton,
      deleteCircuitNodeButton,
      circuitNameInput,
      circuitPinInput,
      circuitXInput,
      circuitYInput,
    ];
    controls.forEach((control) => {
      if (control) {
        control.disabled = !enabled;
      }
    });
  }

  function renderCircuitForm() {
    const node = getNodeById(selectedNodeId);
    if (!node) {
      if (circuitNameInput) {
        circuitNameInput.value = "";
      }
      if (circuitPinInput) {
        circuitPinInput.value = "";
      }
      if (circuitXInput) {
        circuitXInput.value = "";
      }
      if (circuitYInput) {
        circuitYInput.value = "";
      }
      return;
    }

    circuitNameInput.value = node.name;
    circuitPinInput.value = node.pin;
    circuitXInput.value = String(Math.round(node.x));
    circuitYInput.value = String(Math.round(node.y));
  }

  function renderCircuitEditor() {
    if (!circuitWireLayer || !circuitNodeLayer) {
      return;
    }

    circuitWireLayer.innerHTML = "";
    circuitNodeLayer.innerHTML = "";
    if (!circuitModel) {
      return;
    }

    const nodeById = new Map(circuitModel.nodes.map((node) => [node.id, node]));
    circuitModel.wires.forEach((wire) => {
      const from = nodeById.get(wire.from);
      const to = nodeById.get(wire.to);
      if (!from || !to) {
        return;
      }
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(from.x + 66));
      line.setAttribute("y1", String(from.y + 24));
      line.setAttribute("x2", String(to.x + 66));
      line.setAttribute("y2", String(to.y + 24));
      line.setAttribute("stroke", "#2563eb");
      line.setAttribute("stroke-width", "3");
      line.setAttribute("stroke-linecap", "round");
      circuitWireLayer.appendChild(line);
    });

    circuitModel.nodes.forEach((node) => {
      const nodeElement = document.createElement("div");
      nodeElement.className = "circuit-node";
      if (node.id === selectedNodeId) {
        nodeElement.classList.add("is-selected");
      }
      nodeElement.style.left = `${node.x}px`;
      nodeElement.style.top = `${node.y}px`;
      nodeElement.dataset.nodeId = node.id;
      nodeElement.innerHTML = `<span class="circuit-node-name">${escapeHtml(node.name)}</span><span class="circuit-node-pin">${escapeHtml(node.pin)}</span>`;
      circuitNodeLayer.appendChild(nodeElement);
    });
  }

  function selectCircuitNode(nodeId) {
    selectedNodeId = nodeId;
    connectFromNodeId = null;
    renderCircuitForm();
    renderCircuitEditor();
    if (selectedNodeId) {
      setCircuitStatus("부품 선택됨. 이름/핀/X/Y를 수정하고 적용할 수 있습니다.");
    }
  }

  function loadCircuitForLanguage(languageKey, forceReset = false) {
    if (!isCircuitLanguage(languageKey)) {
      circuitModel = null;
      selectedNodeId = null;
      connectFromNodeId = null;
      toggleCircuitEnabled(false);
      renderCircuitForm();
      renderCircuitEditor();
      setCircuitStatus("Arduino/ESP-IDF를 선택하면 회로 편집기가 활성화됩니다.");
      return;
    }

    circuitModel = getCircuitModel(languageKey, forceReset);
    selectedNodeId = circuitModel.nodes[0]?.id || null;
    connectFromNodeId = null;
    toggleCircuitEnabled(true);
    renderCircuitForm();
    renderCircuitEditor();
    persistCircuitModel(languageKey);
    setCircuitStatus("드래그로 배치 변경, 연결 생성 버튼으로 배선 추가가 가능합니다.");
  }

  function updateLineNumbers() {
    const lines = codeEditor.value.split("\n").length;
    lineNumbers.textContent = Array.from({ length: lines }, (_, index) => index + 1).join("\n");
  }

  function updateRuntimeMode(languageKey) {
    if (!runModePill) {
      return;
    }
    const mode = languageSamples[languageKey].mode || "cloud";
    if (mode === "preview") {
      runModePill.textContent = "Web Preview";
    } else if (mode === "circuit") {
      runModePill.textContent = "Circuit + Cloud";
    } else {
      runModePill.textContent = "Cloud Runtime";
    }
  }

  function buildPreviewDocument(languageKey, code) {
    if (languageKey === "css") {
      return `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${code}</style>
  </head>
  <body>
    <main class="card">
      <h1 class="title">Hello from CSS</h1>
      <p>왼쪽 에디터에서 CSS를 바꾸면 이 미리보기가 즉시 반영됩니다.</p>
      <span class="badge">LIVE PREVIEW</span>
    </main>
  </body>
</html>`;
    }
    return code;
  }

  function renderProjectList() {
    const projects = getProjects().sort((left, right) => right.updatedAt - left.updatedAt);
    projectCount.textContent = `${projects.length}개`;

    if (!projects.length) {
      projectList.innerHTML = `<li><span>${content[currentLocale].libraryEmpty}</span></li>`;
      return;
    }

    projectList.innerHTML = projects
      .map(
        (project) => `
          <li>
            <div>
              <strong>${escapeHtml(project.name)}</strong>
              <small>${escapeHtml(languageSamples[project.language]?.label || project.language)} · ${formatTimestamp(project.updatedAt)}</small>
            </div>
            <button type="button" data-load-project="${escapeHtml(project.name)}">열기</button>
          </li>`
      )
      .join("");
  }

  function loadSample(languageKey, forceProjectName = false) {
    const sample = languageSamples[languageKey];
    codeEditor.value = sample.code;
    if (forceProjectName || !projectName.value.trim()) {
      projectName.value = `my-${languageKey}-project`;
    }
    updateLineNumbers();
    updateRuntimeMode(languageKey);
    statusBadge.textContent = content[currentLocale].runReady;
    outputConsole.textContent = content[currentLocale].outputReady;
    resetPreview(previewFrame);
    loadCircuitForLanguage(languageKey);
  }

  function saveProject() {
    const safeName = sanitizeName(projectName.value);
    if (!safeName) {
      statusBadge.textContent = content[currentLocale].runError;
      outputConsole.textContent = content[currentLocale].saveEmpty;
      return;
    }

    projectName.value = safeName;
    const projects = getProjects();
    const now = Date.now();
    const project = { name: safeName, language: languageSelect.value, code: codeEditor.value, updatedAt: now };
    const existingIndex = projects.findIndex((item) => item.name === safeName);
    if (existingIndex >= 0) {
      projects[existingIndex] = project;
    } else {
      projects.push(project);
    }

    setProjects(projects);
    localStorage.setItem(lastProjectKey, safeName);
    saveMeta.textContent = `${safeName} · ${formatTimestamp(now)}`;
    statusBadge.textContent = content[currentLocale].runSaved;
    outputConsole.textContent = `${content[currentLocale].runSaved}\n\n${safeName} 프로젝트가 브라우저 로컬 저장소에 보관되었습니다.`;
    renderProjectList();
  }

  function loadProjectByName(name) {
    const project = getProjects().find((item) => item.name === name);
    if (!project) {
      return;
    }

    projectName.value = project.name;
    languageSelect.value = project.language;
    codeEditor.value = project.code;
    updateLineNumbers();
    updateRuntimeMode(project.language);
    saveMeta.textContent = `${project.name} · ${formatTimestamp(project.updatedAt)}`;
    statusBadge.textContent = content[currentLocale].runReady;
    outputConsole.textContent = `${project.name} 프로젝트를 불러왔습니다.`;
    resetPreview(previewFrame);
    loadCircuitForLanguage(project.language);
    localStorage.setItem(lastProjectKey, project.name);
  }

  async function runCurrentCode() {
    const languageKey = languageSelect.value;
    const code = codeEditor.value;
    const sample = languageSamples[languageKey];

    if (!canRunNow()) {
      statusBadge.textContent = content[currentLocale].runError;
      outputConsole.textContent = "요청이 너무 빠릅니다. 1초 후 다시 실행해 주세요.";
      return;
    }

    if (sample.mode === "preview") {
      previewFrame.srcdoc = buildPreviewDocument(languageKey, code);
      outputConsole.textContent = `${sample.label} 미리보기를 아래 프레임에 렌더링했습니다.`;
      statusBadge.textContent = content[currentLocale].runDone;
      return;
    }

    if (sample.mode === "circuit") {
      loadCircuitForLanguage(languageKey);
    }

    if (!sample.runner) {
      outputConsole.textContent = "현재 언어는 클라우드 런타임이 준비되지 않았습니다.";
      statusBadge.textContent = content[currentLocale].runError;
      return;
    }

    statusBadge.textContent = "Running...";
    try {
      const result = await executeRemote(sample.runner, code);
      const compileOutput = result.compile?.output || "";
      const runOutput = result.run?.stdout || result.run?.output || "";
      const merged = [compileOutput.trim(), runOutput.trim()].filter(Boolean).join("\n\n");
      outputConsole.textContent = merged || "실행 결과가 비어 있습니다.";
      statusBadge.textContent = content[currentLocale].runDone;
    } catch (error) {
      statusBadge.textContent = content[currentLocale].runError;
      outputConsole.textContent = `실행 실패\n\n${error.message}`;
      if (String(error.message).includes("화이트리스트")) {
        runtimeConfigBody?.classList.remove("is-hidden");
      }
    }
  }

  function applyPendingSnippet() {
    const params = new URLSearchParams(window.location.search);
    const snippetIndex = params.get("snippet");
    let snippet = null;

    if (snippetIndex !== null) {
      snippet = snippets[Number(snippetIndex)] || null;
    }
    if (!snippet) {
      const stored = localStorage.getItem(pendingSnippetKey);
      snippet = stored ? JSON.parse(stored) : null;
    }
    if (!snippet) {
      return false;
    }

    languageSelect.value = snippet.language;
    codeEditor.value = snippet.code;
    projectName.value = snippet.title.toLowerCase().replace(/\s+/g, "-");
    updateLineNumbers();
    updateRuntimeMode(snippet.language);
    outputConsole.textContent = `${snippet.title} 예제를 에디터로 불러왔습니다.`;
    statusBadge.textContent = content[currentLocale].runReady;
    loadCircuitForLanguage(snippet.language);
    resetPreview(previewFrame);
    localStorage.removeItem(pendingSnippetKey);
    return true;
  }

  function downloadCurrentProject() {
    const name = sanitizeName(projectName.value) || "vpr-project";
    const extension = languageSamples[languageSelect.value].extension;
    const blob = new Blob([codeEditor.value], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name}.${extension}`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  populateLanguageSelect(languageSelect);
  renderProjectList();
  fillRuntimeConfigForm();
  loadSample("javascript", true);

  const lastProjectName = localStorage.getItem(lastProjectKey);
  if (lastProjectName) {
    loadProjectByName(lastProjectName);
  } else {
    saveMeta.textContent = content[currentLocale].saveMetaEmpty;
  }
  applyPendingSnippet();

  languageSelect.addEventListener("change", (event) => loadSample(event.target.value, true));
  codeEditor.addEventListener("input", updateLineNumbers);
  runButton.addEventListener("click", runCurrentCode);
  saveButton.addEventListener("click", saveProject);
  newProjectButton.addEventListener("click", () => loadSample(languageSelect.value, true));
  downloadButton.addEventListener("click", downloadCurrentProject);

  projectList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-load-project]");
    if (!button) {
      return;
    }
    loadProjectByName(button.dataset.loadProject);
  });

  importFileInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const text = await file.text();
    codeEditor.value = text;
    projectName.value = sanitizeName(file.name.replace(/\.[^.]+$/, ""));
    updateLineNumbers();
    statusBadge.textContent = content[currentLocale].runReady;
    outputConsole.textContent = `${file.name} 파일을 편집기에 불러왔습니다.`;
    resetPreview(previewFrame);
    importFileInput.value = "";
  });

  toggleRuntimeConfigButton?.addEventListener("click", () => {
    runtimeConfigBody?.classList.toggle("is-hidden");
  });

  saveRuntimeConfigButton?.addEventListener("click", () => {
    try {
      const endpoint = String(runtimeEndpointInput?.value || "").trim();
      if (!/^https?:\/\//i.test(endpoint)) {
        throw new Error("Endpoint는 http/https URL이어야 합니다.");
      }
      const headers = parseRuntimeHeadersInput();
      setRuntimeConfig({ endpoint, headers });
      fillRuntimeConfigForm();
      statusBadge.textContent = content[currentLocale].runSaved;
      outputConsole.textContent = "런타임 설정이 저장되었습니다. 다시 실행해 보세요.";
    } catch (error) {
      statusBadge.textContent = content[currentLocale].runError;
      outputConsole.textContent = `런타임 설정 오류\n\n${error.message}`;
    }
  });

  resetRuntimeConfigButton?.addEventListener("click", () => {
    setRuntimeConfig({ endpoint: defaultRuntimeEndpoint, headers: {} });
    fillRuntimeConfigForm();
    statusBadge.textContent = content[currentLocale].runReady;
    outputConsole.textContent = "런타임 설정이 기본값으로 초기화되었습니다.";
  });

  applyCircuitNodeButton?.addEventListener("click", () => {
    const node = getNodeById(selectedNodeId);
    if (!node || !circuitWorkspace) {
      setCircuitStatus("먼저 편집할 부품을 선택하세요.");
      return;
    }
    const maxX = Math.max(0, circuitWorkspace.clientWidth - 132);
    const maxY = Math.max(0, circuitWorkspace.clientHeight - 56);
    node.name = (circuitNameInput?.value || node.name).trim().slice(0, 24) || node.name;
    node.pin = (circuitPinInput?.value || node.pin).trim().slice(0, 24) || node.pin;
    node.x = clamp(Number(circuitXInput?.value || node.x), 0, maxX);
    node.y = clamp(Number(circuitYInput?.value || node.y), 0, maxY);
    persistCircuitModel(languageSelect.value);
    renderCircuitForm();
    renderCircuitEditor();
    setCircuitStatus("부품 속성을 반영했습니다.");
  });

  addComponentButton?.addEventListener("click", () => {
    if (!circuitModel || !circuitWorkspace) {
      return;
    }
    const nextIndex = circuitModel.nodes.length + 1;
    const maxX = Math.max(0, circuitWorkspace.clientWidth - 132);
    const maxY = Math.max(0, circuitWorkspace.clientHeight - 56);
    const node = {
      id: `node-${Date.now()}`,
      name: `Component ${nextIndex}`,
      pin: "PIN",
      x: clamp(40 + nextIndex * 24, 0, maxX),
      y: clamp(36 + nextIndex * 16, 0, maxY),
    };
    circuitModel.nodes.push(node);
    selectedNodeId = node.id;
    persistCircuitModel(languageSelect.value);
    renderCircuitForm();
    renderCircuitEditor();
    setCircuitStatus("새 부품을 추가했습니다. 위치와 이름을 수정해 보세요.");
  });

  deleteCircuitNodeButton?.addEventListener("click", () => {
    if (!circuitModel || !selectedNodeId) {
      setCircuitStatus("삭제할 부품을 먼저 선택하세요.");
      return;
    }
    circuitModel.nodes = circuitModel.nodes.filter((node) => node.id !== selectedNodeId);
    circuitModel.wires = circuitModel.wires.filter((wire) => wire.from !== selectedNodeId && wire.to !== selectedNodeId);
    selectedNodeId = circuitModel.nodes[0]?.id || null;
    persistCircuitModel(languageSelect.value);
    renderCircuitForm();
    renderCircuitEditor();
    setCircuitStatus("선택한 부품을 삭제했습니다.");
  });

  connectComponentButton?.addEventListener("click", () => {
    if (!circuitModel || !selectedNodeId) {
      setCircuitStatus("연결 시작 부품을 먼저 선택하세요.");
      return;
    }
    connectFromNodeId = selectedNodeId;
    setCircuitStatus("연결할 대상 부품을 클릭하세요.");
  });

  resetCircuitButton?.addEventListener("click", () => {
    if (!isCircuitLanguage(languageSelect.value)) {
      return;
    }
    loadCircuitForLanguage(languageSelect.value, true);
  });

  circuitNodeLayer?.addEventListener("click", (event) => {
    const nodeElement = event.target.closest(".circuit-node");
    if (!nodeElement) {
      return;
    }
    const nodeId = nodeElement.dataset.nodeId;
    if (!nodeId) {
      return;
    }

    if (connectFromNodeId && connectFromNodeId !== nodeId && circuitModel) {
      const exists = circuitModel.wires.some(
        (wire) => (wire.from === connectFromNodeId && wire.to === nodeId) || (wire.from === nodeId && wire.to === connectFromNodeId)
      );
      if (!exists) {
        circuitModel.wires.push({ from: connectFromNodeId, to: nodeId });
        persistCircuitModel(languageSelect.value);
      }
      connectFromNodeId = null;
      selectedNodeId = nodeId;
      renderCircuitForm();
      renderCircuitEditor();
      setCircuitStatus("배선을 추가했습니다.");
      return;
    }

    selectCircuitNode(nodeId);
  });

  circuitNodeLayer?.addEventListener("mousedown", (event) => {
    const nodeElement = event.target.closest(".circuit-node");
    if (!nodeElement || !circuitWorkspace || !circuitModel) {
      return;
    }
    const nodeId = nodeElement.dataset.nodeId;
    const node = getNodeById(nodeId);
    if (!node) {
      return;
    }

    const workspaceRect = circuitWorkspace.getBoundingClientRect();
    dragState = {
      nodeId,
      offsetX: event.clientX - workspaceRect.left - node.x,
      offsetY: event.clientY - workspaceRect.top - node.y,
    };
    selectedNodeId = nodeId;
    renderCircuitForm();
    renderCircuitEditor();
  });

  window.addEventListener("mousemove", (event) => {
    if (!dragState || !circuitWorkspace || !circuitModel) {
      return;
    }
    const node = getNodeById(dragState.nodeId);
    if (!node) {
      return;
    }
    const workspaceRect = circuitWorkspace.getBoundingClientRect();
    const maxX = Math.max(0, circuitWorkspace.clientWidth - 132);
    const maxY = Math.max(0, circuitWorkspace.clientHeight - 56);
    node.x = clamp(event.clientX - workspaceRect.left - dragState.offsetX, 0, maxX);
    node.y = clamp(event.clientY - workspaceRect.top - dragState.offsetY, 0, maxY);
    renderCircuitForm();
    renderCircuitEditor();
  });

  window.addEventListener("mouseup", () => {
    if (!dragState) {
      return;
    }
    persistCircuitModel(languageSelect.value);
    dragState = null;
  });
}

function initAssistantPage() {
  const ideaPrompt = document.getElementById("ideaPrompt");
  const ideaResponse = document.getElementById("ideaResponse");
  const learningGuide = document.getElementById("learningGuide");
  const ideaButton = document.getElementById("ideaButton");
  const assistantLanguageSelect = document.getElementById("assistantLanguageSelect");
  const coachLanguageSelect = document.getElementById("coachLanguageSelect");
  const coachCodeInput = document.getElementById("coachCodeInput");
  const coachGoalInput = document.getElementById("coachGoalInput");
  const coachButton = document.getElementById("coachButton");
  const coachResponse = document.getElementById("coachResponse");
  const plannerPrompt = document.getElementById("plannerPrompt");
  const plannerButton = document.getElementById("plannerButton");
  const plannerResponse = document.getElementById("plannerResponse");
  const aiProviderSelect = document.getElementById("aiProviderSelect");
  const aiEndpointInput = document.getElementById("aiEndpointInput");
  const aiModelInput = document.getElementById("aiModelInput");
  const aiApiKeyInput = document.getElementById("aiApiKeyInput");
  const aiSaveButton = document.getElementById("aiSaveButton");
  const aiTestButton = document.getElementById("aiTestButton");
  const aiConfigStatus = document.getElementById("aiConfigStatus");

  if (
    !ideaPrompt ||
    !ideaResponse ||
    !learningGuide ||
    !ideaButton ||
    !assistantLanguageSelect ||
    !coachLanguageSelect ||
    !coachCodeInput ||
    !coachGoalInput ||
    !coachButton ||
    !coachResponse ||
    !plannerPrompt ||
    !plannerButton ||
    !plannerResponse ||
    !aiProviderSelect ||
    !aiEndpointInput ||
    !aiModelInput ||
    !aiApiKeyInput ||
    !aiSaveButton ||
    !aiTestButton ||
    !aiConfigStatus
  ) {
    return;
  }

  function fillAiConfigForm() {
    const config = getAiConfig();
    aiProviderSelect.value = config.provider;
    aiEndpointInput.value = config.endpoint;
    aiModelInput.value = config.model;
    aiApiKeyInput.value = config.apiKey;
  }

  function readAiConfigForm() {
    const provider = aiProviderSelect.value;
    if (!Object.prototype.hasOwnProperty.call(aiProviderPresets, provider)) {
      throw new Error("지원하지 않는 AI 제공자입니다.");
    }
    const endpoint = String(aiEndpointInput.value || "").trim();
    const model = String(aiModelInput.value || "").trim();
    const apiKey = String(aiApiKeyInput.value || "").trim();
    if (!endpoint || !/^https?:\/\//i.test(endpoint)) {
      throw new Error("Endpoint는 http/https 주소여야 합니다.");
    }
    if (!model) {
      throw new Error("Model을 입력해 주세요.");
    }
    if ((provider === "huggingface" || provider === "openrouter") && !apiKey) {
      throw new Error("이 제공자는 API Key가 필요합니다.");
    }
    return { provider, endpoint, model, apiKey };
  }

  function applyPreset(provider) {
    const preset = aiProviderPresets[provider];
    if (!preset) {
      return;
    }
    aiEndpointInput.value = preset.endpoint;
    aiModelInput.value = preset.model;
    if (provider === "ollama") {
      aiApiKeyInput.value = "";
    }
  }

  populateLanguageSelect(assistantLanguageSelect);
  populateLanguageSelect(coachLanguageSelect);
  assistantLanguageSelect.value = "javascript";
  coachLanguageSelect.value = "javascript";
  renderLearningGuide(learningGuide, assistantLanguageSelect.value);
  ideaResponse.textContent = content[currentLocale].ideaFallback;
  coachResponse.textContent = "코드를 넣고 목표를 적으면 실제 AI가 개선안을 생성합니다.";
  plannerResponse.textContent = "구현하고 싶은 기능을 입력하면 단계별 계획을 생성합니다.";
  fillAiConfigForm();

  aiProviderSelect.addEventListener("change", (event) => {
    applyPreset(event.target.value);
    aiConfigStatus.textContent = "제공자 프리셋을 불러왔습니다. 필요하면 수정 후 저장하세요.";
  });

  aiSaveButton.addEventListener("click", () => {
    try {
      const config = readAiConfigForm();
      setAiConfig(config);
      aiConfigStatus.textContent = `저장 완료: ${config.provider} / ${config.model}`;
    } catch (error) {
      aiConfigStatus.textContent = `설정 오류: ${error.message}`;
    }
  });

  aiTestButton.addEventListener("click", async () => {
    aiConfigStatus.textContent = "AI 연결 테스트 중...";
    try {
      const config = readAiConfigForm();
      setAiConfig(config);
      const result = await requestAi("idea", { prompt: "초보자를 위한 미니 프로젝트 2개만 제안해줘." });
      aiConfigStatus.textContent = `연결 성공\n\n${String(result).trim().slice(0, 240)}...`;
    } catch (error) {
      aiConfigStatus.textContent = `연결 실패: ${error.message}`;
    }
  });

  assistantLanguageSelect.addEventListener("change", (event) => {
    renderLearningGuide(learningGuide, event.target.value);
  });

  ideaButton.addEventListener("click", async () => {
    const raw = ideaPrompt.value.trim();
    if (!raw) {
      ideaResponse.textContent = content[currentLocale].ideaFallback;
      return;
    }
    ideaResponse.textContent = "AI가 아이디어를 생성 중입니다...";
    try {
      const result = await requestAi("idea", { prompt: raw });
      ideaResponse.textContent = result;
    } catch (error) {
      ideaResponse.textContent = `AI 호출 실패\n\n${error.message}\n\n대체 제안:\n${buildIdeaResponse(raw)}`;
    }
  });

  coachButton.addEventListener("click", async () => {
    const code = coachCodeInput.value.trim();
    const language = coachLanguageSelect.value;
    const goal = coachGoalInput.value.trim();
    if (!code) {
      coachResponse.textContent = "코드를 입력해 주세요.";
      return;
    }
    coachResponse.textContent = "AI 코드 코치가 분석 중입니다...";
    try {
      const result = await requestAi("coach", { language, code, goal });
      coachResponse.textContent = result;
    } catch (error) {
      coachResponse.textContent = `AI 호출 실패\n\n${error.message}`;
    }
  });

  plannerButton.addEventListener("click", async () => {
    const prompt = plannerPrompt.value.trim();
    if (!prompt) {
      plannerResponse.textContent = "구현하고 싶은 기능을 입력해 주세요.";
      return;
    }
    plannerResponse.textContent = "AI 플래너가 설계 단계를 생성 중입니다...";
    try {
      const result = await requestAi("planner", { prompt });
      plannerResponse.textContent = result;
    } catch (error) {
      plannerResponse.textContent = `AI 호출 실패\n\n${error.message}`;
    }
  });
}

function initErrorsPage() {
  const errorInput = document.getElementById("errorInput");
  const errorButton = document.getElementById("errorButton");
  const errorResponse = document.getElementById("errorResponse");
  if (!errorInput || !errorButton || !errorResponse) {
    return;
  }

  errorResponse.textContent = content[currentLocale].errorEmpty;
  errorButton.addEventListener("click", () => {
    errorResponse.textContent = buildErrorResponse(errorInput.value);
  });
}

function initCommunityPage() {
  const snippetList = document.getElementById("snippetList");
  const publicSnippetList = document.getElementById("publicSnippetList");
  const publishSelect = document.getElementById("publishProjectSelect");
  const publishButton = document.getElementById("publishButton");
  const publishDescription = document.getElementById("publishDescription");
  const publishStatus = document.getElementById("publishStatus");
  if (!snippetList || !publicSnippetList || !publishSelect || !publishButton || !publishDescription || !publishStatus) {
    return;
  }

  function renderBuiltInSnippets() {
    snippetList.innerHTML = snippets
      .map(
        (snippet, index) => `
          <li data-snippet-index="${index}">
            <strong>${escapeHtml(snippet.title)}</strong>
            <span>${escapeHtml(snippet.description)}</span>
          </li>`
      )
      .join("");
  }

  function renderPublicSnippets() {
    const list = getPublicSnippets().sort((a, b) => b.createdAt - a.createdAt);
    if (!list.length) {
      publicSnippetList.innerHTML = "<li><span>아직 공개된 코드가 없습니다.</span></li>";
      return;
    }

    publicSnippetList.innerHTML = list
      .map(
        (item, index) => `
          <li>
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.description || "설명 없음")}</span>
            <small>${escapeHtml(item.author)} · ${escapeHtml(languageSamples[item.language]?.label || item.language)} · ${formatTimestamp(item.createdAt)}</small>
            <button type="button" data-public-index="${index}">에디터로 열기</button>
          </li>`
      )
      .join("");
  }

  function populatePublishProjects() {
    const projects = getProjects();
    publishSelect.innerHTML = projects
      .map((project) => `<option value="${escapeHtml(project.name)}">${escapeHtml(project.name)} (${escapeHtml(languageSamples[project.language]?.label || project.language)})</option>`)
      .join("");

    if (!projects.length) {
      publishSelect.innerHTML = "<option value=''>저장된 프로젝트 없음</option>";
      publishButton.disabled = true;
    }
  }

  renderBuiltInSnippets();
  renderPublicSnippets();
  populatePublishProjects();

  snippetList.addEventListener("click", (event) => {
    const item = event.target.closest("li[data-snippet-index]");
    if (!item) {
      return;
    }

    localStorage.setItem(pendingSnippetKey, JSON.stringify(snippets[Number(item.dataset.snippetIndex)]));
    window.location.href = `editor.html?snippet=${item.dataset.snippetIndex}`;
  });

  publicSnippetList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-public-index]");
    if (!button) {
      return;
    }
    const item = getPublicSnippets().sort((a, b) => b.createdAt - a.createdAt)[Number(button.dataset.publicIndex)];
    if (!item) {
      return;
    }
    localStorage.setItem(pendingSnippetKey, JSON.stringify(item));
    window.location.href = "editor.html";
  });

  publishButton.addEventListener("click", () => {
    const user = getCurrentUser();
    if (!user) {
      publishStatus.textContent = "로그인 후 공개할 수 있습니다.";
      return;
    }

    const project = getProjects().find((item) => item.name === publishSelect.value);
    if (!project) {
      publishStatus.textContent = "프로젝트를 선택해 주세요.";
      return;
    }

    const list = getPublicSnippets();
    list.push({
      title: project.name,
      description: publishDescription.value.trim(),
      language: project.language,
      code: project.code,
      author: user,
      createdAt: Date.now(),
    });
    setPublicSnippets(list);
    publishStatus.textContent = "코드를 공개했습니다.";
    renderPublicSnippets();
  });
}

function initLoginPage() {
  const loginUsername = document.getElementById("loginUsername");
  const loginPassword = document.getElementById("loginPassword");
  const registerUsername = document.getElementById("registerUsername");
  const registerPassword = document.getElementById("registerPassword");
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const authStatusBox = document.getElementById("authStatusBox");
  if (!loginUsername || !loginPassword || !registerUsername || !registerPassword || !loginButton || !registerButton || !authStatusBox) {
    return;
  }

  authStatusBox.textContent = "아이디는 3~20자의 영문/숫자/_/- 형식, 비밀번호는 8자 이상을 권장합니다.";

  registerButton.addEventListener("click", async () => {
    const username = sanitizeName(registerUsername.value);
    const password = registerPassword.value;
    if (username.length < 3) {
      authStatusBox.textContent = "아이디 형식이 올바르지 않습니다.";
      return;
    }
    if (password.length < 8) {
      authStatusBox.textContent = "비밀번호는 8자 이상으로 설정하세요.";
      return;
    }

    const users = getUsers();
    if (users.some((user) => user.username === username)) {
      authStatusBox.textContent = "이미 존재하는 아이디입니다.";
      return;
    }

    const hash = await hashPassword(password);
    users.push({
      username,
      passwordHash: hash,
      profile: { displayName: username, bio: "", favoriteLang: "" },
    });
    setUsers(users);
    authStatusBox.textContent = "계정 생성 완료. 이제 로그인할 수 있습니다.";
  });

  loginButton.addEventListener("click", async () => {
    const username = sanitizeName(loginUsername.value);
    const hash = await hashPassword(loginPassword.value);
    const users = getUsers();
    const found = users.find((user) => user.username === username && user.passwordHash === hash);
    if (!found) {
      authStatusBox.textContent = "로그인 실패: 아이디 또는 비밀번호를 확인하세요.";
      return;
    }

    setCurrentUser(username);
    authStatusBox.textContent = "로그인 성공. 프로필 페이지로 이동합니다.";
    setTimeout(() => {
      window.location.href = "profile.html";
    }, 400);
  });
}

function initProfilePage() {
  const displayName = document.getElementById("profileDisplayName");
  const bio = document.getElementById("profileBio");
  const favoriteLang = document.getElementById("profileFavoriteLang");
  const saveButton = document.getElementById("saveProfileButton");
  const statusBox = document.getElementById("profileStatusBox");
  const logoutButton = document.getElementById("logoutButton");
  const myPublicList = document.getElementById("myPublicSnippetList");
  if (!displayName || !bio || !favoriteLang || !saveButton || !statusBox || !logoutButton || !myPublicList) {
    return;
  }

  const user = getCurrentUser();
  if (!user) {
    statusBox.innerHTML = "로그인이 필요합니다. <a href='login.html'>로그인 페이지로 이동</a>";
    saveButton.disabled = true;
    return;
  }

  const users = getUsers();
  const me = users.find((item) => item.username === user);
  if (!me) {
    statusBox.textContent = "계정 정보를 찾을 수 없습니다.";
    return;
  }

  displayName.value = me.profile.displayName || me.username;
  bio.value = me.profile.bio || "";
  favoriteLang.value = me.profile.favoriteLang || "";
  statusBox.textContent = `로그인 사용자: ${me.username}`;

  function renderMyPublic() {
    const mine = getPublicSnippets().filter((snippet) => snippet.author === me.username);
    if (!mine.length) {
      myPublicList.innerHTML = "<li><span>아직 공개한 코드가 없습니다.</span></li>";
      return;
    }
    myPublicList.innerHTML = mine
      .map(
        (item) => `<li><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.description || "설명 없음")}</span><small>${formatTimestamp(item.createdAt)}</small></li>`
      )
      .join("");
  }

  renderMyPublic();

  saveButton.addEventListener("click", () => {
    me.profile.displayName = displayName.value.trim().slice(0, 40);
    me.profile.bio = bio.value.trim().slice(0, 300);
    me.profile.favoriteLang = favoriteLang.value.trim().slice(0, 40);
    setUsers(users);
    statusBox.textContent = "프로필 저장 완료";
  });

  logoutButton.addEventListener("click", () => {
    setCurrentUser(null);
    window.location.href = "login.html";
  });
}

applyLocaleSelections();
renderAuthShortcut();
initHomePage();
initEditorPage();
initAssistantPage();
initErrorsPage();
initCommunityPage();
initLoginPage();
initProfilePage();
