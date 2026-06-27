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
  ja: {
    runReady: "準備完了",
    runDone: "実行完了",
    runSaved: "保存完了",
    runError: "実行エラー",
    outputReady: "Execution results will appear here.",
    ideaFallback: "Try a small calculator or guessing game project first.",
    learningIntro: "Learning points for the selected language",
    errorEmpty: "Paste an error message to get a likely cause and fix direction.",
    saveEmpty: "Enter a project name first.",
    saveMetaEmpty: "No saved project yet.",
    libraryEmpty: "No saved projects yet.",
    homeEmpty: "No saved projects yet.",
  },
  es: {
    runReady: "Listo",
    runDone: "Ejecucion completa",
    runSaved: "Guardado",
    runError: "Error de ejecucion",
    outputReady: "Execution results will appear here.",
    ideaFallback: "Try a small calculator or guessing game project first.",
    learningIntro: "Learning points for the selected language",
    errorEmpty: "Paste an error message to get a likely cause and fix direction.",
    saveEmpty: "Enter a project name first.",
    saveMetaEmpty: "No saved project yet.",
    libraryEmpty: "No saved projects yet.",
    homeEmpty: "No saved projects yet.",
  },
};

const storageKey = "vpr-projects";
const lastProjectKey = "vpr-last-project";
const localeKey = "vpr-locale";
const themeKey = "vpr-theme";
const pendingSnippetKey = "vpr-pending-snippet";
const usersKey = "vpr-users";
const sessionUserKey = "vpr-session-user";
const publicSnippetsKey = "vpr-public-snippets";
const runThrottleKey = "vpr-run-throttle-window";
const runtimeConfigKey = "vpr-runtime-config";
const circuitStateKey = "vpr-circuit-state";
const aiConfigKey = "vpr-ai-config";
const aiChatRoomsKey = "vpr-ai-chat-rooms";
const aiActiveChatRoomKey = "vpr-ai-active-chat-room";
const homeMemoKey = "vpr-home-memo";
const homeTodoKey = "vpr-home-todos";
const homeBrowserUrlKey = "vpr-home-browser-url";
const _isLocalDev = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(window.location.host) || window.location.protocol === 'file:';
const defaultRuntimeEndpoint = _isLocalDev
  ? "http://localhost:3000/api/v2/piston/execute"
  : `${window.location.origin}/api/v2/piston/execute`;
const defaultAiProxyEndpoint = _isLocalDev
  ? "http://localhost:3000/api/ai/chat"
  : `${window.location.origin}/api/ai/chat`;
const defaultAiModelAuditEndpoint = _isLocalDev
  ? "http://localhost:3000/api/ai/models/audit"
  : `${window.location.origin}/api/ai/models/audit`;
const defaultDataApiBase = _isLocalDev
  ? "http://localhost:3000/api/data"
  : `${window.location.origin}/api/data`;

const localeOptions = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  es: "Español",
};

const aiProviderPresets = {
  huggingface: {
    provider: "huggingface",
    endpoint: "https://router.huggingface.co/hf-inference/models",
    model: "Qwen/Qwen2.5-Coder-32B-Instruct",
    apiKey: "",
  },
};

// Hugging Face hf-inference candidate models
const huggingFaceModels = [
  { name: "Qwen2.5 Coder 32B (code-generation)", value: "Qwen/Qwen2.5-Coder-32B-Instruct" },
  { name: "Carbon-3B (text-generation)", value: "HuggingFaceBio/Carbon-3B" },
  { name: "BART Large CNN (요약)", value: "facebook/bart-large-cnn" },
  { name: "T5 Small (번역/일반 텍스트)", value: "google-t5/t5-small" },
  { name: "T5 Base (번역/일반 텍스트)", value: "google-t5/t5-base" },
  { name: "PEGASUS XSum (요약)", value: "google/pegasus-xsum" },
  { name: "BART Large XSum (요약)", value: "facebook/bart-large-xsum" },
  { name: "MADLAD400 3B MT (다국어 번역)", value: "google/madlad400-3b-mt" },
  { name: "Falconsai Text Summarization", value: "Falconsai/text_summarization" },
];

const huggingFaceAuditCandidates = [
  ...huggingFaceModels.map((item) => item.value),
  "google/bigbird-pegasus-large-arxiv",
  "google/madlad400-3b-mt",
  "facebook/bart-large-xsum",
  "google/pegasus-xsum",
  "google-t5/t5-large",
  "google-t5/t5-small",
  "google-t5/t5-base",
  "HuggingFaceBio/Carbon-3B",
  "Falconsai/text_summarization",
];

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
  rust: {
    label: "Rust",
    extension: "rs",
    runner: { language: "rust", version: "1.89.0" },
    guide: ["소유권과 빌림 규칙을 먼저 이해하세요.", "Result와 Option을 패턴 매칭으로 처리하세요."],
    code: "fn main() {\n    println!(\"Hello from Rust\");\n}",
  },
  fortran: {
    label: "Fortran",
    extension: "f90",
    runner: { language: "fortran", version: "13.2.0" },
    guide: ["program / end program 구조를 유지하세요.", "입출력 형식과 배열 인덱스를 주의하세요."],
    code: "program main\n  print *, 'Hello from Fortran'\nend program main",
  },
  zig: {
    label: "Zig",
    extension: "zig",
    runner: { language: "zig", version: "0.16.0" },
    guide: ["명시적 에러 처리와 타입을 유지하세요.", "표준 라이브러리 import를 최소 단위로 시작하세요."],
    code: "const std = @import(\"std\");\n\npub fn main() void {\n    std.debug.print(\"Hello from Zig\\n\", .{});\n}",
  },
  asm: {
    label: "ASM (auto)",
    extension: "s",
    runner: { language: "asm", version: "gcc-as" },
    guide: ["기본 ASM은 GCC/GAS x64 문법 기준으로 실행됩니다.", "세부 방언이 필요하면 ASM (x64 / GAS), ASM (NASM)을 선택하세요."],
    code: ".intel_syntax noprefix\n.section .rdata,\"dr\"\nmsg: .asciz \"Hello from ASM\"\n\n.text\n.globl main\n.extern puts\nmain:\n    sub rsp, 40\n    lea rcx, msg[rip]\n    call puts\n    xor eax, eax\n    add rsp, 40\n    ret",
  },
  "asm-x64": {
    label: "ASM (x64 / GAS)",
    extension: "s",
    runner: { language: "asm-x64", version: "gcc-as x64" },
    guide: ["Windows x64 + GNU as 문법용입니다.", "`.intel_syntax noprefix`, `.globl main`, `rip` 상대 주소를 사용하세요."],
    code: ".intel_syntax noprefix\n.section .rdata,\"dr\"\nmsg: .asciz \"Hello from ASM x64\"\n\n.text\n.globl main\n.extern puts\nmain:\n    sub rsp, 40\n    lea rcx, msg[rip]\n    call puts\n    xor eax, eax\n    add rsp, 40\n    ret",
  },
  "asm-nasm": {
    label: "ASM (NASM)",
    extension: "asm",
    runner: { language: "asm-nasm", version: "nasm" },
    guide: ["NASM 문법(`section .text`, `global main`)용입니다.", "[rel 레이블] RIP-relative 주소 지정을 반드시 사용하세요."],
    code: "section .data\n    msg db \"Hello from NASM\", 0\n\nsection .text\n    global main\n    extern puts\n    main:\n        sub rsp, 40\n        lea rcx, [rel msg]\n        call puts\n        xor eax, eax\n        add rsp, 40\n        ret",
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

const errorAnalysisRules = [
  {
    id: "syntax",
    title: "문법 오류",
    match: /syntaxerror|invalid syntax|unexpected token|expected .* before|missing .*;|cs1002|unterminated string|indentationerror|taberror/i,
    cause: "괄호/따옴표/세미콜론/콜론 누락 또는 블록 정렬 문제 가능성이 큽니다.",
    fixes: [
      "에러가 표시된 줄과 바로 윗줄의 괄호(), 중괄호{}, 대괄호[] 짝을 먼저 맞추세요.",
      "문자열 시작/종료 따옴표가 같은지 확인하세요.",
      "C/C++/Java/C# 계열은 줄 끝 세미콜론(;) 누락을 확인하세요.",
      "Python은 들여쓰기(공백 수)와 콜론(:) 누락을 확인하세요.",
    ],
  },
  {
    id: "name",
    title: "이름/심볼 미정의",
    match: /nameerror|is not defined|cannot find symbol|undeclared identifier|cs0103|referenceerror/i,
    cause: "변수/함수/클래스 이름 오타 또는 선언 전에 사용한 경우가 많습니다.",
    fixes: [
      "에러 이름의 철자와 대소문자를 선언부와 정확히 일치시키세요.",
      "해당 심볼이 사용되기 전에 선언/초기화되는지 확인하세요.",
      "파일 분리 프로젝트라면 import/include using 문을 확인하세요.",
    ],
  },
  {
    id: "null",
    title: "널/없음 값 접근",
    match: /nullreferenceexception|cannot read propert|cannot read .* of undefined|none ?type|attributeerror: 'none|undefined|nil pointer|object reference not set/i,
    cause: "값이 없는 상태(null/undefined/None)에서 속성이나 메서드 접근이 발생했습니다.",
    fixes: [
      "접근 전에 null/undefined/None 체크를 추가하세요.",
      "함수 반환값이 비어 있을 수 있는 경로를 처리하세요.",
      "초기화 순서를 점검하고 기본값을 지정하세요.",
    ],
  },
  {
    id: "index",
    title: "인덱스/범위 오류",
    match: /indexerror|out of range|arrayindexoutofboundsexception|rangeerror|subscript out of range/i,
    cause: "배열/리스트 길이를 넘는 인덱스를 접근한 상황입니다.",
    fixes: [
      "반복문 종료 조건을 < length 형태로 점검하세요.",
      "빈 배열일 수 있는 경우를 먼저 처리하세요.",
      "사용 전 인덱스 유효성 검사(0 <= i < length)를 추가하세요.",
    ],
  },
  {
    id: "module",
    title: "모듈/패키지 로드 실패",
    match: /modulenotfounderror|cannot find module|no module named|importerror|cannot resolve module|package .* does not exist/i,
    cause: "의존성 설치 누락, 경로 오타, 런타임 환경 차이 가능성이 큽니다.",
    fixes: [
      "모듈 이름 오타와 대소문자를 확인하세요.",
      "실행 환경에 해당 패키지가 설치되어 있는지 확인하세요.",
      "상대경로 import는 현재 파일 기준 경로를 다시 확인하세요.",
    ],
  },
  {
    id: "type",
    title: "타입 불일치",
    match: /typeerror|cannot convert|invalid literal|classcastexception|cannot assign|operator .* not supported|argument of type/i,
    cause: "함수 인자, 연산 대상, 반환 타입이 기대 타입과 다릅니다.",
    fixes: [
      "문자열/숫자 변환 위치를 명시적으로 처리하세요.",
      "함수 시그니처(인자 개수/타입)와 호출부를 맞추세요.",
      "동적 언어도 입력값 타입 검증 코드를 추가하세요.",
    ],
  },
  {
    id: "memory",
    title: "메모리/포인터 오류",
    match: /segmentation fault|access violation|stack overflow|double free|invalid pointer|core dumped/i,
    cause: "잘못된 포인터 접근, 해제 후 접근, 과도한 재귀/스택 사용 가능성이 있습니다.",
    fixes: [
      "포인터/참조가 유효한 시점에만 접근하세요.",
      "해제(free/delete) 이후 재사용 여부를 확인하세요.",
      "재귀 깊이를 줄이거나 반복문으로 대체하세요.",
    ],
  },
  {
    id: "timeout",
    title: "시간 초과/무한 루프",
    match: /time.?out|timed out|execution time limit|infinite loop|maximum call stack size exceeded/i,
    cause: "종료 조건 누락 또는 과도한 연산으로 실행 제한 시간을 초과했습니다.",
    fixes: [
      "반복문/재귀 종료 조건이 반드시 참이 되는지 확인하세요.",
      "입력 크기에 따른 시간복잡도를 줄이세요.",
      "디버그 출력으로 루프 변수 변화를 추적하세요.",
    ],
  },
  {
    id: "io",
    title: "입력/출력 처리 오류",
    match: /eof when reading a line|input mismatch|scanf|scanner|valueerror: invalid literal for int|numberformatexception/i,
    cause: "입력 형식이 코드가 기대하는 형식과 다르거나 입력이 부족합니다.",
    fixes: [
      "입력 개수/형식을 문제 요구사항과 동일하게 맞추세요.",
      "숫자 파싱 전에 trim, 빈 문자열 체크를 추가하세요.",
      "공백/개행 단위 입력 처리 로직을 점검하세요.",
    ],
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
if (!Object.prototype.hasOwnProperty.call(content, currentLocale)) {
  currentLocale = "en";
}

function getCurrentTheme() {
  const raw = localStorage.getItem(themeKey);
  return raw === "dark" ? "dark" : "light";
}

function applyTheme(theme) {
  const next = theme === "dark" ? "dark" : "light";
  localStorage.setItem(themeKey, next);
  document.body.setAttribute("data-theme", next);
}

function applyThemeSelections() {
  document.querySelectorAll("#themeSelect").forEach((select) => {
    select.value = getCurrentTheme();
    select.addEventListener("change", (event) => {
      applyTheme(event.target.value);
    });
  });
}

function populateLocaleSelect(select) {
  if (!select) {
    return;
  }
  select.innerHTML = Object.entries(localeOptions)
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join("");
}

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

async function dataApiGet(pathname) {
  const response = await fetch(`${defaultDataApiBase}${pathname}`, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Data API GET failed (${response.status})`);
  }
  return response.json();
}

async function dataApiPost(pathname, payload) {
  const response = await fetch(`${defaultDataApiBase}${pathname}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Data API POST failed (${response.status})`);
  }
  return response.json();
}

function syncProjectsToSql(projects) {
  dataApiPost("/projects/bulk", { projects }).catch(() => {});
}

function syncUsersToSql(users) {
  dataApiPost("/users/bulk", { users }).catch(() => {});
}

function syncPublicSnippetsToSql(items) {
  dataApiPost("/public-snippets/bulk", { items }).catch(() => {});
}

async function hydrateLocalStorageFromSql() {
  try {
    const health = await dataApiGet("/health");
    if (!health?.ok) {
      return;
    }

    const [projectsRes, usersRes, snippetsRes] = await Promise.all([
      dataApiGet("/projects"),
      dataApiGet("/users"),
      dataApiGet("/public-snippets"),
    ]);

    if (Array.isArray(projectsRes.projects)) {
      localStorage.setItem(storageKey, JSON.stringify(projectsRes.projects));
    }
    if (Array.isArray(usersRes.users)) {
      localStorage.setItem(usersKey, JSON.stringify(usersRes.users));
    }
    if (Array.isArray(snippetsRes.items)) {
      localStorage.setItem(publicSnippetsKey, JSON.stringify(snippetsRes.items));
    }
  } catch {
    // SQL store unavailable: keep localStorage-only behavior
  }
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
  syncProjectsToSql(projects);
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
  syncUsersToSql(users);
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
  syncPublicSnippetsToSql(items);
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

function guessLanguageFromErrorLog(message) {
  const rules = [
    { lang: "python", match: /traceback|syntaxerror|indentationerror|modulenotfounderror|nameerror|attributeerror/i },
    { lang: "javascript", match: /referenceerror|cannot read properties|node:internal|npm|at .*\(.+:\d+:\d+\)/i },
    { lang: "typescript", match: /ts\d{4}|typescript/i },
    { lang: "java", match: /exception in thread|\.java:\d+|cannot find symbol|javac/i },
    { lang: "csharp", match: /cs\d{4}|unhandled exception|system\./i },
    { lang: "cpp", match: /\.cpp:\d+|g\+\+|std::|undefined reference|segmentation fault/i },
    { lang: "c", match: /\.c:\d+|clang|gcc|scanf|printf/i },
    { lang: "go", match: /panic:|goroutine|\.go:\d+|go build/i },
    { lang: "ruby", match: /nomethoderror|undefined method|\.rb:\d+/i },
    { lang: "sql", match: /sql syntax|sqlite|postgres|mysql|near ".*": syntax error/i },
    { lang: "bash", match: /command not found|permission denied|line \d+:|bash:/i },
    { lang: "powershell", match: /at line:\d+ char:\d+|fullyqualifiederrorid|powershell/i },
  ];

  const found = rules.find((rule) => rule.match.test(message));
  return found ? found.lang : "unknown";
}

function extractErrorLocation(message) {
  const patterns = [
    /File\s+"([^"]+)",\s+line\s+(\d+)/i,
    /at\s+.*\(([^)\n]+):(\d+):(\d+)\)/i,
    /([\w./\\-]+\.(?:js|ts|py|java|cs|go|c|cpp|rb|sql|sh|ps1)):(\d+):(\d+)/i,
    /([\w./\\-]+\.(?:js|ts|py|java|cs|go|c|cpp|rb|sql|sh|ps1)):(\d+)/i,
    /([\w./\\-]+\.(?:cs))\((\d+),(\d+)\)/i,
    /line\s+(\d+)/i,
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (!match) continue;

    if (pattern.source.includes("File\\s+\"")) {
      return { file: match[1], line: Number(match[2]), column: null, confidence: "high" };
    }

    if (pattern.source.includes("at\\s+.*\\(")) {
      return { file: match[1], line: Number(match[2]), column: Number(match[3]), confidence: "high" };
    }

    if (pattern.source.includes("\\.(?:js|ts|py|java|cs|go|c|cpp|rb|sql|sh|ps1)):(\\d+):(\\d+)")) {
      return { file: match[1], line: Number(match[2]), column: Number(match[3]), confidence: "high" };
    }

    if (pattern.source.includes("\\.(?:cs))\\((\\d+),(\\d+)\\)")) {
      return { file: match[1], line: Number(match[2]), column: Number(match[3]), confidence: "high" };
    }

    if (pattern.source.includes("\\.(?:js|ts|py|java|cs|go|c|cpp|rb|sql|sh|ps1)):(\\d+)")) {
      return { file: match[1], line: Number(match[2]), column: null, confidence: "medium" };
    }

    if (pattern.source.includes("line\\s+(\\d+)")) {
      return { file: null, line: Number(match[1]), column: null, confidence: "low" };
    }
  }

  return { file: null, line: null, column: null, confidence: "low" };
}

function findMatchedErrorRules(message) {
  const matched = errorAnalysisRules.filter((rule) => rule.match.test(message));
  return matched.length > 0 ? matched : [];
}

function estimateCodeAtLine(relatedCode, lineNumber) {
  if (!relatedCode || !lineNumber) {
    return null;
  }

  const lines = String(relatedCode).split(/\r?\n/);
  const index = lineNumber - 1;
  if (index < 0 || index >= lines.length) {
    return null;
  }

  const target = lines[index]?.trim();
  if (!target) {
    return null;
  }

  return target.length > 200 ? `${target.slice(0, 200)}...` : target;
}

function buildGeneralFallbackTips(language) {
  const languageSpecific = {
    python: "Python은 Traceback의 마지막 예외 줄 바로 위의 File/line 위치부터 확인하세요.",
    javascript: "JavaScript는 스택트레이스의 가장 위 사용자 코드 파일:줄부터 확인하세요.",
    typescript: "TypeScript는 컴파일 오류 코드(TSxxxx)와 해당 줄 타입 선언을 같이 확인하세요.",
    java: "Java는 첫 번째 컴파일 오류를 먼저 해결하면 연쇄 오류가 함께 사라지는 경우가 많습니다.",
    csharp: "C#은 CS 오류 코드별 원인(예: CS1002 ; 누락)을 먼저 확인하세요.",
    c: "C는 경고를 무시하지 말고 포인터/배열 접근 경계를 먼저 점검하세요.",
    cpp: "C++는 템플릿/타입 오류가 길게 나오므로 첫 번째 error 줄부터 순서대로 해결하세요.",
    go: "Go는 컴파일러 메시지의 파일:줄:열 포맷을 그대로 따라가면 빠릅니다.",
  };

  return [
    languageSpecific[language] || "오류 로그의 첫 번째 파일/줄 정보부터 확인하세요.",
    "최근 수정한 코드 블록만 임시로 최소화해 재실행하면 원인 분리가 쉬워집니다.",
    "입력값이 필요한 프로그램이면 표준 입력 형식과 개수를 문제 요구와 동일하게 맞추세요.",
  ];
}

function buildErrorResponse(message, options = {}) {
  const raw = String(message || "").trim();
  if (!raw) {
    return content[currentLocale].errorEmpty;
  }

  const providedLanguage = options.language || "";
  const providedFile = String(options.fileName || "").trim();
  const relatedCode = String(options.relatedCode || "");

  const inferredLanguage = providedLanguage && providedLanguage !== "auto" ? providedLanguage : guessLanguageFromErrorLog(raw);
  const location = extractErrorLocation(raw);
  const detectedFile = location.file || providedFile || "(로그에서 파일명을 찾지 못함)";
  const detectedLine = location.line || "(줄 번호 미확인)";
  const detectedColumn = location.column || "(열 정보 없음)";
  const matchedRules = findMatchedErrorRules(raw);
  const estimatedCode = estimateCodeAtLine(relatedCode, Number(location.line));

  const summaryLines = [
    "[진단 요약]",
    `- 추정 언어: ${inferredLanguage}`,
    `- 추정 파일: ${detectedFile}`,
    `- 추정 위치: line ${detectedLine}, col ${detectedColumn}`,
    `- 위치 신뢰도: ${location.confidence}`,
  ];

  const rootCauseLines = ["", "[가능한 원인]"];
  if (matchedRules.length) {
    matchedRules.slice(0, 3).forEach((rule, index) => {
      rootCauseLines.push(`${index + 1}. ${rule.title}: ${rule.cause}`);
    });
  } else {
    rootCauseLines.push("1. 로그 패턴이 일반 분류에 정확히 매칭되지 않았습니다.");
    rootCauseLines.push("2. 가장 먼저 표시된 파일/줄의 직전 3~5줄 문맥에서 원인을 찾는 것이 효과적입니다.");
  }

  const fixLines = ["", "[권장 수정 순서]"];
  if (matchedRules.length) {
    const uniqueFixes = [];
    matchedRules.forEach((rule) => {
      rule.fixes.forEach((fix) => {
        if (!uniqueFixes.includes(fix)) {
          uniqueFixes.push(fix);
        }
      });
    });
    uniqueFixes.slice(0, 6).forEach((fix, index) => {
      fixLines.push(`${index + 1}. ${fix}`);
    });
  } else {
    buildGeneralFallbackTips(inferredLanguage).forEach((tip, index) => {
      fixLines.push(`${index + 1}. ${tip}`);
    });
  }

  const expectedCodeLines = ["", "[해당 위치에서 의심되는 코드 형태]"];
  if (estimatedCode) {
    expectedCodeLines.push(`- 제공한 코드 기준 line ${location.line}: ${estimatedCode}`);
  } else if (location.line) {
    expectedCodeLines.push(`- line ${location.line} 부근에서 선언 누락/타입 불일치/괄호 불균형 코드가 있을 가능성이 큽니다.`);
  } else {
    expectedCodeLines.push("- 파일/줄 정보가 부족합니다. 전체 로그(스택트레이스 포함)를 그대로 입력하면 정확도가 올라갑니다.");
  }

  const quickChecklist = [
    "",
    "[빠른 체크리스트]",
    "1. 첫 번째 error/exception 메시지만 남기고 재실행해 2차 오류를 제거",
    "2. 해당 줄 바로 위/아래 3줄 포함해 문법과 변수 선언 순서 확인",
    "3. import/include/패키지 설치 여부 확인",
    "4. 입력 형식(공백/개행/타입) 재검증",
  ];

  return [...summaryLines, ...rootCauseLines, ...fixLines, ...expectedCodeLines, ...quickChecklist].join("\n");
}

function applyLocaleSelections() {
  document.querySelectorAll("#localeSelect").forEach((select) => {
    populateLocaleSelect(select);
    select.value = currentLocale;
    select.addEventListener("change", (event) => {
      currentLocale = event.target.value;
      localStorage.setItem(localeKey, currentLocale);
      location.reload();
    });
  });
}

function getSecondaryHashFromUser(user) {
  if (user?.profile?.secondPasswordHash) {
    return String(user.profile.secondPasswordHash);
  }
  return String(user?.passwordHash || "");
}

async function registerUserAccount(usernameRaw, passwordRaw, secondPasswordRaw) {
  const username = sanitizeName(usernameRaw);
  const password = String(passwordRaw || "");
  const secondPassword = String(secondPasswordRaw || "");

  if (username.length < 3) {
    throw new Error("아이디 형식이 올바르지 않습니다.");
  }
  if (password.length < 8) {
    throw new Error("1차 비밀번호는 8자 이상이어야 합니다.");
  }
  if (secondPassword.length < 8) {
    throw new Error("2차 비밀번호는 8자 이상이어야 합니다.");
  }

  const users = getUsers();
  if (users.some((user) => user.username === username)) {
    throw new Error("이미 존재하는 아이디입니다.");
  }

  const passwordHash = await hashPassword(password);
  const secondPasswordHash = await hashPassword(secondPassword);
  users.push({
    username,
    passwordHash,
    profile: {
      displayName: username,
      bio: "",
      favoriteLang: "",
      secondPasswordHash,
      imageDataUrl: "",
    },
  });
  setUsers(users);
  return username;
}

async function loginUserAccount(usernameRaw, passwordRaw, secondPasswordRaw) {
  const username = sanitizeName(usernameRaw);
  const users = getUsers();
  const user = users.find((item) => item.username === username);
  if (!user) {
    throw new Error("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
  }

  const primaryHash = await hashPassword(String(passwordRaw || ""));
  const secondaryHash = await hashPassword(String(secondPasswordRaw || ""));
  if (user.passwordHash !== primaryHash || getSecondaryHashFromUser(user) !== secondaryHash) {
    throw new Error("로그인 실패: 1차 또는 2차 비밀번호가 올바르지 않습니다.");
  }

  setCurrentUser(username);
  return user;
}

async function verifyCurrentUserDualPassword(passwordRaw, secondPasswordRaw) {
  const username = getCurrentUser();
  if (!username) {
    throw new Error("로그인이 필요합니다.");
  }
  const users = getUsers();
  const user = users.find((item) => item.username === username);
  if (!user) {
    throw new Error("계정 정보를 찾을 수 없습니다.");
  }

  const primaryHash = await hashPassword(String(passwordRaw || ""));
  const secondaryHash = await hashPassword(String(secondPasswordRaw || ""));
  if (user.passwordHash !== primaryHash || getSecondaryHashFromUser(user) !== secondaryHash) {
    throw new Error("비밀번호 확인에 실패했습니다.");
  }
  return { users, user };
}

function deleteAccountCompletely(username) {
  const users = getUsers().filter((item) => item.username !== username);
  setUsers(users);

  const snippets = getPublicSnippets().filter((item) => item.author !== username);
  setPublicSnippets(snippets);

  if (getCurrentUser() === username) {
    setCurrentUser(null);
  }
}

function buildBasicExample(languageKey) {
  const label = languageSamples[languageKey]?.label || languageKey;
  switch (languageKey) {
    case "javascript":
      return `console.log('Hello from ${label}');\nconsole.log(1 + 1);`;
    case "typescript":
      return `console.log('Hello from ${label}');\nconsole.log(1 + 1);`;
    case "python":
      return `print('Hello from ${label}')\nprint(1 + 1)`;
    case "c":
      return `#include <stdio.h>\n\nint main(void) {\n  printf(\"Hello from ${label}\\n\");\n  printf(\"%d\\n\", 1 + 1);\n  return 0;\n}`;
    case "cpp":
      return `#include <iostream>\n\nint main() {\n  std::cout << \"Hello from ${label}\\n\";\n  std::cout << (1 + 1) << \"\\n\";\n  return 0;\n}`;
    case "csharp":
      return `using System;\n\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Hello from ${label}\");\n    Console.WriteLine(1 + 1);\n  }\n}`;
    case "java":
      return `public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello from ${label}\");\n    System.out.println(1 + 1);\n  }\n}`;
    case "go":
      return `package main\n\nimport \"fmt\"\n\nfunc main() {\n  fmt.Println(\"Hello from ${label}\")\n  fmt.Println(1 + 1)\n}`;
    case "rust":
      return `fn main() {\n  println!(\"Hello from ${label}\");\n  println!(\"{}\", 1 + 1);\n}`;
    case "fortran":
      return `program main\n  print *, \"Hello from ${label}\"\n  print *, 1 + 1\nend program main`;
    case "zig":
      return `const std = @import(\"std\");\n\npub fn main() void {\n  std.debug.print(\"Hello from ${label}\\n\", .{});\n  std.debug.print(\"{}\\n\", .{1 + 1});\n}`;
    case "asm":
      return `.intel_syntax noprefix\n.section .rdata,\"dr\"\nmsg: .asciz \"Hello from ${label}\"\n\n.text\n.globl main\n.extern puts\nmain:\n  sub rsp, 40\n  lea rcx, msg[rip]\n  call puts\n  xor eax, eax\n  add rsp, 40\n  ret`;
    case "asm-x64":
      return `.intel_syntax noprefix\n.section .rdata,\"dr\"\nmsg: .asciz \"Hello from ${label}\"\n\n.text\n.globl main\n.extern puts\nmain:\n  sub rsp, 40\n  lea rcx, msg[rip]\n  call puts\n  xor eax, eax\n  add rsp, 40\n  ret`;
    case "asm-nasm":
      return `section .data\nmsg db \"Hello from ${label}\", 0\n\nsection .text\nglobal main\nextern puts\nmain:\n  sub rsp, 40\n  lea rcx, [rel msg]\n  call puts\n  xor eax, eax\n  add rsp, 40\n  ret`;
    case "ruby":
      return `puts 'Hello from ${label}'\nputs 1 + 1`;
    case "sql":
      return `SELECT 'Hello from ${label}' AS message;\nSELECT 1 + 1 AS result;`;
    case "powershell":
      return `Write-Output 'Hello from ${label}'\nWrite-Output (1 + 1)`;
    case "bash":
      return `echo \"Hello from ${label}\"\necho $((1 + 1))`;
    case "html":
      return `<!DOCTYPE html>\n<html lang=\"ko\">\n  <body>\n    <h1>Hello from ${label}</h1>\n    <p>1 + 1 = 2</p>\n  </body>\n</html>`;
    case "css":
      return `body::before {\n  content: \"Hello from ${label} | 1 + 1 = 2\";\n  display: block;\n  padding: 18px;\n  font: 700 18px/1.4 'IBM Plex Sans KR', sans-serif;\n}`;
    case "arduino":
      return `void setup() {\n  Serial.begin(9600);\n  Serial.println(\"Hello from ${label}\");\n  Serial.println(1 + 1);\n}\n\nvoid loop() {}`;
    case "espidf":
      return `#include <stdio.h>\n\nvoid app_main(void) {\n  printf(\"Hello from ${label}\\n\");\n  printf(\"%d\\n\", 1 + 1);\n}`;
    default:
      return `// Hello from ${label}\n// 1 + 1 = 2`;
  }
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

const componentTypes = {
  arduinoBoards: {
    "arduino-uno": "Arduino UNO",
    "arduino-nano": "Arduino Nano",
    "arduino-mega": "Arduino Mega 2560",
    "arduino-leonardo": "Arduino Leonardo",
    "arduino-due": "Arduino Due",
  },
  espBoards: {
    "esp8266-01": "ESP8266-01",
    "esp8266-12": "ESP8266-12E",
    "esp32": "ESP32 DevKit",
    "esp32-s2": "ESP32-S2",
    "esp32-s3": "ESP32-S3",
    "esp32-c2": "ESP32-C2",
    "esp32-c3": "ESP32-C3",
    "esp32-c6": "ESP32-C6",
    "esp32-h2": "ESP32-H2",
    "esp32-p4": "ESP32-P4",
  },
  displays: {
    "oled-096": "0.96'' OLED (I2C)",
    "oled-128": "1.3'' OLED (SPI)",
    "tft-144": "1.44'' TFT (SPI)",
    "tft-18": "1.8'' TFT (SPI)",
    "tft-24": "2.4'' TFT (SPI)",
    "tft-35": "3.5'' TFT (SPI)",
    "tft-7": "7'' TFT (HDMI)",
    "lcd-16x2": "16x2 LCD (I2C)",
  },
  ledColors: {
    "led-red": "Red LED",
    "led-green": "Green LED",
    "led-blue": "Blue LED",
    "led-yellow": "Yellow LED",
    "led-rgb": "RGB LED",
  },
  modules: {
    "buzzer": "Buzzer",
    "relay": "5V Relay",
    "pir-sensor": "PIR Motion Sensor",
    "ldr-sensor": "Light Sensor (LDR)",
    "dht11": "DHT11 (Temp & Humidity)",
    "gsm-sim800": "GSM Module (SIM800L)",
    "wifi-at": "WiFi Module (AT)",
    "bluetooth-hc05": "Bluetooth (HC-05)",
    "gps-neo6m": "GPS Module (NEO-6M)",
    "lorawan-rfm95": "LoRaWAN (RFM95W)",
  },
};

function getDefaultCircuitModel(languageKey) {
  if (languageKey === "arduino") {
    return {
      nodes: [
        { id: "a-board", name: "Arduino UNO R3", type: "mcu", variant: "arduino-uno", pin: "5V/GND", x: 34, y: 38, state: {} },
        { id: "a-bread", name: "Breadboard", type: "breadboard", pin: "+ / -", x: 250, y: 42, state: {} },
        { id: "a-res", name: "Resistor", type: "resistor", pin: "220R", x: 430, y: 128, state: {} },
        { id: "a-led", name: "Green LED", type: "led", variant: "led-green", pin: "D13", x: 620, y: 130, state: { on: false } },
        { id: "a-btn", name: "Button", type: "button", pin: "D2", x: 280, y: 280, state: { pressed: false } },
      ],
      wires: [
        { from: "a-board", to: "a-bread" },
        { from: "a-board", to: "a-res" },
        { from: "a-res", to: "a-led" },
        { from: "a-btn", to: "a-board" },
      ],
    };
  }

  return {
    nodes: [
      { id: "e-esp32", name: "ESP32-S3 DevKitC-1", type: "mcu", variant: "esp32-s3", pin: "3V3/GND", x: 34, y: 38, state: {} },
      { id: "e-sensor", name: "Temperature Sensor", type: "sensor", pin: "A0", x: 260, y: 54, state: {} },
      { id: "e-display", name: "0.96 OLED", type: "display", variant: "oled-096", pin: "I2C", x: 460, y: 54, state: { text: "Hello" } },
      { id: "e-res", name: "Resistor", type: "resistor", pin: "220R", x: 462, y: 136, state: {} },
      { id: "e-led", name: "RGB LED", type: "led", variant: "led-rgb", pin: "GPIO2", x: 650, y: 140, state: { on: false } },
      { id: "e-btn", name: "Button", type: "button", pin: "GPIO0", x: 300, y: 260, state: { pressed: false } },
      { id: "e-motor", name: "Servo 9g", type: "motor", variant: "servo-9g", pin: "GPIO4/5", x: 620, y: 260, state: { speed: 0 } },
    ],
    wires: [
      { from: "e-esp32", to: "e-sensor" },
      { from: "e-esp32", to: "e-display" },
      { from: "e-esp32", to: "e-res" },
      { from: "e-res", to: "e-led" },
      { from: "e-btn", to: "e-esp32" },
      { from: "e-motor", to: "e-esp32" },
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
  const now = Date.now();
  const windowMs = 1000;
  const maxRunsPerWindow = 60;
  let recentRuns = [];

  try {
    const saved = JSON.parse(localStorage.getItem(runThrottleKey) || "[]");
    if (Array.isArray(saved)) {
      recentRuns = saved.filter((value) => Number.isFinite(value));
    }
  } catch {
    recentRuns = [];
  }

  recentRuns = recentRuns.filter((timestamp) => now - timestamp < windowMs);
  if (recentRuns.length >= maxRunsPerWindow) {
    localStorage.setItem(runThrottleKey, JSON.stringify(recentRuns));
    return false;
  }

  recentRuns.push(now);
  localStorage.setItem(runThrottleKey, JSON.stringify(recentRuns));
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
    const provider = Object.prototype.hasOwnProperty.call(aiProviderPresets, parsed.provider) ? parsed.provider : "huggingface";
    const preset = aiProviderPresets[provider];
    const rawEndpoint = String(parsed.endpoint || preset.endpoint || "").trim();
    const endpoint = /api-inference\.huggingface\.co\/models/i.test(rawEndpoint)
      ? "https://router.huggingface.co/hf-inference/models"
      : rawEndpoint;
    const legacyUnsupportedModels = new Set([
      "distilgpt2",
      "gpt2",
      "google/flan-t5-base",
      "microsoft/phi-2",
      "google/gemma-2b",
      "Qwen/Qwen2.5-1.5B-Instruct",
      "Qwen/Qwen2.5-7B-Instruct",
      "mistralai/Mistral-7B-Instruct-v0.3",
      "meta-llama/Llama-3.2-1B-Instruct",
      "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
      "katanemo/Arch-Router-1.5B",
      "Falconsai/text_summarization",
      "Helsinki-NLP/opus-mt-ja-en",
      "Helsinki-NLP/opus-mt-fr-en",
    ]);
    const nonChatFriendlyModels = new Set([
      "facebook/bart-large-cnn",
      "google-t5/t5-small",
      "google-t5/t5-base",
      "google/pegasus-xsum",
      "facebook/bart-large-xsum",
      "google/madlad400-3b-mt",
      "Falconsai/text_summarization",
    ]);
    const rawModel = String(parsed.model || preset.model || "").trim();
    const model = legacyUnsupportedModels.has(rawModel) || nonChatFriendlyModels.has(rawModel)
      ? "Qwen/Qwen2.5-Coder-32B-Instruct"
      : rawModel;
    const normalized = {
      provider,
      endpoint,
      model,
      apiKey: String(parsed.apiKey || "").trim(),
    };
    if (
      parsed.provider !== normalized.provider ||
      String(parsed.endpoint || "").trim() !== normalized.endpoint ||
      String(parsed.model || "").trim() !== normalized.model ||
      String(parsed.apiKey || "").trim() !== normalized.apiKey
    ) {
      localStorage.setItem(aiConfigKey, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    return { ...aiProviderPresets.huggingface };
  }
}

function setAiConfig(config) {
  localStorage.setItem(aiConfigKey, JSON.stringify(config));
}

function buildAiPrompt(task, params) {
  if (task === "chat") {
    const history = Array.isArray(params.history) ? params.history : [];
    const historyLines = history
      .filter((item) => item.role !== "assistant")
      .slice(-6)
      .map((item) => `${item.role === "assistant" ? "Assistant" : "User"}: ${String(item.text || "").trim()}`)
      .filter(Boolean);
    return [
      "Coding task. Answer directly.",
      "Return runnable code first, then short usage notes.",
      "Do not repeat instructions.",
      "Recent user messages:",
      ...historyLines,
      `Current user request: ${params.prompt}`,
      "Answer:",
    ].join("\n");
  }

  if (task === "idea") {
    return [
      "You are a practical coding mentor for beginners.",
      "Use very simple English with short sentences.",
      "Programming-first rule: include a tiny starter code snippet in every idea.",
      "Generate concrete project ideas with short steps.",
      "Keep answer concise and structured.",
      `User request: ${params.prompt}`,
    ].join("\n");
  }

  if (task === "coach") {
    return [
      "You are a senior code reviewer.",
      "Use very simple English with short sentences.",
      "Programming-first rule: improved code should be complete and runnable.",
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
    "Use very simple English with short sentences.",
    "Programming-first rule: include core code skeletons (API, data model, UI) before long explanation.",
    "Break request into phased implementation steps.",
    "Include MVP scope, data model, API/UI tasks, testing checklist.",
    `Request: ${params.prompt}`,
  ].join("\n");
}

function sanitizeAiChatReply(text) {
  const raw = String(text || "").replace(/\r\n/g, "\n").trim();
  if (!raw) {
    return raw;
  }

  const blockedLine = /^(Always use very simple English|Use short sentences and easy words|Keep answers clear and practical|Give code before long explanation|When asked to build something|If info is missing|If user asks to build code|Then add a short explanation|Do NOT repeat these instructions|Do not repeat system instructions|Do NOT start your answer|You are a practical coding assistant\.?$|You are a coding assistant\.?$|Answer the user's last request directly\.?$|Return runnable code first, then a short explanation\.?$|History:|Conversation history:|Assistant answer:?|User request:|return only the final coding answer|return just the final code answer|\[모델 자동 전환:)/i;
  const blockedPrefix = /^(Assistant:|AI:|System:)/i;

  const cleanedLines = raw
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return true;
      }
      if (blockedLine.test(trimmed)) {
        return false;
      }
      return true;
    })
    .map((line) => line.replace(blockedPrefix, "").trimStart());

  const cleaned = cleanedLines.join("\n").trim();
  if (cleaned) {
    const normalized = cleaned
      .replace(/^(Start with runnable code\.?\s*)/gi, "")
      .replace(/^(Return only the final coding answer\.?\s*)/gi, "")
      .replace(/^User request:\s*/gi, "")
      .replace(/Back to the page you came from\.?/gi, "")
      .replace(/Use the comments to help people with reading comprehension and vocabulary\.?/gi, "")
      .replace(/The comments section is open-ended, so please share your feedback\.?/gi, "")
      .trim();
    if (
      /^return only a final code answer/i.test(normalized) ||
      /return just the final code answer/i.test(normalized) ||
      /return a list of all the words/i.test(normalized)
    ) {
      return "";
    }
    return normalized;
  }

  const firstMeaningful = raw
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean);
  if (firstMeaningful && blockedLine.test(firstMeaningful)) {
    return "I could not generate a valid coding answer. Please ask again with the exact output format you want.";
  }

  // If filtering removed everything, return raw content instead of a fixed fallback sentence.
  const dePrefixed = raw
    .split("\n")
    .map((line) => line.replace(blockedPrefix, "").trimStart())
    .join("\n")
    .trim();
  return dePrefixed || raw;
}

function looksLikeInstructionEcho(text) {
  const value = String(text || "").trim();
  if (!value) {
    return false;
  }
  const instructionSignals = [
    "you are a",
    "do not repeat",
    "conversation history",
    "history:",
    "assistant answer",
    "coding task",
    "current user request",
    "return runnable code first",
  ];
  const lower = value.toLowerCase();
  const hitCount = instructionSignals.reduce((count, signal) => count + (lower.includes(signal) ? 1 : 0), 0);
  return hitCount >= 2;
}

function looksLikeCodeAnswer(text) {
  const value = String(text || "").trim();
  if (!value) {
    return false;
  }

  // Fenced code block is the strongest signal.
  if (value.includes("```")) {
    return true;
  }

  // Accept common code signatures even without fences.
  const codeSignals = [
    /<!doctype html>|<html[\s>]|<head[\s>]|<body[\s>]|<div[\s>]|<script[\s>]|<style[\s>]/i,
    /\bdef\s+\w+\s*(\(|:)|\bclass\s+\w+\s*[:{]|\bfrom\s+[A-Za-z_][\w.]*\s+import\b|\bimport\s+[A-Za-z_][\w.]*/,
    /\bfunction\s+\w+\s*\(|\bconst\s+\w+\s*=|\blet\s+\w+\s*=|\bvar\s+\w+\s*=/,
    /#include\s*<[^>]+>|\bint\s+main\s*\(/,
    /\bpublic\s+class\s+\w+|\busing\s+System\b/,
    /\bSELECT\b[\s\S]*\bFROM\b/i,
  ];
  return codeSignals.some((pattern) => pattern.test(value));
}

function normalizeIndentLanguageKey(language) {
  const key = String(language || "").toLowerCase().trim();
  const aliasMap = {
    js: "javascript",
    node: "javascript",
    ts: "typescript",
    "c++": "cpp",
    cxx: "cpp",
    cs: "csharp",
    "c#": "csharp",
    pwsh: "powershell",
    ps1: "powershell",
    sh: "bash",
    shell: "bash",
    zsh: "bash",
    yml: "yaml",
    md: "markdown",
  };
  return aliasMap[key] || key;
}

function autoIndentBraceStyleCode(rawCode) {
  let source = String(rawCode || "").replace(/\r\n/g, "\n");
  if ((source.match(/\n/g) || []).length <= 1) {
    source = source
      .replace(/\{/g, "{\n")
      .replace(/\}/g, "\n}\n")
      .replace(/;\s*/g, ";\n")
      .replace(/\n{2,}/g, "\n");
  }

  const lines = source.split("\n");
  const out = [];
  let indent = 0;

  for (const originalLine of lines) {
    const trimmed = originalLine.trim();
    if (!trimmed) {
      out.push("");
      continue;
    }

    if (/^[}\])]/.test(trimmed) || /^(case\b|default\b)/i.test(trimmed)) {
      indent = Math.max(0, indent - 1);
    }

    out.push(`${" ".repeat(indent * 2)}${trimmed}`);

    const openCount = (trimmed.match(/[\[{(]/g) || []).length;
    const closeCount = (trimmed.match(/[\]})]/g) || []).length;
    if (openCount > closeCount) {
      indent += openCount - closeCount;
    } else if (closeCount > openCount) {
      indent = Math.max(0, indent - (closeCount - openCount));
    }
  }

  return out.join("\n");
}

function autoIndentHtmlLikeCode(rawCode) {
  let source = String(rawCode || "").replace(/\r\n/g, "\n");
  if ((source.match(/\n/g) || []).length <= 1) {
    source = source.replace(/>\s*</g, ">\n<");
  }

  const lines = source.split("\n");
  const out = [];
  let indent = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      out.push("");
      continue;
    }

    if (/^<\//.test(trimmed)) {
      indent = Math.max(0, indent - 1);
    }

    out.push(`${" ".repeat(indent * 2)}${trimmed}`);

    const opens = /^<[^!/][^>]*[^/]>/i.test(trimmed);
    const closes = /<\//.test(trimmed);
    const selfClosing = /\/>$/.test(trimmed) || /^<!/.test(trimmed);
    if (opens && !closes && !selfClosing) {
      indent += 1;
    }
  }

  return out.join("\n");
}

function autoIndentKeywordBlockCode(rawCode, openKeywords, closeKeywords) {
  const lines = String(rawCode || "").replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let indent = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      out.push("");
      continue;
    }

    if (closeKeywords.some((kw) => new RegExp(`^${kw}\\b`, "i").test(trimmed))) {
      indent = Math.max(0, indent - 1);
    }

    out.push(`${" ".repeat(indent * 2)}${trimmed}`);

    if (openKeywords.some((kw) => new RegExp(`\\b${kw}\\b`, "i").test(trimmed))) {
      indent += 1;
    }
  }

  return out.join("\n");
}

function autoIndentSqlCode(rawCode) {
  const lines = String(rawCode || "")
    .replace(/\r\n/g, "\n")
    .replace(/\s+(FROM|WHERE|GROUP BY|ORDER BY|HAVING|LIMIT|UNION|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN)\b/gi, "\n$1")
    .split("\n");

  return autoIndentKeywordBlockCode(lines.join("\n"), ["BEGIN", "CASE"], ["END"]);
}

function autoIndentCodeForLanguage(language, rawCode) {
  const lang = normalizeIndentLanguageKey(language);
  const code = String(rawCode || "").replace(/\r\n/g, "\n").trimEnd();
  if (!code) {
    return code;
  }

  if (["html", "xml", "svg"].includes(lang)) {
    return autoIndentHtmlLikeCode(code);
  }
  if (lang === "sql") {
    return autoIndentSqlCode(code);
  }
  if (["ruby"].includes(lang)) {
    return autoIndentKeywordBlockCode(code, ["class", "module", "def", "if", "unless", "case", "while", "until", "for", "begin", "do"], ["end", "else", "elsif", "when", "rescue", "ensure"]);
  }
  if (["bash", "powershell", "fortran"].includes(lang)) {
    return autoIndentKeywordBlockCode(code, ["if", "for", "while", "case", "function", "do", "then", "begin", "program", "select"], ["fi", "done", "esac", "end", "endif", "enddo", "end program", "end select", "else", "elif"]);
  }
  if (["javascript", "typescript", "c", "cpp", "csharp", "java", "go", "rust", "zig", "arduino", "espidf", "json", "css"].includes(lang) || /asm/.test(lang)) {
    return autoIndentBraceStyleCode(code);
  }

  return code;
}

function looksLikeLowQualityAiReply(text) {
  const value = String(text || "").trim();
  if (!value) {
    return true;
  }

  const hasCode = looksLikeCodeAnswer(value);
  const lower = value.toLowerCase();
  const knownBadPatterns = [
    "i can help with code. please ask your coding task in one short sentence",
    "user request:",
    "coding task:",
    "output format:",
    "one-line run command",
    "no analysis, no meta text",
    "back to mail online",
    "back to the page you came from",
    "start with runnable code",
    "return only the final coding answer",
    "return just the final code answer",
    "return only a final code answer",
    "return a list of all the words",
    "return the answer that the user has chosen to return",
    "comments section is open-ended",
    "reading comprehension and vocabulary",
    "you are a practical coding assistant",
    "do not repeat",
    "current user request",
  ];
  if (knownBadPatterns.some((item) => lower.includes(item))) {
    return !hasCode;
  }
  if (lower.includes("user request:") && lower.includes("final code answer")) {
    return !hasCode;
  }
  return false;
}

function inferRequestedLanguageLabel(userPrompt) {
  const text = String(userPrompt || "").toLowerCase();
  if (/\bhtml\b|웹\s*페이지|web\s*page|website|web\s*site/.test(text)) return "HTML";
  if (/\bcss\b|stylesheet/.test(text)) return "CSS";
  if (/typescript|\bts\b/.test(text)) return "TypeScript";
  if (/javascript|\bjs\b|node/.test(text)) return "JavaScript";
  if (/python|\bpy\b/.test(text)) return "Python";
  if (/c\+\+|\bcpp\b/.test(text)) return "C++";
  if (/\bc#\b|csharp|\.net/.test(text)) return "C#";
  if (/\bjava\b/.test(text)) return "Java";
  if (/\bgo\b|golang/.test(text)) return "Go";
  if (/\brust\b/.test(text)) return "Rust";
  if (/\bfortran\b|f90|f95/.test(text)) return "Fortran";
  if (/\bzig\b/.test(text)) return "Zig";
  if (/\basm\b|assembly|assembler/.test(text)) return "ASM";
  if (/\bruby\b/.test(text)) return "Ruby";
  if (/\bsql\b|query|database/.test(text)) return "SQL";
  if (/\bbash\b|shell|sh\s*script/.test(text)) return "Bash";
  return "";
}

function enrichAmbiguousCodingRequest(userPrompt, languageLabel) {
  const request = String(userPrompt || "").trim();
  if (!request) {
    return request;
  }
  const tokenCount = request.split(/\s+/).filter(Boolean).length;
  if (tokenCount > 5) {
    return request;
  }

  if (languageLabel === "HTML") {
    return [
      request,
      "Create a minimal single-page website with inline CSS and JavaScript.",
      "Include a title, one paragraph, and a button that updates text when clicked.",
    ].join("\n");
  }

  if (languageLabel === "Python") {
    return [
      request,
      "Create a minimal runnable Python script with clear input/output.",
    ].join("\n");
  }

  return [request, "Create a minimal runnable example."] .join("\n");
}

async function requestAi(task, params) {
  const config = getAiConfig();
  const prompt = buildAiPrompt(task, params);
  const makePayload = (finalPrompt, overrideModel = "") => ({
    provider: config.provider,
    endpoint: config.endpoint,
    model: overrideModel || config.model,
    apiKey: config.apiKey,
    prompt: finalPrompt,
  });

  async function callProxy(finalPrompt, overrideModel = "") {
    let proxyResponse;
    try {
      proxyResponse = await fetch(defaultAiProxyEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(makePayload(finalPrompt, overrideModel)),
      });
    } catch (error) {
      throw new Error(
        "AI 프록시에 연결할 수 없습니다. local-server.js를 실행 중인지 확인하세요. (http://localhost:3000)"
      );
    }

    const proxyData = await proxyResponse.json().catch(() => ({}));
    if (!proxyResponse.ok) {
      const message = String(proxyData.message || "");
      if (/fetch failed|ECONNREFUSED|ENOTFOUND/i.test(message)) {
        throw new Error(
          `선택한 AI 제공자에 연결할 수 없습니다. endpoint 주소와 API key(또는 서버 환경변수 키)를 확인하세요.\n\n[디버그 원본]\n${message || "(메시지 없음)"}`
        );
      }
      throw new Error(message || `AI request failed (${proxyResponse.status})`);
    }
    return String(proxyData.output || "").trim();
  }

  let response;
  response = await callProxy(prompt);

  if (task === "chat") {
    const looksTruncatedCode = (value) => {
      const text = String(value || "").trim();
      if (!text) {
        return false;
      }

      const fenceCount = (text.match(/```/g) || []).length;
      if (fenceCount % 2 === 1) {
        return true;
      }

      if (!looksLikeCodeAnswer(text)) {
        return false;
      }

      if (/\.\.\.\s*$/.test(text)) {
        return true;
      }

      const tail = text.slice(-200);
      if (/[{[(]\s*$/.test(tail)) {
        return true;
      }

      return /\b(return|def|class|for|while|if|elif|else|try|except|finally)\b[^\n]*$/.test(text) && !/[\n\r]/.test(tail);
    };

    const isBadChatOutput = (value) => {
      const normalized = sanitizeAiChatReply(String(value || ""));
      return (
        looksLikeInstructionEcho(normalized) ||
        looksLikeLowQualityAiReply(normalized) ||
        !looksLikeCodeAnswer(normalized)
      );
    };

    if (isBadChatOutput(response)) {
      const userRequest = String(params.prompt || "").trim();
      const languageLabel = inferRequestedLanguageLabel(userRequest);
      const enrichedRequest = enrichAmbiguousCodingRequest(userRequest, languageLabel);
      const retryPrompts = [
        [
          "Write source code for this request:",
          enrichedRequest,
          languageLabel ? `Target language: ${languageLabel}` : "Target language: follow the user request",
          "Return one complete runnable file.",
          "Response must be code.",
        ].join("\n"),
        [
          "Create a minimal but working implementation for this request:",
          enrichedRequest,
          languageLabel === "HTML"
            ? "The code must include <!DOCTYPE html>, <html>, <head>, and <body>."
            : "Keep it practical and directly runnable.",
        ].join("\n"),
        [
          `Task: ${enrichedRequest}`,
          languageLabel ? `Language: ${languageLabel}` : "Language: follow request",
          "Return only one fenced code block.",
        ].join("\n"),
      ];

      const backupModel =
        config.provider === "huggingface" && config.model !== "Qwen/Qwen2.5-Coder-32B-Instruct"
          ? "Qwen/Qwen2.5-Coder-32B-Instruct"
          : "";

      for (const rescuePrompt of retryPrompts) {
        const retried = await callProxy(rescuePrompt);
        if (retried && !isBadChatOutput(retried)) {
          response = retried;
          break;
        }
        if (backupModel) {
          const retriedWithBackup = await callProxy(rescuePrompt, backupModel);
          if (retriedWithBackup && !isBadChatOutput(retriedWithBackup)) {
            response = retriedWithBackup;
            break;
          }
        }
      }

      if (isBadChatOutput(response)) {
        throw new Error("AI 응답 품질이 낮습니다. 모델을 변경하거나 프롬프트를 조금 더 구체적으로 입력해 주세요.");
      }
    }

    if (looksTruncatedCode(response)) {
      try {
        const continuationPrompt = [
          "Continue exactly from the last generated code.",
          "Do not restart from the beginning.",
          "Return only the missing remainder code.",
          "No explanation.",
          "Previous partial code:",
          response,
        ].join("\n");
        const continuation = await callProxy(continuationPrompt);
        if (continuation && !looksLikeInstructionEcho(continuation)) {
          response = `${response}\n${String(continuation).trim()}`.trim();
        }
      } catch {
        // Keep partial result when continuation fails.
      }
    }
  }

  return response;
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

async function executeRemote(runtime, code, stdinText = "") {
  const runtimeConfig = getRuntimeConfig();
  const headers = { "Content-Type": "application/json", ...runtimeConfig.headers };
  const response = await fetch(runtimeConfig.endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      language: runtime.language,
      version: runtime.version || "*",
      files: [{ content: code }],
      stdin: stdinText,
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
  const homeThemeSelect = document.getElementById("homeThemeSelect");
  const homeLocaleSelect = document.getElementById("homeLocaleSelect");
  const homeMemoInput = document.getElementById("homeMemoInput");
  const homeMemoSaveButton = document.getElementById("homeMemoSaveButton");
  const homeMemoClearButton = document.getElementById("homeMemoClearButton");
  const homeMemoStatus = document.getElementById("homeMemoStatus");
  const homeTodoInput = document.getElementById("homeTodoInput");
  const homeTodoAddButton = document.getElementById("homeTodoAddButton");
  const homeTodoList = document.getElementById("homeTodoList");
  const homeBrowserUrlInput = document.getElementById("homeBrowserUrlInput");
  const homeBrowserGoButton = document.getElementById("homeBrowserGoButton");
  const homeBrowserReloadButton = document.getElementById("homeBrowserReloadButton");
  const homeBrowserHomeButton = document.getElementById("homeBrowserHomeButton");
  const homeBrowserOpenExternalButton = document.getElementById("homeBrowserOpenExternalButton");
  const homeBrowserFrame = document.getElementById("homeBrowserFrame");
  const homeBrowserStatus = document.getElementById("homeBrowserStatus");
  const homeLoginUsername = document.getElementById("homeLoginUsername");
  const homeLoginPassword = document.getElementById("homeLoginPassword");
  const homeLoginSecondPassword = document.getElementById("homeLoginSecondPassword");
  const homeLoginButton = document.getElementById("homeLoginButton");
  const homeRegisterUsername = document.getElementById("homeRegisterUsername");
  const homeRegisterPassword = document.getElementById("homeRegisterPassword");
  const homeRegisterSecondPassword = document.getElementById("homeRegisterSecondPassword");
  const homeRegisterButton = document.getElementById("homeRegisterButton");
  const homeAuthStatus = document.getElementById("homeAuthStatus");
  const homeLogoutButton = document.getElementById("homeLogoutButton");

  document.querySelectorAll(".home-tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.homeTab;
      document.querySelectorAll(".home-tab-button").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      document.querySelectorAll(".home-tab-panel").forEach((panel) => {
        panel.classList.toggle("is-visible", panel.dataset.homePanel === tab);
      });
    });
  });

  if (homeThemeSelect) {
    homeThemeSelect.value = getCurrentTheme();
    homeThemeSelect.addEventListener("change", (event) => {
      applyTheme(event.target.value);
    });
  }

  if (homeLocaleSelect) {
    populateLocaleSelect(homeLocaleSelect);
    homeLocaleSelect.value = currentLocale;
    homeLocaleSelect.addEventListener("change", (event) => {
      currentLocale = event.target.value;
      localStorage.setItem(localeKey, currentLocale);
      location.reload();
    });
  }

  function updateHomeAuthStatus(message) {
    if (!homeAuthStatus) {
      return;
    }
    const currentUser = getCurrentUser();
    const suffix = currentUser ? `\n현재 로그인: @${currentUser}` : "\n현재 로그인 없음";
    homeAuthStatus.textContent = `${message}${suffix}`;
  }

  homeRegisterButton?.addEventListener("click", async () => {
    try {
      const username = await registerUserAccount(
        homeRegisterUsername?.value,
        homeRegisterPassword?.value,
        homeRegisterSecondPassword?.value
      );
      updateHomeAuthStatus(`계정 생성 완료: @${username}`);
    } catch (error) {
      updateHomeAuthStatus(`회원가입 실패: ${error.message}`);
    }
  });

  homeLoginButton?.addEventListener("click", async () => {
    try {
      const user = await loginUserAccount(
        homeLoginUsername?.value,
        homeLoginPassword?.value,
        homeLoginSecondPassword?.value
      );
      updateHomeAuthStatus(`로그인 성공: @${user.username}`);
      setTimeout(() => {
        location.href = "profile.html";
      }, 350);
    } catch (error) {
      updateHomeAuthStatus(error.message);
    }
  });

  homeLogoutButton?.addEventListener("click", () => {
    setCurrentUser(null);
    updateHomeAuthStatus("로그아웃 완료");
  });

  if (homeAuthStatus) {
    updateHomeAuthStatus("홈 탭에서 로그인/회원가입을 바로 사용할 수 있습니다.");
  }

  function updateMemoStatus(text) {
    if (homeMemoStatus) {
      homeMemoStatus.textContent = text;
    }
  }

  function updateHomeBrowserStatus(text) {
    if (homeBrowserStatus) {
      homeBrowserStatus.textContent = text;
    }
  }

  function normalizeHomeBrowserUrl(value) {
    const raw = String(value || "").trim();
    if (!raw) {
      return "";
    }
    if (/^(https?:\/\/|file:\/\/)/i.test(raw)) {
      return raw;
    }
    if (/^localhost[:/]/i.test(raw) || /^127\.0\.0\.1[:/]/.test(raw)) {
      return `http://${raw}`;
    }
    return `https://${raw}`;
  }

  function navigateHomeBrowser(url) {
    if (!homeBrowserFrame) {
      return;
    }
    const normalized = normalizeHomeBrowserUrl(url);
    if (!normalized) {
      updateHomeBrowserStatus("주소를 입력해 주세요.");
      return;
    }
    homeBrowserFrame.src = normalized;
    if (homeBrowserUrlInput) {
      homeBrowserUrlInput.value = normalized;
    }
    localStorage.setItem(homeBrowserUrlKey, normalized);
    updateHomeBrowserStatus(`이동 중: ${normalized}`);
  }

  function loadMemo() {
    if (!homeMemoInput) {
      return;
    }
    const savedMemo = String(localStorage.getItem(homeMemoKey) || "");
    homeMemoInput.value = savedMemo;
    if (savedMemo.trim()) {
      updateMemoStatus(`최근 저장: ${formatTimestamp(Date.now())}`);
    } else {
      updateMemoStatus("아직 저장된 메모가 없습니다.");
    }
  }

  homeMemoSaveButton?.addEventListener("click", () => {
    const value = String(homeMemoInput?.value || "");
    localStorage.setItem(homeMemoKey, value);
    updateMemoStatus(`메모 저장 완료 (${formatTimestamp(Date.now())})`);
  });

  homeMemoClearButton?.addEventListener("click", () => {
    if (homeMemoInput) {
      homeMemoInput.value = "";
    }
    localStorage.removeItem(homeMemoKey);
    updateMemoStatus("메모를 비웠습니다.");
  });

  function getTodos() {
    try {
      const parsed = JSON.parse(localStorage.getItem(homeTodoKey) || "[]");
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed
        .filter((item) => item && typeof item.text === "string")
        .map((item) => ({
          id: Number(item.id || Date.now()),
          text: String(item.text || "").slice(0, 200),
          done: Boolean(item.done),
        }));
    } catch {
      return [];
    }
  }

  function saveTodos(items) {
    localStorage.setItem(homeTodoKey, JSON.stringify(items));
  }

  function renderTodos() {
    if (!homeTodoList) {
      return;
    }
    const todos = getTodos();
    if (!todos.length) {
      homeTodoList.innerHTML = "<li class=\"home-todo-item\"><span class=\"home-todo-text\">아직 할 일이 없습니다. 한 줄 추가해 보세요.</span></li>";
      return;
    }

    homeTodoList.innerHTML = todos
      .map((todo) => {
        const safeText = escapeHtml(todo.text);
        const doneClass = todo.done ? " is-done" : "";
        const checked = todo.done ? " checked" : "";
        return `<li class=\"home-todo-item${doneClass}\" data-todo-id=\"${todo.id}\"><input class=\"home-todo-check\" type=\"checkbox\"${checked} /><span class=\"home-todo-text\">${safeText}</span><button class=\"home-todo-remove\" type=\"button\">삭제</button></li>`;
      })
      .join("");
  }

  homeTodoAddButton?.addEventListener("click", () => {
    const text = String(homeTodoInput?.value || "").trim();
    if (!text) {
      return;
    }
    const todos = getTodos();
    todos.unshift({ id: Date.now(), text, done: false });
    saveTodos(todos.slice(0, 50));
    if (homeTodoInput) {
      homeTodoInput.value = "";
    }
    renderTodos();
  });

  homeTodoInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      homeTodoAddButton?.click();
    }
  });

  homeTodoList?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const item = target.closest(".home-todo-item");
    if (!item) {
      return;
    }
    const todoId = Number(item.getAttribute("data-todo-id") || 0);
    if (!todoId) {
      return;
    }
    const todos = getTodos();
    const index = todos.findIndex((todo) => todo.id === todoId);
    if (index < 0) {
      return;
    }

    if (target.classList.contains("home-todo-remove")) {
      todos.splice(index, 1);
      saveTodos(todos);
      renderTodos();
      return;
    }

    if (target.classList.contains("home-todo-check")) {
      todos[index].done = Boolean(target.checked);
      saveTodos(todos);
      renderTodos();
    }
  });

  loadMemo();
  renderTodos();

  const defaultHomeBrowserUrl = "https://developer.mozilla.org";
  const storedBrowserUrl = String(localStorage.getItem(homeBrowserUrlKey) || "").trim();
  if (homeBrowserFrame && homeBrowserUrlInput) {
    const startUrl = normalizeHomeBrowserUrl(storedBrowserUrl || defaultHomeBrowserUrl);
    homeBrowserUrlInput.value = startUrl;
    navigateHomeBrowser(startUrl);

    homeBrowserFrame.addEventListener("load", () => {
      const currentUrl = homeBrowserFrame.src || homeBrowserUrlInput.value;
      if (currentUrl) {
        localStorage.setItem(homeBrowserUrlKey, currentUrl);
      }
      updateHomeBrowserStatus(`열림: ${currentUrl}`);
    });

    homeBrowserFrame.addEventListener("error", () => {
      updateHomeBrowserStatus("페이지를 불러오지 못했습니다. URL을 확인해 주세요.");
    });
  }

  homeBrowserGoButton?.addEventListener("click", () => {
    navigateHomeBrowser(homeBrowserUrlInput?.value || "");
  });

  homeBrowserUrlInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigateHomeBrowser(homeBrowserUrlInput.value);
    }
  });

  homeBrowserReloadButton?.addEventListener("click", () => {
    if (!homeBrowserFrame) {
      return;
    }
    if (homeBrowserFrame.src) {
      homeBrowserFrame.src = homeBrowserFrame.src;
      updateHomeBrowserStatus("새로고침 중...");
      return;
    }
    navigateHomeBrowser(homeBrowserUrlInput?.value || "");
  });

  homeBrowserHomeButton?.addEventListener("click", () => {
    navigateHomeBrowser(defaultHomeBrowserUrl);
  });

  homeBrowserOpenExternalButton?.addEventListener("click", () => {
    const targetUrl = normalizeHomeBrowserUrl(homeBrowserUrlInput?.value || homeBrowserFrame?.src || "");
    if (!targetUrl) {
      updateHomeBrowserStatus("새 탭으로 열 URL이 없습니다.");
      return;
    }
    window.open(targetUrl, "_blank", "noopener,noreferrer");
    updateHomeBrowserStatus(`새 탭에서 열기: ${targetUrl}`);
  });

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

function initExamplesPage() {
  const languageSelect = document.getElementById("examplesLanguageSelect");
  const categorySelect = document.getElementById("examplesCategorySelect");
  const title = document.getElementById("examplesTitle");
  const code = document.getElementById("examplesCode");
  const openButton = document.getElementById("examplesOpenInEditorButton");
  const status = document.getElementById("examplesStatus");

  if (!languageSelect || !categorySelect || !title || !code || !openButton || !status) {
    return;
  }

  populateLanguageSelect(languageSelect);
  
  const categories = [
    { value: "basic", label: "① Basic (Hello + 1+1)" },
    { value: "io", label: "② Input/Output" },
    { value: "if-else", label: "③ Condition (If/Else)" },
    { value: "loop", label: "④ Loop (For/While)" },
    { value: "function", label: "⑤ Function" },
    { value: "array", label: "⑥ Array/List" },
    { value: "object", label: "⑦ Object/Dictionary" },
    { value: "string", label: "⑧ String Processing" },
    { value: "math", label: "⑨ Math Operations" },
    { value: "datetime", label: "⑩ Date/Time" },
    { value: "file-io", label: "⑪ File I/O" },
    { value: "exception", label: "⑫ Exception Handling" },
    { value: "regex", label: "⑬ Regular Expression" },
    { value: "lambda", label: "⑭ Lambda/Anonymous" },
    { value: "recursion", label: "⑮ Recursion" },
    { value: "sorting", label: "⑯ Sorting Algorithm" },
    { value: "search", label: "⑰ Search Algorithm" },
    { value: "class", label: "⑱ Class/OOP" },
    { value: "inheritance", label: "⑲ Inheritance" },
    { value: "json", label: "⑳ JSON Processing" },
    { value: "api", label: "㉑ API/HTTP Call" },
    { value: "async", label: "㉒ Async/Callback" },
    { value: "map-filter", label: "㉓ Map/Filter/Reduce" },
    { value: "slice-concat", label: "㉔ Slice/Concatenate" },
    { value: "tuple", label: "㉕ Tuple/Multiple Return" },
    { value: "set", label: "㉖ Set/Unique Values" },
    { value: "dict-iteration", label: "㉗ Dict/Map Iteration" },
    { value: "type-casting", label: "㉘ Type Casting" },
    { value: "validation", label: "㉙ Input Validation" },
    { value: "binary", label: "㉚ Binary/Bitwise" },
  ];

  categorySelect.innerHTML = categories
    .map((item) => `<option value="${item.value}">${item.label}</option>`)
    .join("");

  function buildExample(languageKey, category) {
    const sample = languageSamples[languageKey];
    if (!sample) {
      return { title: "Unknown", code: "// Unsupported language" };
    }

    const examples = {
      basic: {
        javascript: { title: "JavaScript Basic", code: "console.log('Hello from JavaScript');\nconsole.log(1 + 1);" },
        python: { title: "Python Basic", code: "print('Hello from Python')\nprint(1 + 1)" },
        java: { title: "Java Basic", code: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello from Java\");\n    System.out.println(1 + 1);\n  }\n}" },
        cpp: { title: "C++ Basic", code: "#include <iostream>\nint main() {\n  std::cout << \"Hello from C++\\n\";\n  std::cout << (1 + 1) << \"\\n\";\n  return 0;\n}" },
        csharp: { title: "C# Basic", code: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Hello from C#\");\n    Console.WriteLine(1 + 1);\n  }\n}" },
      },
      io: {
        javascript: { title: "JavaScript I/O", code: "const readline = require('readline');\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\nrl.question('Your name: ', (name) => {\n  console.log(`Hello, ${name}!`);\n  rl.close();\n});" },
        python: { title: "Python I/O", code: "name = input('Your name: ')\nage = int(input('Your age: '))\nprint(f'Hello {name}, you are {age} years old')" },
        java: { title: "Java I/O", code: "import java.util.Scanner;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    System.out.print(\"Your name: \");\n    String name = sc.nextLine();\n    System.out.println(\"Hello, \" + name + \"!\");\n  }\n}" },
        cpp: { title: "C++ I/O", code: "#include <iostream>\n#include <string>\nint main() {\n  std::string name;\n  std::cout << \"Your name: \";\n  std::getline(std::cin, name);\n  std::cout << \"Hello, \" << name << \"!\\n\";\n  return 0;\n}" },
        csharp: { title: "C# I/O", code: "using System;\nclass Program {\n  static void Main() {\n    Console.Write(\"Your name: \");\n    string name = Console.ReadLine();\n    Console.WriteLine($\"Hello, {name}!\");\n  }\n}" },
      },
      "if-else": {
        javascript: { title: "JavaScript Condition", code: "const age = 20;\nif (age >= 18) {\n  console.log('Adult');\n} else if (age >= 13) {\n  console.log('Teen');\n} else {\n  console.log('Child');\n}" },
        python: { title: "Python Condition", code: "age = 20\nif age >= 18:\n    print('Adult')\nelif age >= 13:\n    print('Teen')\nelse:\n    print('Child')" },
        java: { title: "Java Condition", code: "int age = 20;\nif (age >= 18) {\n  System.out.println(\"Adult\");\n} else if (age >= 13) {\n  System.out.println(\"Teen\");\n} else {\n  System.out.println(\"Child\");\n}" },
        cpp: { title: "C++ Condition", code: "#include <iostream>\nint main() {\n  int age = 20;\n  if (age >= 18) std::cout << \"Adult\\n\";\n  else if (age >= 13) std::cout << \"Teen\\n\";\n  else std::cout << \"Child\\n\";\n  return 0;\n}" },
        csharp: { title: "C# Condition", code: "int age = 20;\nif (age >= 18) Console.WriteLine(\"Adult\");\nelse if (age >= 13) Console.WriteLine(\"Teen\");\nelse Console.WriteLine(\"Child\");" },
      },
      loop: {
        javascript: { title: "JavaScript Loop", code: "// for loop\nfor (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n\n// while loop\nlet count = 1;\nwhile (count <= 3) {\n  console.log(count);\n  count++;\n}" },
        python: { title: "Python Loop", code: "# for loop\nfor i in range(1, 6):\n    print(i)\n\n# while loop\ncount = 1\nwhile count <= 3:\n    print(count)\n    count += 1" },
        java: { title: "Java Loop", code: "// for loop\nfor (int i = 1; i <= 5; i++) {\n  System.out.println(i);\n}\n\n// while loop\nint count = 1;\nwhile (count <= 3) {\n  System.out.println(count);\n  count++;\n}" },
        cpp: { title: "C++ Loop", code: "#include <iostream>\nint main() {\n  for (int i = 1; i <= 5; i++) std::cout << i << \"\\n\";\n  int count = 1;\n  while (count <= 3) { std::cout << count++ << \"\\n\"; }\n  return 0;\n}" },
        csharp: { title: "C# Loop", code: "// for loop\nfor (int i = 1; i <= 5; i++) {\n  Console.WriteLine(i);\n}\n\n// while loop\nint count = 1;\nwhile (count <= 3) {\n  Console.WriteLine(count++);\n}" },
      },
      function: {
        javascript: { title: "JavaScript Function", code: "function add(a, b) {\n  return a + b;\n}\n\nconst multiply = (x, y) => x * y;\n\nconsole.log(add(2, 3));\nconsole.log(multiply(4, 5));" },
        python: { title: "Python Function", code: "def add(a, b):\n    return a + b\n\ndef greet(name):\n    print(f'Hello, {name}!')\n\nprint(add(2, 3))\ngreet('Alice')" },
        java: { title: "Java Function", code: "public class Main {\n  static int add(int a, int b) {\n    return a + b;\n  }\n  \n  public static void main(String[] args) {\n    System.out.println(add(2, 3));\n  }\n}" },
        cpp: { title: "C++ Function", code: "#include <iostream>\nint add(int a, int b) {\n  return a + b;\n}\n\nint main() {\n  std::cout << add(2, 3) << \"\\n\";\n  return 0;\n}" },
        csharp: { title: "C# Function", code: "static int Add(int a, int b) => a + b;\n\nstatic void Greet(string name) =>\n    Console.WriteLine($\"Hello, {name}!\");\n\nConsole.WriteLine(Add(2, 3));\nGreet(\"Bob\");" },
      },
      array: {
        javascript: { title: "JavaScript Array", code: "const arr = [1, 2, 3, 4, 5];\nconsole.log(arr[0]);\nconsole.log(arr.length);\n\narr.push(6);\narr.forEach(x => console.log(x));" },
        python: { title: "Python List", code: "arr = [1, 2, 3, 4, 5]\nprint(arr[0])\nprint(len(arr))\n\narr.append(6)\nfor x in arr:\n    print(x)" },
        java: { title: "Java Array", code: "int[] arr = {1, 2, 3, 4, 5};\nSystem.out.println(arr[0]);\nSystem.out.println(arr.length);\n\nfor (int x : arr) {\n  System.out.println(x);\n}" },
        cpp: { title: "C++ Vector", code: "#include <iostream>\n#include <vector>\nint main() {\n  std::vector<int> arr = {1, 2, 3, 4, 5};\n  std::cout << arr[0] << \"\\n\";\n  std::cout << arr.size() << \"\\n\";\n  return 0;\n}" },
        csharp: { title: "C# Array", code: "int[] arr = {1, 2, 3, 4, 5};\nConsole.WriteLine(arr[0]);\nConsole.WriteLine(arr.Length);\n\nforeach (int x in arr) {\n    Console.WriteLine(x);\n}" },
      },
      object: {
        javascript: { title: "JavaScript Object", code: "const person = {\n  name: 'Alice',\n  age: 25,\n  city: 'Seoul'\n};\n\nconsole.log(person.name);\nconsole.log(person['age']);\nperson.email = 'alice@example.com';" },
        python: { title: "Python Dictionary", code: "person = {\n    'name': 'Alice',\n    'age': 25,\n    'city': 'Seoul'\n}\n\nprint(person['name'])\nprint(person.get('age'))\nperson['email'] = 'alice@example.com'" },
        java: { title: "Java HashMap", code: "import java.util.HashMap;\nHashMap<String, Object> person = new HashMap<>();\nperson.put(\"name\", \"Alice\");\nperson.put(\"age\", 25);\n\nSystem.out.println(person.get(\"name\"));" },
        cpp: { title: "C++ Map", code: "#include <iostream>\n#include <map>\nint main() {\n  std::map<std::string, int> person;\n  person[\"age\"] = 25;\n  std::cout << person[\"age\"] << \"\\n\";\n  return 0;\n}" },
        csharp: { title: "C# Dictionary", code: "var person = new Dictionary<string, object>\n{\n    { \"name\", \"Alice\" },\n    { \"age\", 25 }\n};\n\nConsole.WriteLine(person[\"name\"]);" },
      },
      string: {
        javascript: { title: "JavaScript String", code: "const str = 'Hello, World!';\nconsole.log(str.length);\nconsole.log(str.toUpperCase());\nconsole.log(str.substring(0, 5));\n\nconst name = 'Alice';\nconst msg = `Hello, ${name}!`;" },
        python: { title: "Python String", code: "str = 'Hello, World!'\nprint(len(str))\nprint(str.upper())\nprint(str[0:5])\nprint(str.split(','))\nprint(str.replace('World', 'Python'))" },
        java: { title: "Java String", code: "String str = \"Hello, World!\";\nSystem.out.println(str.length());\nSystem.out.println(str.toUpperCase());\nSystem.out.println(str.substring(0, 5));\nSystem.out.println(str.contains(\"World\"));" },
        cpp: { title: "C++ String", code: "#include <iostream>\n#include <string>\nint main() {\n  std::string str = \"Hello, World!\";\n  std::cout << str.length() << \"\\n\";\n  std::cout << str.substr(0, 5) << \"\\n\";\n  return 0;\n}" },
        csharp: { title: "C# String", code: "string str = \"Hello, World!\";\nConsole.WriteLine(str.Length);\nConsole.WriteLine(str.ToUpper());\nConsole.WriteLine(str.Substring(0, 5));\nConsole.WriteLine(str.Contains(\"World\"));" },
      },
      math: {
        javascript: { title: "JavaScript Math", code: "console.log(Math.abs(-5));\nconsole.log(Math.pow(2, 3));\nconsole.log(Math.sqrt(16));\nconsole.log(Math.max(1, 5, 3));\nconsole.log(Math.random());" },
        python: { title: "Python Math", code: "import math\nprint(abs(-5))\nprint(pow(2, 3))\nprint(math.sqrt(16))\nprint(max(1, 5, 3))\nprint(round(3.7))\nprint(math.pi)" },
        java: { title: "Java Math", code: "System.out.println(Math.abs(-5));\nSystem.out.println(Math.pow(2, 3));\nSystem.out.println(Math.sqrt(16));\nSystem.out.println(Math.max(1, 5));\nSystem.out.println(Math.PI);" },
        cpp: { title: "C++ Math", code: "#include <iostream>\n#include <cmath>\nint main() {\n  std::cout << abs(-5) << \"\\n\";\n  std::cout << pow(2, 3) << \"\\n\";\n  std::cout << sqrt(16) << \"\\n\";\n  return 0;\n}" },
        csharp: { title: "C# Math", code: "Console.WriteLine(Math.Abs(-5));\nConsole.WriteLine(Math.Pow(2, 3));\nConsole.WriteLine(Math.Sqrt(16));\nConsole.WriteLine(Math.Max(1, 5));\nConsole.WriteLine(Math.PI);" },
      },
      datetime: {
        javascript: { title: "JavaScript Date", code: "const now = new Date();\nconsole.log(now);\nconsole.log(now.getFullYear());\nconsole.log(now.getMonth());\nconsole.log(now.getDate());" },
        python: { title: "Python DateTime", code: "from datetime import datetime, timedelta\nnow = datetime.now()\nprint(now)\nprint(now.year, now.month, now.day)\nprint(now.strftime('%Y-%m-%d'))" },
        java: { title: "Java DateTime", code: "import java.time.LocalDateTime;\nLocalDateTime now = LocalDateTime.now();\nSystem.out.println(now);\nSystem.out.println(now.getYear());\nSystem.out.println(now.getMonth());" },
        cpp: { title: "C++ DateTime", code: "#include <iostream>\n#include <ctime>\nint main() {\n  time_t now = time(0);\n  std::cout << now << \"\\n\";\n  return 0;\n}" },
        csharp: { title: "C# DateTime", code: "DateTime now = DateTime.Now;\nConsole.WriteLine(now);\nConsole.WriteLine(now.Year);\nConsole.WriteLine(now.Month);" },
      },
      "file-io": {
        javascript: { title: "JavaScript File I/O", code: "const fs = require('fs');\n\n// Read file\nconst data = fs.readFileSync('file.txt', 'utf-8');\nconsole.log(data);\n\n// Write file\nfs.writeFileSync('output.txt', 'Hello!');" },
        python: { title: "Python File I/O", code: "# Read file\nwith open('file.txt', 'r') as f:\n    data = f.read()\n    print(data)\n\n# Write file\nwith open('output.txt', 'w') as f:\n    f.write('Hello!')" },
        java: { title: "Java File I/O", code: "import java.io.*;\n\n// Read file\nScanner sc = new Scanner(new File(\"file.txt\"));\nwhile (sc.hasNextLine()) {\n  System.out.println(sc.nextLine());\n}" },
        cpp: { title: "C++ File I/O", code: "#include <iostream>\n#include <fstream>\nint main() {\n  std::ofstream out(\"output.txt\");\n  out << \"Hello!\";\n  out.close();\n  return 0;\n}" },
        csharp: { title: "C# File I/O", code: "using System.IO;\n\n// Read file\nstring[] lines = File.ReadAllLines(\"file.txt\");\n\n// Write file\nFile.WriteAllText(\"output.txt\", \"Hello!\");" },
      },
      exception: {
        javascript: { title: "JavaScript Try-Catch", code: "try {\n  throw new Error('Something went wrong');\n} catch (error) {\n  console.error(error.message);\n} finally {\n  console.log('Done');\n}" },
        python: { title: "Python Exception", code: "try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')\nfinally:\n    print('Done')" },
        java: { title: "Java Exception", code: "try {\n  int x = 10 / 0;\n} catch (ArithmeticException e) {\n  System.out.println(\"Error: \" + e.getMessage());\n} finally {\n  System.out.println(\"Done\");\n}" },
        cpp: { title: "C++ Exception", code: "#include <iostream>\nint main() {\n  try {\n    throw std::runtime_error(\"Error!\");\n  } catch (std::exception& e) {\n    std::cout << e.what() << \"\\n\";\n  }\n  return 0;\n}" },
        csharp: { title: "C# Exception", code: "try {\n    throw new Exception(\"Error!\");\n} catch (Exception ex) {\n    Console.WriteLine(ex.Message);\n} finally {\n    Console.WriteLine(\"Done\");\n}" },
      },
      regex: {
        javascript: { title: "JavaScript Regex", code: "const pattern = /hello/i;\nconst str = 'Hello, World!';\n\nif (pattern.test(str)) {\n  console.log('Match found');\n}\n\nconst result = str.match(/\\w+/g);\nconsole.log(result);" },
        python: { title: "Python Regex", code: "import re\n\npattern = r'hello'\nstr = 'Hello, World!'\n\nif re.search(pattern, str, re.IGNORECASE):\n    print('Match found')\n\nresult = re.findall(r'\\w+', str)\nprint(result)" },
        java: { title: "Java Regex", code: "import java.util.regex.*;\n\nPattern pattern = Pattern.compile(\"hello\", Pattern.CASE_INSENSITIVE);\nMatcher matcher = pattern.matcher(\"Hello, World!\");\n\nif (matcher.find()) {\n  System.out.println(\"Match found\");\n}" },
        cpp: { title: "C++ Regex", code: "#include <iostream>\n#include <regex>\nint main() {\n  std::string str = \"Hello, World!\";\n  std::regex pattern(\"hello\");\n  if (std::regex_search(str, pattern)) {\n    std::cout << \"Match found\\n\";\n  }\n  return 0;\n}" },
        csharp: { title: "C# Regex", code: "using System.Text.RegularExpressions;\n\nstring str = \"Hello, World!\";\nif (Regex.IsMatch(str, \"hello\", RegexOptions.IgnoreCase)) {\n    Console.WriteLine(\"Match found\");\n}" },
      },
      lambda: {
        javascript: { title: "JavaScript Arrow Function", code: "const add = (a, b) => a + b;\nconst square = x => x * x;\nconst greet = () => 'Hello';\n\nconsole.log(add(2, 3));\nconsole.log(square(5));" },
        python: { title: "Python Lambda", code: "add = lambda a, b: a + b\nsquare = lambda x: x ** 2\n\nprint(add(2, 3))\nprint(square(5))\n\nnums = [1, 2, 3, 4, 5]\nresult = list(map(lambda x: x ** 2, nums))\nprint(result)" },
        java: { title: "Java Lambda", code: "// Java 8+\nList<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);\nnums.forEach(n -> System.out.println(n * 2));\n\nFunction<Integer, Integer> square = x -> x * x;\nSystem.out.println(square.apply(5));" },
        cpp: { title: "C++ Lambda", code: "#include <iostream>\n#include <vector>\nint main() {\n  auto add = [](int a, int b) { return a + b; };\n  std::cout << add(2, 3) << \"\\n\";\n  return 0;\n}" },
        csharp: { title: "C# Lambda", code: "Func<int, int, int> add = (a, b) => a + b;\nFunc<int, int> square = x => x * x;\n\nConsole.WriteLine(add(2, 3));\nConsole.WriteLine(square(5));" },
      },
      recursion: {
        javascript: { title: "JavaScript Recursion", code: "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nfunction fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}\n\nconsole.log(factorial(5));\nconsole.log(fib(6));" },
        python: { title: "Python Recursion", code: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(factorial(5))\nprint(fib(6))" },
        java: { title: "Java Recursion", code: "static int factorial(int n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nstatic int fib(int n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}" },
        cpp: { title: "C++ Recursion", code: "int factorial(int n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nint fib(int n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}" },
        csharp: { title: "C# Recursion", code: "static int Factorial(int n) =>\n    n <= 1 ? 1 : n * Factorial(n - 1);\n\nstatic int Fib(int n) =>\n    n <= 1 ? n : Fib(n - 1) + Fib(n - 2);" },
      },
      sorting: {
        javascript: { title: "JavaScript Sorting", code: "const arr = [5, 2, 8, 1, 9];\n\n// Ascending\narr.sort((a, b) => a - b);\nconsole.log(arr);\n\n// Descending\narr.sort((a, b) => b - a);\nconsole.log(arr);" },
        python: { title: "Python Sorting", code: "arr = [5, 2, 8, 1, 9]\n\n# Ascending\narr.sort()\nprint(arr)\n\n# Descending\narr.sort(reverse=True)\nprint(arr)\n\n# Sorted (new list)\narr2 = sorted([5, 2, 8], reverse=True)\nprint(arr2)" },
        java: { title: "Java Sorting", code: "import java.util.Arrays;\nint[] arr = {5, 2, 8, 1, 9};\nArrays.sort(arr);\nSystem.out.println(Arrays.toString(arr));" },
        cpp: { title: "C++ Sorting", code: "#include <iostream>\n#include <algorithm>\nint main() {\n  int arr[] = {5, 2, 8, 1, 9};\n  std::sort(arr, arr + 5);\n  return 0;\n}" },
        csharp: { title: "C# Sorting", code: "int[] arr = {5, 2, 8, 1, 9};\nArray.Sort(arr);\nforeach (int x in arr) Console.WriteLine(x);" },
      },
      search: {
        javascript: { title: "JavaScript Search", code: "const arr = [1, 2, 3, 4, 5];\n\n// Linear search\nconst target = 3;\nconst found = arr.indexOf(target);\nconsole.log(found);\n\n// Binary search (sorted)\nconst index = arr.findIndex(x => x === 4);\nconsole.log(index);" },
        python: { title: "Python Search", code: "arr = [1, 2, 3, 4, 5]\ntarget = 3\n\n# Linear search\nif target in arr:\n    print(arr.index(target))\n\n# List comprehension search\nresult = [i for i, x in enumerate(arr) if x == 4]\nprint(result)" },
        java: { title: "Java Search", code: "int[] arr = {1, 2, 3, 4, 5};\nint target = 3;\n\n// Linear search\nfor (int i = 0; i < arr.length; i++) {\n  if (arr[i] == target) {\n    System.out.println(i);\n  }\n}" },
        cpp: { title: "C++ Search", code: "#include <iostream>\n#include <algorithm>\nint main() {\n  int arr[] = {1, 2, 3, 4, 5};\n  int* found = std::find(arr, arr + 5, 3);\n  if (found != arr + 5) {\n    std::cout << \"Found at \" << (found - arr) << \"\\n\";\n  }\n  return 0;\n}" },
        csharp: { title: "C# Search", code: "int[] arr = {1, 2, 3, 4, 5};\nint target = 3;\n\nint index = System.Array.IndexOf(arr, target);\nConsole.WriteLine(index);" },
      },
      class: {
        javascript: { title: "JavaScript Class", code: "class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n\n  greet() {\n    return `Hello, I'm ${this.name}`;\n  }\n}\n\nconst p = new Person('Alice', 25);\nconsole.log(p.greet());" },
        python: { title: "Python Class", code: "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f\"Hello, I'm {self.name}\"\n\np = Person('Alice', 25)\nprint(p.greet())" },
        java: { title: "Java Class", code: "class Person {\n  private String name;\n  private int age;\n  \n  Person(String name, int age) {\n    this.name = name;\n    this.age = age;\n  }\n  \n  void greet() {\n    System.out.println(\"Hello, I'm \" + name);\n  }\n}\n\nPerson p = new Person(\"Alice\", 25);\np.greet();" },
        cpp: { title: "C++ Class", code: "#include <iostream>\n#include <string>\nclass Person {\npublic:\n  std::string name;\n  int age;\n  \n  Person(std::string n, int a) : name(n), age(a) {}\n  \n  void greet() {\n    std::cout << \"Hello, I'm \" << name << \"\\n\";\n  }\n};" },
        csharp: { title: "C# Class", code: "class Person {\n    public string Name { get; set; }\n    public int Age { get; set; }\n    \n    public Person(string name, int age) {\n        Name = name;\n        Age = age;\n    }\n    \n    public void Greet() => Console.WriteLine($\"Hello, I'm {Name}\");\n}" },
      },
      inheritance: {
        javascript: { title: "JavaScript Inheritance", code: "class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  \n  speak() {\n    console.log(`${this.name} makes a sound`);\n  }\n}\n\nclass Dog extends Animal {\n  speak() {\n    console.log(`${this.name} barks`);\n  }\n}\n\nconst dog = new Dog('Rex');\ndog.speak();" },
        python: { title: "Python Inheritance", code: "class Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        print(f'{self.name} makes a sound')\n\nclass Dog(Animal):\n    def speak(self):\n        print(f'{self.name} barks')\n\ndog = Dog('Rex')\ndog.speak()" },
        java: { title: "Java Inheritance", code: "class Animal {\n  String name;\n  Animal(String name) { this.name = name; }\n  \n  void speak() {\n    System.out.println(name + \" makes a sound\");\n  }\n}\n\nclass Dog extends Animal {\n  Dog(String name) { super(name); }\n  \n  void speak() {\n    System.out.println(name + \" barks\");\n  }\n}" },
        cpp: { title: "C++ Inheritance", code: "#include <iostream>\nclass Animal {\nprotected:\n  std::string name;\npublic:\n  Animal(std::string n) : name(n) {}\n  virtual void speak() {\n    std::cout << name << \" makes a sound\\n\";\n  }\n};\n\nclass Dog : public Animal {\npublic:\n  Dog(std::string n) : Animal(n) {}\n  void speak() override {\n    std::cout << name << \" barks\\n\";\n  }\n};" },
        csharp: { title: "C# Inheritance", code: "class Animal {\n    public string Name { get; set; }\n    public Animal(string name) => Name = name;\n    \n    public virtual void Speak() =>\n        Console.WriteLine($\"{Name} makes a sound\");\n}\n\nclass Dog : Animal {\n    public Dog(string name) : base(name) {}\n    \n    public override void Speak() =>\n        Console.WriteLine($\"{Name} barks\");\n}" },
      },
      json: {
        javascript: { title: "JavaScript JSON", code: "// Parse JSON\nconst jsonStr = '{\"name\": \"Alice\", \"age\": 25}';\nconst obj = JSON.parse(jsonStr);\nconsole.log(obj.name);\n\n// Stringify\nconst newObj = { name: 'Bob', age: 30 };\nconst str = JSON.stringify(newObj);\nconsole.log(str);" },
        python: { title: "Python JSON", code: "import json\n\n# Parse JSON\njson_str = '{\"name\": \"Alice\", \"age\": 25}'\nobj = json.loads(json_str)\nprint(obj['name'])\n\n# Stringify\nnew_obj = {'name': 'Bob', 'age': 30}\nstr_obj = json.dumps(new_obj)\nprint(str_obj)" },
        java: { title: "Java JSON", code: "// Using org.json library\nString jsonStr = \"{\\\"name\\\": \\\"Alice\\\", \\\"age\\\": 25}\";\nJSONObject obj = new JSONObject(jsonStr);\nSystem.out.println(obj.getString(\"name\"));" },
        cpp: { title: "C++ JSON", code: "// Using a JSON library like nlohmann/json\n#include <nlohmann/json.hpp>\nusing json = nlohmann::json;\n\njson j = json::parse(\"{\\\"name\\\": \\\"Alice\\\"}\");\nstd::cout << j[\"name\"] << \"\\n\";" },
        csharp: { title: "C# JSON", code: "using System.Text.Json;\n\nstring jsonStr = @\"{\\\"name\\\": \\\"Alice\\\", \\\"age\\\": 25}\";\nvar options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };\nvar obj = JsonSerializer.Deserialize<Person>(jsonStr, options);" },
      },
      api: {
        javascript: { title: "JavaScript API Call", code: "// Using fetch\nfetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));\n\n// Using async/await\nasync function getData() {\n  const response = await fetch('https://api.example.com/data');\n  const data = await response.json();\n  console.log(data);\n}" },
        python: { title: "Python API Call", code: "import requests\nimport json\n\n# GET request\nresponse = requests.get('https://api.example.com/data')\ndata = response.json()\nprint(data)\n\n# POST request\npayload = {'name': 'Alice'}\nresponse = requests.post('https://api.example.com/data', json=payload)" },
        java: { title: "Java API Call", code: "import java.net.http.HttpClient;\nimport java.net.http.HttpRequest;\nimport java.net.http.HttpResponse;\n\nHttpClient client = HttpClient.newHttpClient();\nHttpRequest request = HttpRequest.newBuilder()\n  .uri(URI.create(\"https://api.example.com/data\"))\n  .build();\n\nHttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());" },
        cpp: { title: "C++ API Call", code: "// Using a library like curl\n#include <iostream>\n#include <curl/curl.h>\n\nint main() {\n  CURL* curl = curl_easy_init();\n  if (curl) {\n    curl_easy_setopt(curl, CURLOPT_URL, \"https://api.example.com/data\");\n    curl_easy_perform(curl);\n    curl_easy_cleanup(curl);\n  }\n  return 0;\n}" },
        csharp: { title: "C# API Call", code: "using System.Net.Http;\nusing System.Threading.Tasks;\n\nvar client = new HttpClient();\nvar response = await client.GetAsync(\"https://api.example.com/data\");\nvar content = await response.Content.ReadAsStringAsync();\nConsole.WriteLine(content);" },
      },
      async: {
        javascript: { title: "JavaScript Async", code: "// Promise\nconst promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Done!'), 1000);\n});\n\npromise.then(result => console.log(result));\n\n// Async/Await\nasync function wait() {\n  const result = await promise;\n  console.log(result);\n}\n\nwait();" },
        python: { title: "Python Async", code: "import asyncio\n\nasync def fetch_data():\n    print('Fetching...')\n    await asyncio.sleep(1)\n    print('Done!')\n\nasync def main():\n    await fetch_data()\n\nasyncio.run(main())" },
        java: { title: "Java Async", code: "import java.util.concurrent.CompletableFuture;\n\nCompletableFuture.runAsync(() -> {\n  try { Thread.sleep(1000); }\n  catch (InterruptedException e) {}\n  System.out.println(\"Done!\");\n});" },
        cpp: { title: "C++ Async", code: "#include <iostream>\n#include <thread>\n#include <future>\n\nint main() {\n  std::future<int> result = std::async(std::launch::async, []() {\n    return 42;\n  });\n  std::cout << result.get() << \"\\n\";\n  return 0;\n}" },
        csharp: { title: "C# Async", code: "async Task FetchData() {\n    await Task.Delay(1000);\n    Console.WriteLine(\"Done!\");\n}\n\nawait FetchData();" },
      },
      "map-filter": {
        javascript: { title: "JavaScript Map/Filter", code: "const arr = [1, 2, 3, 4, 5];\n\n// Map\nconst doubled = arr.map(x => x * 2);\nconsole.log(doubled);\n\n// Filter\nconst evens = arr.filter(x => x % 2 === 0);\nconsole.log(evens);\n\n// Reduce\nconst sum = arr.reduce((acc, x) => acc + x, 0);\nconsole.log(sum);" },
        python: { title: "Python Map/Filter", code: "arr = [1, 2, 3, 4, 5]\n\n# Map\ndoubled = list(map(lambda x: x * 2, arr))\nprint(doubled)\n\n# Filter\nevens = list(filter(lambda x: x % 2 == 0, arr))\nprint(evens)\n\n# List comprehension (more Pythonic)\nsquared = [x ** 2 for x in arr]\nprint(squared)" },
        java: { title: "Java Streams", code: "List<Integer> arr = Arrays.asList(1, 2, 3, 4, 5);\n\n// Map\nList<Integer> doubled = arr.stream()\n  .map(x -> x * 2)\n  .collect(Collectors.toList());\n\n// Filter\nList<Integer> evens = arr.stream()\n  .filter(x -> x % 2 == 0)\n  .collect(Collectors.toList());" },
        cpp: { title: "C++ STL Algorithms", code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n  std::vector<int> arr = {1, 2, 3, 4, 5};\n  \n  std::vector<int> doubled;\n  std::transform(arr.begin(), arr.end(), \n    std::back_inserter(doubled), \n    [](int x) { return x * 2; });\n  return 0;\n}" },
        csharp: { title: "C# LINQ", code: "int[] arr = { 1, 2, 3, 4, 5 };\n\n// Map (Select)\nvar doubled = arr.Select(x => x * 2).ToList();\n\n// Filter (Where)\nvar evens = arr.Where(x => x % 2 == 0).ToList();\n\n// Reduce (Aggregate)\nvar sum = arr.Aggregate((acc, x) => acc + x);" },
      },
      "slice-concat": {
        javascript: { title: "JavaScript Slice/Concat", code: "const arr = [1, 2, 3, 4, 5];\n\n// Slice\nconsole.log(arr.slice(1, 4));\nconsole.log(arr.slice(-2));\n\n// Concat\nconst arr2 = [6, 7];\nconst combined = arr.concat(arr2);\nconsole.log(combined);" },
        python: { title: "Python Slice", code: "arr = [1, 2, 3, 4, 5]\n\n# Slice\nprint(arr[1:4])\nprint(arr[-2:])\nprint(arr[::2])\n\n# Concat\narr2 = [6, 7]\ncombined = arr + arr2\nprint(combined)" },
        java: { title: "Java ArrayList", code: "List<Integer> arr = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));\n\n// Sublist\nList<Integer> slice = arr.subList(1, 4);\n\n// AddAll\nList<Integer> arr2 = Arrays.asList(6, 7);\narr.addAll(arr2);" },
        cpp: { title: "C++ Vector", code: "#include <vector>\nstd::vector<int> arr = {1, 2, 3, 4, 5};\n\n// Create a slice\nstd::vector<int> slice(arr.begin() + 1, arr.begin() + 4);\n\n// Append\nstd::vector<int> arr2 = {6, 7};\narr.insert(arr.end(), arr2.begin(), arr2.end());" },
        csharp: { title: "C# List", code: "List<int> arr = new List<int> { 1, 2, 3, 4, 5 };\n\n// GetRange\nList<int> slice = arr.GetRange(1, 3);\n\n// AddRange\nList<int> arr2 = new List<int> { 6, 7 };\narr.AddRange(arr2);" },
      },
      tuple: {
        javascript: { title: "JavaScript Destructuring", code: "// Array destructuring\nconst [a, b, c] = [1, 2, 3];\nconsole.log(a, b, c);\n\n// Object destructuring\nconst { name, age } = { name: 'Alice', age: 25 };\nconsole.log(name, age);\n\n// Multiple returns (array)\nfunction getCoords() {\n  return [10, 20];\n}\nconst [x, y] = getCoords();" },
        python: { title: "Python Tuple", code: "# Tuple unpacking\na, b, c = 1, 2, 3\nprint(a, b, c)\n\n# Multiple returns\ndef get_coords():\n    return 10, 20\n\nx, y = get_coords()\nprint(x, y)\n\n# Named tuple\nfrom collections import namedtuple\nPoint = namedtuple('Point', ['x', 'y'])\np = Point(10, 20)" },
        java: { title: "Java Return Multiple", code: "// Using a custom class or record\nrecord Coords(int x, int y) {}\n\nCoords getCoords() {\n  return new Coords(10, 20);\n}\n\nCoords c = getCoords();\nSystem.out.println(c.x() + \", \" + c.y());" },
        cpp: { title: "C++ Tuple", code: "#include <iostream>\n#include <tuple>\nint main() {\n  std::tuple<int, int> coords = std::make_tuple(10, 20);\n  int x = std::get<0>(coords);\n  int y = std::get<1>(coords);\n  std::cout << x << \", \" << y << \"\\n\";\n  return 0;\n}" },
        csharp: { title: "C# Tuple", code: "// Value tuple\n(int x, int y) GetCoords() => (10, 20);\n\nvar (x, y) = GetCoords();\nConsole.WriteLine($\"{x}, {y}\");\n\n// Named tuple\nvar point = (X: 10, Y: 20);\nConsole.WriteLine(point.X);" },
      },
      set: {
        javascript: { title: "JavaScript Set", code: "// Set\nconst set = new Set([1, 2, 3, 3, 2]);\nconsole.log(set.size);\nconsole.log(set.has(2));\n\nset.add(4);\nset.delete(2);\n\nfor (const item of set) {\n  console.log(item);\n}" },
        python: { title: "Python Set", code: "# Set\ns = {1, 2, 3, 3, 2}\nprint(len(s))\nprint(2 in s)\n\ns.add(4)\ns.remove(2)\n\nfor item in s:\n    print(item)" },
        java: { title: "Java Set", code: "Set<Integer> set = new HashSet<>(Arrays.asList(1, 2, 3));\nset.add(4);\nset.remove(2);\n\nfor (int x : set) {\n  System.out.println(x);\n}" },
        cpp: { title: "C++ Set", code: "#include <iostream>\n#include <set>\nint main() {\n  std::set<int> s = {1, 2, 3};\n  s.insert(4);\n  s.erase(2);\n  \n  for (int x : s) {\n    std::cout << x << \"\\n\";\n  }\n  return 0;\n}" },
        csharp: { title: "C# HashSet", code: "HashSet<int> set = new HashSet<int> { 1, 2, 3 };\nset.Add(4);\nset.Remove(2);\n\nforeach (int x in set) {\n    Console.WriteLine(x);\n}" },
      },
      "dict-iteration": {
        javascript: { title: "JavaScript Object Iteration", code: "const obj = { name: 'Alice', age: 25, city: 'Seoul' };\n\n// Keys\nObject.keys(obj).forEach(key => console.log(key));\n\n// Values\nObject.values(obj).forEach(val => console.log(val));\n\n// Entries\nObject.entries(obj).forEach(([key, val]) => {\n  console.log(key, val);\n});" },
        python: { title: "Python Dict Iteration", code: "d = {'name': 'Alice', 'age': 25, 'city': 'Seoul'}\n\n# Keys\nfor key in d:\n    print(key)\n\n# Values\nfor val in d.values():\n    print(val)\n\n# Items\nfor key, val in d.items():\n    print(key, val)" },
        java: { title: "Java Map Iteration", code: "Map<String, Object> map = new HashMap<>();\nmap.put(\"name\", \"Alice\");\nmap.put(\"age\", 25);\n\n// EntrySet\nfor (var entry : map.entrySet()) {\n  System.out.println(entry.getKey() + \": \" + entry.getValue());\n}" },
        cpp: { title: "C++ Map Iteration", code: "#include <iostream>\n#include <map>\nint main() {\n  std::map<std::string, int> map;\n  map[\"age\"] = 25;\n  \n  for (const auto& [key, val] : map) {\n    std::cout << key << \": \" << val << \"\\n\";\n  }\n  return 0;\n}" },
        csharp: { title: "C# Dictionary Iteration", code: "var dict = new Dictionary<string, object>\n{\n    { \"name\", \"Alice\" },\n    { \"age\", 25 }\n};\n\nforeach (var kvp in dict) {\n    Console.WriteLine($\"{kvp.Key}: {kvp.Value}\");\n}" },
      },
      "type-casting": {
        javascript: { title: "JavaScript Type Conversion", code: "// String to Number\nconst str = \"123\";\nconst num = Number(str);\nconst num2 = parseInt(str);\n\n// Number to String\nconst num3 = 123;\nconst str2 = String(num3);\n\n// Boolean conversion\nconst bool = Boolean(1);\nconst bool2 = !!\"hello\";" },
        python: { title: "Python Type Casting", code: "# String to Number\nstr_val = \"123\"\nint_val = int(str_val)\nfloat_val = float(str_val)\n\n# Number to String\nint_val = 123\nstr_val = str(int_val)\n\n# Type checking\ntype(int_val)\nisinstance(int_val, int)" },
        java: { title: "Java Type Casting", code: "// String to int\nString str = \"123\";\nint num = Integer.parseInt(str);\n\n// int to String\nint num2 = 456;\nString str2 = String.valueOf(num2);\n\n// Casting\ndouble d = 3.14;\nint i = (int) d;" },
        cpp: { title: "C++ Type Casting", code: "#include <iostream>\n#include <string>\nint main() {\n  // String to int\n  std::string str = \"123\";\n  int num = std::stoi(str);\n  \n  // int to String\n  int num2 = 456;\n  std::string str2 = std::to_string(num2);\n  return 0;\n}" },
        csharp: { title: "C# Type Casting", code: "// String to int\nstring str = \"123\";\nint num = int.Parse(str);\nint num2 = Convert.ToInt32(str);\n\n// int to String\nint num3 = 456;\nstring str2 = num3.ToString();" },
      },
      validation: {
        javascript: { title: "JavaScript Validation", code: "function validateEmail(email) {\n  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return regex.test(email);\n}\n\nfunction validateNumber(num) {\n  return !isNaN(num) && num !== '';\n}\n\nconsole.log(validateEmail('test@example.com'));\nconsole.log(validateNumber('123'));" },
        python: { title: "Python Validation", code: "import re\n\ndef validate_email(email):\n    pattern = r'^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'\n    return bool(re.match(pattern, email))\n\ndef validate_number(num):\n    try:\n        float(num)\n        return True\n    except ValueError:\n        return False" },
        java: { title: "Java Validation", code: "public class Validator {\n  public static boolean isValidEmail(String email) {\n    return email.matches(\"^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$\");\n  }\n  \n  public static boolean isValidNumber(String str) {\n    try {\n      Double.parseDouble(str);\n      return true;\n    } catch (NumberFormatException e) {\n      return false;\n    }\n  }\n}" },
        cpp: { title: "C++ Validation", code: "#include <iostream>\n#include <regex>\nbool isValidEmail(const std::string& email) {\n  std::regex pattern(\"^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$\");\n  return std::regex_match(email, pattern);\n}\n\nint main() {\n  std::cout << isValidEmail(\"test@example.com\") << \"\\n\";\n  return 0;\n}" },
        csharp: { title: "C# Validation", code: "public class Validator {\n    public static bool IsValidEmail(string email) {\n        try {\n            var addr = new System.Net.Mail.MailAddress(email);\n            return addr.Address == email;\n        } catch {\n            return false;\n        }\n    }\n}" },
      },
      binary: {
        javascript: { title: "JavaScript Bitwise", code: "// Bitwise operations\nconst a = 5;   // 0101\nconst b = 3;   // 0011\n\nconsole.log(a & b);  // AND: 0001 (1)\nconsole.log(a | b);  // OR: 0111 (7)\nconsole.log(a ^ b);  // XOR: 0110 (6)\nconsole.log(~a);     // NOT\nconsole.log(a << 1); // Left shift: 1010 (10)" },
        python: { title: "Python Bitwise", code: "# Bitwise operations\na = 5    # 0101\nb = 3    # 0011\n\nprint(a & b)   # AND: 1\nprint(a | b)   # OR: 7\nprint(a ^ b)   # XOR: 6\nprint(~a)      # NOT\nprint(a << 1)  # Left shift: 10\nprint(a >> 1)  # Right shift: 2\n\n# Binary representation\nbin(a)\nhex(a)" },
        java: { title: "Java Bitwise", code: "int a = 5;  // 0101\nint b = 3;  // 0011\n\nSystem.out.println(a & b);   // AND: 1\nSystem.out.println(a | b);   // OR: 7\nSystem.out.println(a ^ b);   // XOR: 6\nSystem.out.println(~a);      // NOT\nSystem.out.println(a << 1);  // Left shift: 10\nSystem.out.println(a >> 1);  // Right shift: 2" },
        cpp: { title: "C++ Bitwise", code: "#include <iostream>\nint main() {\n  int a = 5;   // 0101\n  int b = 3;   // 0011\n  \n  std::cout << (a & b) << \"\\n\";   // 1\n  std::cout << (a | b) << \"\\n\";   // 7\n  std::cout << (a ^ b) << \"\\n\";   // 6\n  std::cout << (a << 1) << \"\\n\";  // 10\n  return 0;\n}" },
        csharp: { title: "C# Bitwise", code: "int a = 5;  // 0101\nint b = 3;  // 0011\n\nConsole.WriteLine(a & b);   // AND: 1\nConsole.WriteLine(a | b);   // OR: 7\nConsole.WriteLine(a ^ b);   // XOR: 6\nConsole.WriteLine(~a);      // NOT\nConsole.WriteLine(a << 1);  // Left shift: 10\nConsole.WriteLine(a >> 1);  // Right shift: 2" },
      },
    };

    return examples[category]?.[languageKey] || {
      title: "Example",
      code: "// Example code not available for this language/category",
    };
  }

  function renderExample() {
    const languageKey = languageSelect.value;
    const category = categorySelect.value;
    const example = buildExample(languageKey, category);
    title.textContent = example.title;
    code.textContent = example.code;
    status.textContent = "현재 예제를 확인 중입니다. 버튼으로 에디터에 바로 가져올 수 있습니다.";
  }

  languageSelect.value = "javascript";
  categorySelect.value = "basic";
  renderExample();

  languageSelect.addEventListener("change", renderExample);
  categorySelect.addEventListener("change", renderExample);

  openButton.addEventListener("click", () => {
    const snippet = {
      title: `${languageSamples[languageSelect.value]?.label || languageSelect.value}-${categorySelect.value}-example`,
      description: "Examples 탭에서 생성한 코드",
      language: languageSelect.value,
      code: code.textContent,
    };
    localStorage.setItem(pendingSnippetKey, JSON.stringify(snippet));
    location.href = "editor.html";
  });
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
  const statusIndicator = document.getElementById("statusIndicator");
  const statusMessage = document.getElementById("statusMessage");
  const statusProgress = document.getElementById("statusProgress");
  const statusDot = document.querySelector(".status-dot");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const saveMeta = document.getElementById("saveMeta");
  const projectCount = document.getElementById("projectCount");
  const projectList = document.getElementById("projectList");
  const previewFrame = document.getElementById("previewFrame");
  const circuitEditor = document.getElementById("circuitEditor");
  const circuitWorkspaceScroll = document.getElementById("circuitWorkspaceScroll");
  const circuitWorkspace = document.getElementById("circuitWorkspace");
  const circuitWireLayer = document.getElementById("circuitWireLayer");
  const circuitNodeLayer = document.getElementById("circuitNodeLayer");
  const circuitStatus = document.getElementById("circuitStatus");
  const circuitComponentType = document.getElementById("circuitComponentType");
  const circuitTargetMcu = document.getElementById("circuitTargetMcu");
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
  const copyAllCodeButton = document.getElementById("copyAllCodeButton");
  const fixAiCodeButton = document.getElementById("fixAiCodeButton");
  const runModePill = document.getElementById("runModePill");
  const stdinInput = document.getElementById("stdinInput");
  const terminalConsole = document.getElementById("terminalConsole");
  const terminalInput = document.getElementById("terminalInput");
  const terminalRunButton = document.getElementById("terminalRunButton");
  const terminalClearButton = document.getElementById("terminalClearButton");
  const terminalStatusButton = document.getElementById("terminalStatusButton");
  const terminalRuntimesButton = document.getElementById("terminalRuntimesButton");
  const terminalRunCodeButton = document.getElementById("terminalRunCodeButton");
  const terminalAiPingButton = document.getElementById("terminalAiPingButton");
  const fileMenuButton = document.getElementById("fileMenuButton");
  const editMenuButton = document.getElementById("editMenuButton");
  const helpMenuButton = document.getElementById("helpMenuButton");
  const fileMenuDropdown = document.getElementById("fileMenuDropdown");
  const editMenuDropdown = document.getElementById("editMenuDropdown");
  const helpMenuDropdown = document.getElementById("helpMenuDropdown");
  const menuSaveButton = document.getElementById("menuSaveButton");
  const menuSaveAsButton = document.getElementById("menuSaveAsButton");
  const menuDeleteProjectButton = document.getElementById("menuDeleteProjectButton");
  const menuFindButton = document.getElementById("menuFindButton");
  const menuUndoButton = document.getElementById("menuUndoButton");
  const menuRedoButton = document.getElementById("menuRedoButton");
  const menuRunAgainButton = document.getElementById("menuRunAgainButton");
  const menuRunAgainInteractiveButton = document.getElementById("menuRunAgainInteractiveButton");

  let circuitStateMap = getStoredCircuitStates();
  let circuitModel = null;
  let selectedNodeId = null;
  let connectFromNodeId = null;
  let pendingPinLink = null;
  let dragState = null;
  let activeInteractiveSessionId = null;
  let interactiveWaitingForInput = false;
  let selectedTargetMcu = null;

  const CIRCUIT_NODE_WIDTH = 190;
  const CIRCUIT_NODE_HEIGHT = 120;
  const SVG_OFFSET_X = 5;
  const SVG_OFFSET_Y = 10;

  function isCircuitLanguage(languageKey) {
    return languageSamples[languageKey]?.mode === "circuit";
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function updateStatus(state, message, progress = null) {
    // state: 'ready', 'compiling', 'running', 'waiting', 'done', 'error'
    const states = {
      ready: { message: '준비됨', dot: 'ready', icon: '✓' },
      compiling: { message: '컴파일중...', dot: 'compiling', icon: '⚙️' },
      running: { message: '실행중...', dot: 'running', icon: '▶' },
      waiting: { message: '입력 대기중...', dot: 'waiting', icon: '⏸' },
      done: { message: '실행 완료', dot: 'done', icon: '✓' },
      error: { message: '실행 실패', dot: 'error', icon: '✕' }
    };

    const config = states[state] || states.ready;
    const displayMessage = message || config.message;

    // Update status indicator
    if (statusMessage) statusMessage.textContent = displayMessage;
    if (statusDot) {
      statusDot.className = `status-dot ${config.dot}`;
    }

    // Update progress bar
    if (progress !== null && statusProgress) {
      if (progress > 0) {
        statusProgress.classList.add('active');
        if (progressFill) progressFill.style.width = `${Math.min(progress, 100)}%`;
        if (progressText) progressText.textContent = `${Math.round(progress)}% - ${displayMessage}`;
      } else {
        statusProgress.classList.remove('active');
      }
    } else if (statusProgress) {
      statusProgress.classList.remove('active');
    }

    // Backward compatibility with old statusBadge
    if (statusBadge) {
      statusBadge.textContent = displayMessage;
    }
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

  function getComponentColor(node) {
    if (node.variant?.includes("green")) return "#44dd44";
    if (node.variant?.includes("blue")) return "#4444ff";
    if (node.variant?.includes("yellow")) return "#ffdd44";
    if (node.variant?.includes("rgb")) return node.state?.on ? "#ff8844" : "#cccccc";
    return "#ff4444";
  }

  function extractCircuitMcuNodes() {
    if (!circuitModel?.nodes) return [];
    return circuitModel.nodes.filter(n => n.type === "mcu").map(n => ({
      id: n.id,
      name: n.name,
      variant: n.variant || "",
      label: `${n.name} (${n.variant || "Unknown"})`,
    }));
  }

  function getSelectedMcuInfo() {
    if (!selectedTargetMcu || !circuitModel) return null;
    const node = circuitModel.nodes.find(n => n.id === selectedTargetMcu);
    if (!node) return null;
    return {
      id: node.id,
      name: node.name,
      variant: node.variant || "",
      type: node.type,
    };
  }

  function updateCircuitMcuSelect() {
    const mcuNodes = extractCircuitMcuNodes();
    circuitTargetMcu.innerHTML = '<option value="">MCU 선택 (자동 감지)</option>';
    mcuNodes.forEach(mcu => {
      const opt = document.createElement("option");
      opt.value = mcu.id;
      opt.textContent = mcu.label;
      circuitTargetMcu.appendChild(opt);
    });
    
    const savedMcu = getCircuitMcuSelection();
    if (savedMcu && mcuNodes.some(m => m.id === savedMcu)) {
      circuitTargetMcu.value = savedMcu;
    } else {
      circuitTargetMcu.value = "";
    }
    
    const statusCount = mcuNodes.length;
    if (statusCount > 0) {
      const selLabel = circuitTargetMcu.value ? 
        circuitTargetMcu.options[circuitTargetMcu.selectedIndex]?.textContent : 
        "미선택";
      document.getElementById("circuitStatus").textContent = 
        `회로에 ${statusCount}개 MCU 감지됨. 코드 배포 대상: ${selLabel}`;
    }
  }

  function persistCircuitMcuSelection() {
    const key = `circuit-target-mcu-${languageSelect.value}`;
    localStorage.setItem(key, circuitTargetMcu.value || "");
  }

  function getCircuitMcuSelection() {
    const key = `circuit-target-mcu-${languageSelect.value}`;
    return localStorage.getItem(key) || "";
  }

  function getMcuProfile(variant = "") {
    const key = String(variant || "").toLowerCase();
    if (key.includes("arduino-mega")) return { family: "Arduino", label: "MEGA", pinsPerSide: 10 };
    if (key.includes("arduino-due")) return { family: "Arduino", label: "DUE", pinsPerSide: 9 };
    if (key.includes("arduino-nano")) return { family: "Arduino", label: "NANO", pinsPerSide: 8 };
    if (key.includes("arduino-leonardo")) return { family: "Arduino", label: "LEO", pinsPerSide: 7 };
    if (key.includes("esp8266-01")) return { family: "ESP", label: "8266-01", pinsPerSide: 2 };
    if (key.includes("esp8266")) return { family: "ESP", label: "8266", pinsPerSide: 4 };
    if (key.includes("esp32-s3")) return { family: "ESP", label: "S3", pinsPerSide: 8 };
    if (key.includes("esp32-s2")) return { family: "ESP", label: "S2", pinsPerSide: 8 };
    if (key.includes("esp32-c6")) return { family: "ESP", label: "C6", pinsPerSide: 7 };
    if (key.includes("esp32-c3")) return { family: "ESP", label: "C3", pinsPerSide: 7 };
    if (key.includes("esp32-h2")) return { family: "ESP", label: "H2", pinsPerSide: 6 };
    if (key.includes("esp32-p4")) return { family: "ESP", label: "P4", pinsPerSide: 10 };
    if (key.includes("esp32")) return { family: "ESP", label: "ESP32", pinsPerSide: 8 };
    return { family: "Arduino", label: "UNO", pinsPerSide: 7 };
  }

  function getMcuPinLabels(variant = "") {
    const key = String(variant || "").toLowerCase();
    if (key.includes("esp")) {
      return {
        left: ["3V3", "EN", "GPIO1", "GPIO2", "GPIO3", "GPIO4", "GPIO5", "GND", "GPIO6", "GPIO7"],
        right: ["VIN", "GND", "GPIO8", "GPIO9", "GPIO10", "GPIO11", "GPIO12", "GPIO13", "GPIO14", "GPIO15"],
      };
    }
    return {
      left: ["A0", "A1", "A2", "A3", "A4", "A5", "5V", "3V3", "GND", "VIN"],
      right: ["D13", "D12", "D11", "D10", "D9", "D8", "D7", "D6", "D5", "D1"],
    };
  }

  function renderComponentSvg(node) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "180");
    svg.setAttribute("height", "100");
    svg.setAttribute("viewBox", "0 0 180 100");
    svg.style.pointerEvents = "none";

    if (node.type === "breadboard") {
      const frame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      frame.setAttribute("x", "15");
      frame.setAttribute("y", "15");
      frame.setAttribute("width", "150");
      frame.setAttribute("height", "70");
      frame.setAttribute("rx", "4");
      frame.setAttribute("fill", "#cc0000");
      frame.setAttribute("stroke", "#660000");
      frame.setAttribute("stroke-width", "2");
      svg.appendChild(frame);
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
          const hole = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          hole.setAttribute("cx", String(25 + col * 18));
          hole.setAttribute("cy", String(32 + row * 15));
          hole.setAttribute("r", "2.3");
          hole.setAttribute("fill", "#111");
          svg.appendChild(hole);
        }
      }
    } else if (node.type === "led") {
      const ledColor = getComponentColor(node);
      const isOn = Boolean(node.state?.on);
      [35, 145].forEach((x) => {
        const leg = document.createElementNS("http://www.w3.org/2000/svg", "line");
        leg.setAttribute("x1", String(x));
        leg.setAttribute("y1", "50");
        leg.setAttribute("x2", String(x));
        leg.setAttribute("y2", "86");
        leg.setAttribute("stroke", "#888");
        leg.setAttribute("stroke-width", "2");
        svg.appendChild(leg);
      });
      const body = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      body.setAttribute("cx", "90");
      body.setAttribute("cy", "38");
      body.setAttribute("r", "20");
      body.setAttribute("fill", isOn ? ledColor : "#2a2a2a");
      body.setAttribute("stroke", "#111");
      body.setAttribute("stroke-width", "1.2");
      svg.appendChild(body);
    } else if (node.type === "button") {
      const pressed = Boolean(node.state?.pressed);
      const base = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      base.setAttribute("x", "40");
      base.setAttribute("y", "20");
      base.setAttribute("width", "100");
      base.setAttribute("height", "50");
      base.setAttribute("rx", "8");
      base.setAttribute("fill", "#333");
      svg.appendChild(base);
      const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      head.setAttribute("cx", "90");
      head.setAttribute("cy", pressed ? "56" : "44");
      head.setAttribute("r", "16");
      head.setAttribute("fill", pressed ? "#0a5ccc" : "#2563eb");
      svg.appendChild(head);
      [65, 115].forEach((x) => {
        const pin = document.createElementNS("http://www.w3.org/2000/svg", "line");
        pin.setAttribute("x1", String(x));
        pin.setAttribute("y1", "74");
        pin.setAttribute("x2", String(x));
        pin.setAttribute("y2", "90");
        pin.setAttribute("stroke", "#888");
        pin.setAttribute("stroke-width", "2");
        svg.appendChild(pin);
      });
    } else if (node.type === "display") {
      const isOLED = node.variant?.includes("oled");
      const isTFT = node.variant?.includes("tft");
      const frame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      frame.setAttribute("x", "20");
      frame.setAttribute("y", "15");
      frame.setAttribute("width", "140");
      frame.setAttribute("height", "60");
      frame.setAttribute("rx", "4");
      frame.setAttribute("fill", "#333");
      frame.setAttribute("stroke", "#666");
      frame.setAttribute("stroke-width", "2");
      svg.appendChild(frame);
      const screen = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      screen.setAttribute("x", "28");
      screen.setAttribute("y", "23");
      screen.setAttribute("width", "124");
      screen.setAttribute("height", "44");
      screen.setAttribute("fill", isTFT ? "#0066cc" : "#000");
      screen.setAttribute("stroke", isOLED ? "#ffaa00" : "#222");
      svg.appendChild(screen);
      [44, 69, 94, 119].forEach((x) => {
        const pin = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        pin.setAttribute("x", String(x));
        pin.setAttribute("y", "78");
        pin.setAttribute("width", "8");
        pin.setAttribute("height", "12");
        pin.setAttribute("fill", "#888");
        svg.appendChild(pin);
      });
    } else if (node.type === "motor") {
      const isServo = node.variant?.includes("servo");
      const isStepper = node.variant?.includes("stepper");
      const body = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      body.setAttribute("cx", "90");
      body.setAttribute("cy", "45");
      body.setAttribute("r", "28");
      body.setAttribute("fill", isStepper ? "#daa520" : isServo ? "#87ceeb" : "#e8e8e8");
      body.setAttribute("stroke", "#333");
      body.setAttribute("stroke-width", "2");
      svg.appendChild(body);
      [60, 90, 120].forEach((x) => {
        const pin = document.createElementNS("http://www.w3.org/2000/svg", "line");
        pin.setAttribute("x1", String(x));
        pin.setAttribute("y1", "72");
        pin.setAttribute("x2", String(x));
        pin.setAttribute("y2", "90");
        pin.setAttribute("stroke", "#888");
        pin.setAttribute("stroke-width", "2");
        svg.appendChild(pin);
      });
    } else if (node.type === "mcu") {
      const profile = getMcuProfile(node.variant);
      const labels = getMcuPinLabels(node.variant);
      const isESP = profile.family === "ESP";
      const board = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      board.setAttribute("x", "20");
      board.setAttribute("y", "12");
      board.setAttribute("width", "140");
      board.setAttribute("height", "76");
      board.setAttribute("rx", "4");
      board.setAttribute("fill", isESP ? "#1a5490" : "#1a1a1a");
      board.setAttribute("stroke", isESP ? "#ff6b35" : "#e8e8e8");
      board.setAttribute("stroke-width", "2");
      svg.appendChild(board);

      const chip = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      chip.setAttribute("x", "66");
      chip.setAttribute("y", "34");
      chip.setAttribute("width", "48");
      chip.setAttribute("height", "28");
      chip.setAttribute("rx", "3");
      chip.setAttribute("fill", "#0f172a");
      chip.setAttribute("stroke", "#64748b");
      svg.appendChild(chip);

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", "90");
      label.setAttribute("y", "53");
      label.setAttribute("font-size", "12");
      label.setAttribute("fill", isESP ? "#ffcf9f" : "#f8fafc");
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-weight", "700");
      label.textContent = profile.label;
      svg.appendChild(label);

      const rows = profile.pinsPerSide;
      for (let i = 0; i < rows; i++) {
        const y = 16 + i * (68 / Math.max(1, rows - 1));
        const left = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        left.setAttribute("x", "14");
        left.setAttribute("y", String(y));
        left.setAttribute("width", "8");
        left.setAttribute("height", "3.5");
        left.setAttribute("fill", isESP ? "#ff6b35" : "#f39c12");
        svg.appendChild(left);
        const right = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        right.setAttribute("x", "158");
        right.setAttribute("y", String(y));
        right.setAttribute("width", "8");
        right.setAttribute("height", "3.5");
        right.setAttribute("fill", isESP ? "#ff6b35" : "#f39c12");
        svg.appendChild(right);

        const leftText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        leftText.setAttribute("x", "24");
        leftText.setAttribute("y", String(y + 3.5));
        leftText.setAttribute("font-size", "4.2");
        leftText.setAttribute("fill", "#e2e8f0");
        leftText.setAttribute("text-anchor", "start");
        leftText.textContent = labels.left[i] || `L${i + 1}`;
        svg.appendChild(leftText);

        const rightText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        rightText.setAttribute("x", "156");
        rightText.setAttribute("y", String(y + 3.5));
        rightText.setAttribute("font-size", "4.2");
        rightText.setAttribute("fill", "#e2e8f0");
        rightText.setAttribute("text-anchor", "end");
        rightText.textContent = labels.right[i] || `R${i + 1}`;
        svg.appendChild(rightText);
      }
    } else if (node.type === "resistor") {
      [30, 150].forEach((x) => {
        const leg = document.createElementNS("http://www.w3.org/2000/svg", "line");
        leg.setAttribute("x1", String(x));
        leg.setAttribute("y1", "50");
        leg.setAttribute("x2", String(x));
        leg.setAttribute("y2", "86");
        leg.setAttribute("stroke", "#888");
        leg.setAttribute("stroke-width", "2");
        svg.appendChild(leg);
      });
      const body = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      body.setAttribute("x", "35");
      body.setAttribute("y", "38");
      body.setAttribute("width", "110");
      body.setAttribute("height", "24");
      body.setAttribute("rx", "2");
      body.setAttribute("fill", "#cc8844");
      body.setAttribute("stroke", "#996633");
      svg.appendChild(body);
    } else if (node.type === "sensor") {
      const isPIR = node.variant?.includes("pir");
      const body = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      body.setAttribute("cx", "90");
      body.setAttribute("cy", "45");
      body.setAttribute("r", "25");
      body.setAttribute("fill", isPIR ? "#e74c3c" : "#9b59b6");
      body.setAttribute("stroke", "#333");
      body.setAttribute("stroke-width", "2");
      svg.appendChild(body);
      [70, 90, 110].forEach((x) => {
        const pin = document.createElementNS("http://www.w3.org/2000/svg", "line");
        pin.setAttribute("x1", String(x));
        pin.setAttribute("y1", "71");
        pin.setAttribute("x2", String(x));
        pin.setAttribute("y2", "90");
        pin.setAttribute("stroke", "#888");
        pin.setAttribute("stroke-width", "2");
        svg.appendChild(pin);
      });
    } else {
      const body = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      body.setAttribute("x", "20");
      body.setAttribute("y", "25");
      body.setAttribute("width", "140");
      body.setAttribute("height", "50");
      body.setAttribute("rx", "4");
      body.setAttribute("fill", "#f0f0f0");
      body.setAttribute("stroke", "#333");
      svg.appendChild(body);
    }

    return svg;
  }

  function getNodePins(node) {
    const leftMid = { key: "left", label: "LEFT", x: node.x + SVG_OFFSET_X + 20, y: node.y + SVG_OFFSET_Y + 50 };
    const rightMid = { key: "right", label: "RIGHT", x: node.x + SVG_OFFSET_X + 160, y: node.y + SVG_OFFSET_Y + 50 };
    const topMid = { key: "top", label: "TOP", x: node.x + SVG_OFFSET_X + 90, y: node.y + SVG_OFFSET_Y + 20 };
    const bottomMid = { key: "bottom", label: "BOTTOM", x: node.x + SVG_OFFSET_X + 90, y: node.y + SVG_OFFSET_Y + 90 };

    if (node.type === "led") {
      return [
        { key: "anode", label: "ANODE", x: node.x + SVG_OFFSET_X + 35, y: node.y + SVG_OFFSET_Y + 80 },
        { key: "cathode", label: "CATHODE", x: node.x + SVG_OFFSET_X + 145, y: node.y + SVG_OFFSET_Y + 80 },
      ];
    }

    if (node.type === "button") {
      return [
        { key: "pin1", label: "PIN1", x: node.x + SVG_OFFSET_X + 65, y: node.y + SVG_OFFSET_Y + 88 },
        { key: "pin2", label: "PIN2", x: node.x + SVG_OFFSET_X + 115, y: node.y + SVG_OFFSET_Y + 88 },
      ];
    }

    if (node.type === "resistor") {
      return [
        { key: "left", label: "LEFT", x: node.x + SVG_OFFSET_X + 30, y: node.y + SVG_OFFSET_Y + 80 },
        { key: "right", label: "RIGHT", x: node.x + SVG_OFFSET_X + 150, y: node.y + SVG_OFFSET_Y + 80 },
      ];
    }

    if (node.type === "display") {
      return [
        { key: "vcc", label: "5V", x: node.x + SVG_OFFSET_X + 44, y: node.y + SVG_OFFSET_Y + 90 },
        { key: "gnd", label: "GND", x: node.x + SVG_OFFSET_X + 69, y: node.y + SVG_OFFSET_Y + 90 },
        { key: "sda", label: "SDA", x: node.x + SVG_OFFSET_X + 94, y: node.y + SVG_OFFSET_Y + 90 },
        { key: "scl", label: "SCL", x: node.x + SVG_OFFSET_X + 119, y: node.y + SVG_OFFSET_Y + 90 },
      ];
    }

    if (node.type === "motor") {
      return [
        { key: "pwr", label: "5V", x: node.x + SVG_OFFSET_X + 60, y: node.y + SVG_OFFSET_Y + 88 },
        { key: "gnd", label: "GND", x: node.x + SVG_OFFSET_X + 90, y: node.y + SVG_OFFSET_Y + 88 },
        { key: "sig", label: "SIG", x: node.x + SVG_OFFSET_X + 120, y: node.y + SVG_OFFSET_Y + 88 },
      ];
    }

    if (node.type === "sensor") {
      return [
        { key: "vcc", label: "5V", x: node.x + SVG_OFFSET_X + 70, y: node.y + SVG_OFFSET_Y + 90 },
        { key: "sig", label: "SIG", x: node.x + SVG_OFFSET_X + 90, y: node.y + SVG_OFFSET_Y + 90 },
        { key: "gnd", label: "GND", x: node.x + SVG_OFFSET_X + 110, y: node.y + SVG_OFFSET_Y + 90 },
      ];
    }

    if (node.type === "mcu") {
      const profile = getMcuProfile(node.variant);
      const labels = getMcuPinLabels(node.variant);
      const rows = profile.pinsPerSide;
      const pins = [];
      for (let i = 0; i < rows; i++) {
        const y = node.y + SVG_OFFSET_Y + 18 + i * (68 / Math.max(1, rows - 1));
        pins.push({ key: `l${i + 1}`, label: labels.left[i] || `L${i + 1}`, x: node.x + SVG_OFFSET_X + 14, y });
        pins.push({ key: `r${i + 1}`, label: labels.right[i] || `R${i + 1}`, x: node.x + SVG_OFFSET_X + 166, y });
      }
      return pins;
    }

    if (node.type === "breadboard") {
      const pins = [];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
          pins.push({
            key: `h${row}-${col}`,
            label: `H${row + 1}-${col + 1}`,
            x: node.x + SVG_OFFSET_X + 25 + col * 18,
            y: node.y + SVG_OFFSET_Y + 32 + row * 15,
          });
        }
      }
      return pins;
    }

    return [leftMid, rightMid, topMid, bottomMid];
  }

  function pickNearestPinPair(fromNode, toNode, fromPinKey, toPinKey) {
    const fromPins = getNodePins(fromNode);
    const toPins = getNodePins(toNode);

    if (fromPinKey && toPinKey) {
      const fixedFrom = fromPins.find((pin) => pin.key === fromPinKey);
      const fixedTo = toPins.find((pin) => pin.key === toPinKey);
      if (fixedFrom && fixedTo) {
        return { fromPin: fixedFrom, toPin: fixedTo };
      }
    }

    let best = { fromPin: fromPins[0], toPin: toPins[0] };
    let bestDist = Number.POSITIVE_INFINITY;
    fromPins.forEach((a) => {
      toPins.forEach((b) => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = dx * dx + dy * dy;
        if (dist < bestDist) {
          bestDist = dist;
          best = { fromPin: a, toPin: b };
        }
      });
    });

    return best;
  }

  function connectPinsBySelection(fromNodeId, fromPinKey, toNodeId, toPinKey) {
    if (!circuitModel || fromNodeId === toNodeId) {
      return false;
    }
    const fromNode = getNodeById(fromNodeId);
    const toNode = getNodeById(toNodeId);
    if (!fromNode || !toNode) {
      return false;
    }
    const exists = circuitModel.wires.some(
      (wire) =>
        (wire.from === fromNodeId && wire.to === toNodeId && wire.fromPin === fromPinKey && wire.toPin === toPinKey) ||
        (wire.from === toNodeId && wire.to === fromNodeId && wire.fromPin === toPinKey && wire.toPin === fromPinKey)
    );
    if (exists) {
      return false;
    }
    circuitModel.wires.push({ from: fromNodeId, to: toNodeId, fromPin: fromPinKey, toPin: toPinKey });
    persistCircuitModel(languageSelect.value);
    return true;
  }

  function renderCircuitEditor() {
    if (!circuitWireLayer || !circuitNodeLayer) {
      return;
    }

    updateCircuitMcuSelect();

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
      const pinPair = pickNearestPinPair(from, to, wire.fromPin, wire.toPin);
      wire.fromPin = pinPair.fromPin.key;
      wire.toPin = pinPair.toPin.key;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(pinPair.fromPin.x));
      line.setAttribute("y1", String(pinPair.fromPin.y));
      line.setAttribute("x2", String(pinPair.toPin.x));
      line.setAttribute("y2", String(pinPair.toPin.y));
      line.setAttribute("stroke", "#2563eb");
      line.setAttribute("stroke-width", "2.5");
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
      nodeElement.dataset.nodeType = node.type;

      const label = document.createElement("div");
      label.className = "circuit-node-label";
      label.innerHTML = `<span class="circuit-node-name">${escapeHtml(node.name)}</span><span class="circuit-node-pin">${escapeHtml(node.pin)}</span>`;
      nodeElement.appendChild(label);

      const svgElement = renderComponentSvg(node);
      nodeElement.appendChild(svgElement);

      const pins = getNodePins(node);
      pins.forEach((pin) => {
        const pinText = document.createElement("span");
        pinText.className = "circuit-pin-text";
        pinText.style.left = `${pin.x - node.x + 7}px`;
        pinText.style.top = `${pin.y - node.y - 6}px`;
        pinText.textContent = pin.label || pin.key;
        nodeElement.appendChild(pinText);

        const pinButton = document.createElement("button");
        pinButton.type = "button";
        pinButton.className = "circuit-pin-hotspot";
        if (pendingPinLink && pendingPinLink.nodeId === node.id && pendingPinLink.pinKey === pin.key) {
          pinButton.classList.add("is-selected");
        }
        pinButton.style.left = `${pin.x - node.x - 5}px`;
        pinButton.style.top = `${pin.y - node.y - 5}px`;
        pinButton.title = `${node.name} : ${pin.label || pin.key}`;
        pinButton.setAttribute("aria-label", pinButton.title);
        pinButton.addEventListener("click", (event) => {
          event.stopPropagation();
          selectedNodeId = node.id;
          if (!pendingPinLink) {
            pendingPinLink = { nodeId: node.id, pinKey: pin.key, pinLabel: pin.label || pin.key };
            renderCircuitForm();
            renderCircuitEditor();
            setCircuitStatus(`시작 핀 선택: ${node.name} ${pin.label || pin.key}. 이제 연결할 핀을 클릭하세요.`);
            return;
          }

          if (pendingPinLink.nodeId === node.id && pendingPinLink.pinKey === pin.key) {
            pendingPinLink = null;
            renderCircuitEditor();
            setCircuitStatus("핀 선택을 취소했습니다.");
            return;
          }

          const connected = connectPinsBySelection(pendingPinLink.nodeId, pendingPinLink.pinKey, node.id, pin.key);
          pendingPinLink = null;
          renderCircuitForm();
          renderCircuitEditor();
          setCircuitStatus(connected ? "핀-핀 배선을 추가했습니다." : "이미 같은 핀 배선이 있거나 연결할 수 없습니다.");
        });
        nodeElement.appendChild(pinButton);
      });

      nodeElement.addEventListener("click", (event) => {
        event.stopPropagation();
        if ((node.type === "led" || node.type === "button" || node.type === "motor") && event.ctrlKey) {
          if (node.type === "led") {
            node.state.on = !node.state.on;
          } else if (node.type === "button") {
            node.state.pressed = !node.state.pressed;
          } else if (node.type === "motor") {
            node.state.speed = node.state.speed === 0 ? 255 : 0;
          }
          renderCircuitEditor();
        } else {
          selectCircuitNode(node.id);
        }
      });

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
      pendingPinLink = null;
      toggleCircuitEnabled(false);
      renderCircuitForm();
      renderCircuitEditor();
      setCircuitStatus("Arduino/ESP-IDF를 선택하면 회로 편집기가 활성화됩니다.");
      return;
    }

    circuitModel = getCircuitModel(languageKey, forceReset);
    selectedNodeId = circuitModel.nodes[0]?.id || null;
    connectFromNodeId = null;
    pendingPinLink = null;
    toggleCircuitEnabled(true);
    renderCircuitForm();
    renderCircuitEditor();
    persistCircuitModel(languageKey);
    setCircuitStatus("드래그로 배치 변경, 와이어 모드로 배선 추가(부품 다리 핀 자동 연결) 가능합니다.");
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
    updateStatus('ready');
    outputConsole.textContent = content[currentLocale].outputReady;
    resetPreview(previewFrame);
    loadCircuitForLanguage(languageKey);
  }

  function saveProject() {
    const safeName = sanitizeName(projectName.value);
    if (!safeName) {
      updateStatus('error');
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
    updateStatus('done', '저장 완료');
    outputConsole.textContent = `저장 완료\n\n${safeName} 프로젝트가 브라우저 로컬 저장소에 보관되었습니다.`;
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
    updateStatus('ready');
    outputConsole.textContent = `${project.name} 프로젝트를 불러왔습니다.`;
    resetPreview(previewFrame);
    loadCircuitForLanguage(project.language);
    localStorage.setItem(lastProjectKey, project.name);
  }

  function hideAllWindowMenus() {
    fileMenuDropdown?.classList.add("is-hidden");
    editMenuDropdown?.classList.add("is-hidden");
    helpMenuDropdown?.classList.add("is-hidden");
  }

  function toggleWindowMenu(menuElement) {
    if (!menuElement) {
      return;
    }
    const shouldOpen = menuElement.classList.contains("is-hidden");
    hideAllWindowMenus();
    if (shouldOpen) {
      menuElement.classList.remove("is-hidden");
    }
  }

  function saveProjectAs() {
    const defaultName = sanitizeName(projectName.value) || "my-project";
    const nextName = window.prompt("새 프로젝트 이름을 입력하세요", defaultName);
    if (!nextName) {
      return;
    }
    projectName.value = sanitizeName(nextName);
    saveProject();
  }

  function deleteCurrentProject() {
    const safeName = sanitizeName(projectName.value);
    if (!safeName) {
      return;
    }

    const ok = window.confirm(`'${safeName}' 프로젝트를 삭제할까요?`);
    if (!ok) {
      return;
    }

    const nextProjects = getProjects().filter((item) => item.name !== safeName);
    setProjects(nextProjects);
    if (localStorage.getItem(lastProjectKey) === safeName) {
      localStorage.removeItem(lastProjectKey);
    }

    renderProjectList();
    saveMeta.textContent = content[currentLocale].saveMetaEmpty;
    updateStatus('ready');
    outputConsole.textContent = `${safeName} 프로젝트를 삭제했습니다.`;
  }

  function findInEditor() {
    const keyword = window.prompt("찾을 텍스트를 입력하세요");
    if (!keyword) {
      return;
    }

    const source = codeEditor.value;
    const from = codeEditor.selectionEnd || 0;
    let index = source.indexOf(keyword, from);
    if (index < 0) {
      index = source.indexOf(keyword);
    }
    if (index < 0) {
      outputConsole.textContent = `"${keyword}"를 찾지 못했습니다.`;
      return;
    }

    codeEditor.focus();
    codeEditor.setSelectionRange(index, index + keyword.length);
    codeEditor.scrollTop = Math.max(0, codeEditor.scrollTop - 40);
  }

  function inferInputValueFromPrompt(line) {
    const normalized = String(line || "").toLowerCase();
    if (!normalized.trim()) {
      return "hello";
    }
    if (/\[\s*y\s*\/\s*n\s*\]|yes|no|y\/n|\(y\/n\)|\(yes\/no\)/i.test(normalized)) {
      return "y";
    }
    if (/how many|count|number|digit|age|int|integer|float|double|score|point|num/i.test(normalized)) {
      return "1";
    }
    return "hello";
  }

  function buildAutoStdinFromOutput(outputText) {
    const lines = String(outputText || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const promptLines = lines.filter((line) => /\?|:|\[.*\]/.test(line)).slice(-5);
    if (!promptLines.length) {
      return "hello";
    }
    return promptLines.map(inferInputValueFromPrompt).join("\n");
  }

  async function runCurrentCodeInteractive() {
    const languageKey = languageSelect.value;
    const code = codeEditor.value;
    const sample = languageSamples[languageKey];
    const interactiveSupported = new Set(["python", "javascript", "bash", "c"]);

    if (!canRunNow()) {
      updateStatus('error', '요청 너무 빠름');
      outputConsole.textContent = "1초 동안 실행 요청은 최대 60회까지만 허용됩니다. 잠시 후 다시 실행해 주세요. (stdin 입력 문제는 아닙니다)";
      return;
    }

    if (!sample.runner) {
      outputConsole.textContent = "현재 언어는 클라우드 런타임이 준비되지 않았습니다.";
      updateStatus('error', '런타임 준비 안됨');
      return;
    }

    if (!interactiveSupported.has(languageKey)) {
      outputConsole.textContent = `대화형 실행은 ${sample.label || languageKey}에서 아직 지원되지 않아 일반 실행으로 전환합니다.`;
      updateStatus('waiting', '일반 실행 전환');
      await runCurrentCode();
      return;
    }

    updateStatus('waiting', '입력 대기중...');
    outputConsole.textContent = "";
    
    let sessionId = null;
    let buffer = "";
    let sseBuffer = "";
    
    try {
      activeInteractiveSessionId = null;
      const runtimeConfig = getRuntimeConfig();
      const endpoint = runtimeConfig.endpoint.replace('/api/v2/piston/execute', '/api/execute-interactive');
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: languageKey,
          files: [{ name: `code.${languageSamples[languageKey].extension}`, content: code }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      interactiveWaitingForInput = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        sseBuffer += chunk;

        const events = sseBuffer.split('\n\n');
        sseBuffer = events.pop() || '';

        for (const eventBlock of events) {
          if (!eventBlock.trim()) continue;

          const dataLines = eventBlock
            .split('\n')
            .filter((line) => line.startsWith('data:'))
            .map((line) => line.slice(5).trimStart());

          if (!dataLines.length) continue;

          try {
            const event = JSON.parse(dataLines.join('\n'));

            if (event.type === 'session') {
              sessionId = event.sessionId;
              activeInteractiveSessionId = sessionId;
              console.log('[Interactive Session]', sessionId);
            } else if (event.type === 'output') {
              buffer += event.data;
              outputConsole.textContent = buffer;
              outputConsole.scrollTop = outputConsole.scrollHeight;
              
              // Check if output looks like a prompt (ends with : or ?)
              const lastLine = buffer.trim().split('\n').pop() || '';
              if (sessionId && !interactiveWaitingForInput && (lastLine.endsWith(':') || lastLine.endsWith('?'))) {
                interactiveWaitingForInput = true;
                showInteractiveInputBox(sessionId, lastLine);
              }
            } else if (event.type === 'error') {
              buffer += event.data;
              outputConsole.textContent = buffer;
            } else if (event.type === 'exit') {
              activeInteractiveSessionId = null;
              outputConsole.textContent += `\n\n✓ 프로세스 종료 (코드: ${event.code})`;
              updateStatus('done');
              closeInteractiveSession(sessionId);
              return;
            } else if (event.type === 'timeout') {
              activeInteractiveSessionId = null;
              outputConsole.textContent += `\n\n⏱️ 타임아웃`;
              updateStatus('error', '타임아웃');
              closeInteractiveSession(sessionId);
              return;
            }
          } catch (e) {
            // Ignore malformed event chunks; the stream continues.
          }
        }
      }
    } catch (error) {
      activeInteractiveSessionId = null;
      updateStatus('error', '실행 실패');
      outputConsole.textContent = `실행 실패\n\n${error.message}`;
      console.error('[Interactive Error]', error);
    }
  }

  async function sendInteractiveInput(sessionId, value) {
    const runtimeConfig = getRuntimeConfig();
    const apiBase = String(runtimeConfig.endpoint || "")
      .replace(/\/api\/v2\/piston\/execute\/?$/i, "")
      .replace(/\/$/, "");
    return fetch(`${apiBase}/api/send-stdin/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: value }),
    });
  }

  function showInteractiveInputBox(sessionId, promptText) {
    // Remove old input box if exists
    let oldBox = document.getElementById('interactiveInputBox');
    if (oldBox) oldBox.remove();

    const inputBox = document.createElement('div');
    inputBox.id = 'interactiveInputBox';
    inputBox.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: white;
      border: 3px solid #4CAF50;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      z-index: 10000;
      min-width: 350px;
      font-family: monospace;
    `;

    inputBox.innerHTML = `
      <div style="margin-bottom: 10px; font-weight: bold; color: #333;">
        📝 ${promptText || '입력을 입력하세요'}
      </div>
      <input type="text" id="interactiveUserInput" placeholder="입력 (Enter 또는 버튼 클릭)" 
        style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; margin-bottom: 10px; font-size: 14px;">
      <div style="display: flex; gap: 10px;">
        <button id="interactiveSendBtn" style="flex: 1; padding: 10px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
          ✓ 전송
        </button>
        <button id="interactiveKillBtn" style="flex: 0.3; padding: 10px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
          ✕
        </button>
      </div>
    `;
    document.body.appendChild(inputBox);

    const userInput = document.getElementById('interactiveUserInput');
    const sendBtn = document.getElementById('interactiveSendBtn');
    const killBtn = document.getElementById('interactiveKillBtn');

    userInput.focus();
    userInput.select();

    const sendInput = async () => {
      const value = userInput.value;
      inputBox.style.display = 'none';

      try {
        await sendInteractiveInput(sessionId, value);
        // Input sent, waiting for next prompt
        interactiveWaitingForInput = false; // Will be set to true again if there's another prompt
      } catch (error) {
        console.error('[Send Input Error]', error);
        outputConsole.textContent += `\n\n[에러] 입력 전송 실패: ${error.message}`;
      }
    };

    userInput.onkeypress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendInput();
      }
    };

    sendBtn.onclick = sendInput;
    killBtn.onclick = () => {
      closeInteractiveSession(sessionId);
      inputBox.remove();
    };
  }

  function closeInteractiveSession(sessionId) {
    if (!sessionId) return;
    if (activeInteractiveSessionId === sessionId) {
      activeInteractiveSessionId = null;
    }
    interactiveWaitingForInput = false;
    const runtimeConfig = getRuntimeConfig();
    const apiBase = String(runtimeConfig.endpoint || "")
      .replace(/\/api\/v2\/piston\/execute\/?$/i, "")
      .replace(/\/$/, "");
    fetch(`${apiBase}/api/kill-session/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).catch(e => console.log('Session cleanup:', e));

    const box = document.getElementById('interactiveInputBox');
    if (box) box.remove();
  }

  function isCompiledLanguage(languageKey) {
    const compiledLanguages = ['c', 'cpp', 'java', 'csharp', 'go', 'rust', 'fortran', 'zig', 'asm', 'asm-x64', 'asm-nasm'];
    return compiledLanguages.includes(languageKey);
  }

  function startCompileProgressSimulation() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 95) progress = 95;
      updateStatus('compiling', '컴파일 중...', Math.round(progress));
    }, 250);
    return interval;
  }

  function stopCompileProgress(intervalId) {
    if (intervalId) clearInterval(intervalId);
  }

  function mergeExecutionOutputs(compileOutput, runOutput) {
    const compileText = String(compileOutput || "").trim();
    const runText = String(runOutput || "").trim();

    if (!compileText && !runText) {
      return "";
    }
    if (!compileText) {
      return runText;
    }
    if (!runText) {
      return compileText;
    }

    // Some runtimes mirror the same diagnostic in both compile/output channels.
    if (compileText === runText) {
      return compileText;
    }
    if (compileText.includes(runText)) {
      return compileText;
    }
    if (runText.includes(compileText)) {
      return runText;
    }

    return `${compileText}\n\n${runText}`;
  }

  function normalizeStdinText(value) {
    const raw = String(value || "");
    if (!raw) {
      return "";
    }

    // Allow users to type escaped sequences like "10\\n20" in the stdin box.
    return raw
      .replace(/\\r\\n/g, "\n")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t");
  }

  function extractFirstFencedCodeBlock(text) {
    const raw = String(text || "");
    const match = raw.match(/```[a-zA-Z0-9_-]*\s*\n([\s\S]*?)```/);
    if (!match) {
      return raw;
    }
    return String(match[1] || "");
  }

  function autoIndentPythonCode(rawCode) {
    const lines = String(rawCode || "").replace(/\r\n/g, "\n").split("\n");
    const openerPattern = /:\s*(#.*)?$/;
    const topLevelStartPattern = /^(def\s+|class\s+|@|from\s+\w+\s+import\s+|import\s+|app\.run\s*\(|if\s+__name__\s*==)/;
    const dedentKeywordPattern = /^(elif\b|else\s*:|except\b|finally\s*:)/;

    for (let i = 0; i < lines.length - 1; i += 1) {
      const current = lines[i].trim();
      if (!current || !openerPattern.test(current)) {
        continue;
      }

      let j = i + 1;
      let indentedAnyLine = false;
      while (j < lines.length) {
        const line = lines[j];
        const trimmed = line.trim();
        const lineIndent = (line.match(/^\s*/) || [""])[0].length;
        const openerIndent = (lines[i].match(/^\s*/) || [""])[0].length;

        if (!trimmed) {
          if (indentedAnyLine) {
            break;
          }
          j += 1;
          continue;
        }
        if (topLevelStartPattern.test(trimmed) && lineIndent <= openerIndent) {
          break;
        }
        if (dedentKeywordPattern.test(trimmed) && lineIndent <= openerIndent) {
          break;
        }

        if (lineIndent <= openerIndent) {
          lines[j] = `${" ".repeat(openerIndent + 4)}${trimmed}`;
          indentedAnyLine = true;
          j += 1;
          continue;
        }

        indentedAnyLine = true;
        break;
      }
    }

    return lines.join("\n");
  }

  function restorePythonLineBreaks(rawCode) {
    const source = String(rawCode || "").replace(/\r\n/g, "\n").trim();
    if (!source) {
      return source;
    }

    const newlineCount = (source.match(/\n/g) || []).length;
    const longestLine = source.split("\n").reduce((max, line) => Math.max(max, line.length), 0);
    if (newlineCount >= 4 && longestLine < 180) {
      return source;
    }

    let rebuilt = source.replace(/\s+/g, " ").trim();

    // Reflow common Python statement boundaries from one-line AI outputs.
    rebuilt = rebuilt
      .replace(/;\s*/g, "\n")
      .replace(/\)\s+(?=[A-Za-z_][\w.]*\s*=)/g, ")\n")
      .replace(/\)\s+(?=(Entity|Sky|AmbientLight|DirectionalLight|FirstPersonController|app\.run)\b)/g, ")\n")
      .replace(/:\s+(?=[A-Za-z_#])/g, ":\n")
      .replace(/\s+(?=(from\s+\w+\s+import\s+|import\s+\w+|class\s+\w+|def\s+\w+|for\s+\w+|while\s+\w+|if\s+|elif\s+|else:|try:|except\s+|finally:|with\s+|return\b|pass\b|break\b|continue\b))/g, "\n");

    const lines = rebuilt
      .split("\n")
      .map((line) => line.trimEnd())
      .filter((line, index, arr) => !(line === "" && arr[index - 1] === ""));

    return lines.join("\n");
  }

  function cleanAiGeneratedCode(languageKey, rawCode) {
    let cleaned = extractFirstFencedCodeBlock(rawCode).replace(/\r\n/g, "\n").trim();
    if (!cleaned) {
      return "";
    }

    const genericNoise = /^(here is|sure|아래는|다음은|설명|note:|주의:|compile with|컴파일 with)/i;
    const lines = cleaned.split("\n");
    while (lines.length && genericNoise.test(lines[0].trim())) {
      lines.shift();
    }
    cleaned = lines.join("\n").trim();

    if (languageKey === "asm" || languageKey === "asm-x64" || languageKey === "asm-nasm") {
      const commentPrefix = languageKey === "asm-nasm" ? ";" : "#";
      const knownRegisters = new Set([
        "rax", "rbx", "rcx", "rdx", "rsi", "rdi", "rsp", "rbp",
        "r8", "r9", "r10", "r11", "r12", "r13", "r14", "r15",
        "eax", "ebx", "ecx", "edx", "esi", "edi", "esp", "ebp",
        "ax", "bx", "cx", "dx", "si", "di", "sp", "bp",
      ]);
      const asmDirectives = /^(\.\w+|section\b|global\b|extern\b|default\b|bits\b|org\b|use16\b|use32\b|use64\b|main\b|[A-Za-z_.$?][\w.$?@]*:)/i;
      const asmInstructions = /^(mov|lea|add|sub|xor|call|ret|push|pop|int|cmp|jmp|je|jne|jz|jnz|test|inc|dec|and|or|mul|imul|div|idiv|nop)\b/i;

      const fixedLines = cleaned.split("\n").map((line) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return line;
        }
        if (trimmed.startsWith(commentPrefix) || trimmed.startsWith(";") || trimmed.startsWith("#")) {
          return line;
        }
        if (asmDirectives.test(trimmed) || asmInstructions.test(trimmed)) {
          return line;
        }
        return `${commentPrefix} ${trimmed}`;
      });

      cleaned = fixedLines.join("\n");

      if (languageKey === "asm-nasm") {
        cleaned = cleaned.replace(/\[\s*(?!rel\b)([A-Za-z_][\w.$]*)\s*\]/g, (full, symbol) => {
          const lower = String(symbol || "").toLowerCase();
          if (knownRegisters.has(lower)) {
            return full;
          }
          return `[rel ${symbol}]`;
        });
      }
    }

    if (languageKey === "python" || languageKey === "py") {
      cleaned = restorePythonLineBreaks(cleaned);
      cleaned = autoIndentPythonCode(cleaned);
    } else {
      cleaned = autoIndentCodeForLanguage(languageKey, cleaned);
    }

    if (!cleaned.endsWith("\n")) {
      cleaned += "\n";
    }
    return cleaned;
  }

  async function runCurrentCode() {

    const languageKey = languageSelect.value;
    const code = codeEditor.value;
    const sample = languageSamples[languageKey];

    if (!canRunNow()) {
      updateStatus('error', '요청 너무 빠름');
      outputConsole.textContent = "1초 동안 실행 요청은 최대 60회까지만 허용됩니다. 잠시 후 다시 실행해 주세요. (stdin 입력 문제는 아닙니다)";
      return;
    }

    if (sample.mode === "preview") {
      previewFrame.srcdoc = buildPreviewDocument(languageKey, code);
      outputConsole.textContent = `${sample.label} 미리보기를 아래 프레임에 렌더링했습니다.`;
      updateStatus('done');
      return;
    }

    if (sample.mode === "circuit") {
      loadCircuitForLanguage(languageKey);
    }

    if (!sample.runner) {
      outputConsole.textContent = "현재 언어는 클라우드 런타임이 준비되지 않았습니다.";
      updateStatus('error', '런타임 준비 안됨');
      return;
    }

    const isCompiled = isCompiledLanguage(languageKey);
    updateStatus('compiling', '컴파일 준비중...');
    let compileProgressInterval = null;
    
    if (isCompiled) {
      compileProgressInterval = startCompileProgressSimulation();
    }
    
    try {
      const providedStdin = normalizeStdinText(stdinInput?.value || "");
      if (stdinInput && stdinInput.value !== providedStdin) {
        stdinInput.value = providedStdin;
      }
      let result = await executeRemote(sample.runner, code, providedStdin);
      
      if (isCompiled && compileProgressInterval) {
        stopCompileProgress(compileProgressInterval);
        updateStatus('compiling', '컴파일 중...', 100);
      }
      let compileOutput = result.compile?.output || "";
      let runOutput = result.run?.stdout || result.run?.output || "";
      let merged = mergeExecutionOutputs(compileOutput, runOutput);

      if (/EOF when reading a line/i.test(merged) && !providedStdin.trim()) {
        const inferredStdin = buildAutoStdinFromOutput(merged);
        if (stdinInput) {
          stdinInput.value = inferredStdin;
        }
        result = await executeRemote(sample.runner, code, inferredStdin);
        compileOutput = result.compile?.output || "";
        runOutput = result.run?.stdout || result.run?.output || "";
        merged =
          `[auto-stdin] ${inferredStdin.split("\n").join(", ")}\n\n` +
          mergeExecutionOutputs(compileOutput, runOutput);
      }

      // Add meta warnings
      const meta = result.meta || {};
      const warnings = [];
      if (meta.guiWarning) {
        warnings.push(meta.guiWarning);
      }
      if (meta.inputWarning) {
        warnings.push(meta.inputWarning);
      }
      if (/EOF when reading a line/i.test(merged)) {
        warnings.push("[힌트] input()/scanf/Scanner 입력이 필요합니다. 우측 '표준 입력(stdin)' 박스에 값을 넣고 다시 실행하세요.");
      }

      const warningText = warnings.length > 0 ? "\n\n" + warnings.join("\n\n") : "";
      outputConsole.textContent = (merged || "실행 결과가 비어 있습니다.") + warningText;
      updateStatus('done');
    } catch (error) {
      stopCompileProgress(compileProgressInterval);
      updateStatus('error', '실행 실패');
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

  function appendTerminalLine(text) {
    if (!terminalConsole) {
      return;
    }
    const next = terminalConsole.textContent ? `${terminalConsole.textContent}\n${text}` : text;
    terminalConsole.textContent = next;
    terminalConsole.scrollTop = terminalConsole.scrollHeight;
  }

  async function checkEndpoint(url) {
    try {
      await fetch(url, { method: "GET" });
      return true;
    } catch {
      return false;
    }
  }

  async function printTerminalStatus() {
    const runtimeConfig = getRuntimeConfig();
    const aiConfig = getAiConfig();
    appendTerminalLine(`runtime endpoint: ${runtimeConfig.endpoint}`);
    appendTerminalLine(`ai provider: ${aiConfig.provider}`);
    appendTerminalLine(`ai endpoint: ${aiConfig.endpoint}`);

    const runtimeUp = await checkEndpoint(runtimeConfig.endpoint.replace(/\/api\/v2\/piston\/execute$/, ""));
    appendTerminalLine(`runtime service: ${runtimeUp ? "online" : "offline"}`);
  }

  function printTerminalHelp() {
    appendTerminalLine("commands:");
    appendTerminalLine("- help: show command list");
    appendTerminalLine("- clear: clear terminal output");
    appendTerminalLine("- status: check runtime/ai service status");
    appendTerminalLine("- runtimes: show supported languages");
    appendTerminalLine("- run: run current editor code");
    appendTerminalLine("- save: save current project");
    appendTerminalLine("- list: list saved projects");
    appendTerminalLine("- load <project-name>: load saved project");
    appendTerminalLine("- use <language-key>: switch language sample");
    appendTerminalLine("- endpoint <url>: update runtime endpoint");
    appendTerminalLine("- ai <prompt>: ask AI idea helper directly");
  }

  async function handleTerminalCommand(raw) {
    const input = String(raw || "").trim();
    if (!input) {
      return;
    }

    appendTerminalLine(`> ${input}`);
    const [cmd, ...rest] = input.split(" ");
    const arg = rest.join(" ").trim();

    if (cmd === "help") {
      printTerminalHelp();
      return;
    }

    if (cmd === "clear") {
      if (terminalConsole) {
        terminalConsole.textContent = "vpr-terminal ready\ntype: help";
      }
      return;
    }

    if (cmd === "status") {
      await printTerminalStatus();
      return;
    }

    if (cmd === "runtimes") {
      appendTerminalLine(`supported: ${Object.keys(languageSamples).join(", ")}`);
      return;
    }

    if (cmd === "run") {
      await runCurrentCode();
      appendTerminalLine("run requested");
      return;
    }

    if (cmd === "save") {
      saveProject();
      appendTerminalLine("project saved");
      return;
    }

    if (cmd === "list") {
      const projects = getProjects().sort((a, b) => b.updatedAt - a.updatedAt);
      if (!projects.length) {
        appendTerminalLine("no saved projects");
        return;
      }
      projects.forEach((project) => {
        appendTerminalLine(`- ${project.name} (${project.language})`);
      });
      return;
    }

    if (cmd === "load") {
      if (!arg) {
        appendTerminalLine("usage: load <project-name>");
        return;
      }
      loadProjectByName(arg);
      appendTerminalLine(`load requested: ${arg}`);
      return;
    }

    if (cmd === "use") {
      if (!arg || !languageSamples[arg]) {
        appendTerminalLine("usage: use <language-key>");
        return;
      }
      languageSelect.value = arg;
      loadSample(arg, true);
      appendTerminalLine(`language switched: ${arg}`);
      return;
    }

    if (cmd === "endpoint") {
      if (!arg || !/^https?:\/\//i.test(arg)) {
        appendTerminalLine("usage: endpoint <http(s)://...>");
        return;
      }
      const current = getRuntimeConfig();
      setRuntimeConfig({ endpoint: arg, headers: current.headers || {} });
      fillRuntimeConfigForm();
      appendTerminalLine(`runtime endpoint updated: ${arg}`);
      return;
    }

    if (cmd === "ai") {
      if (!arg) {
        appendTerminalLine("usage: ai <prompt>");
        return;
      }
      appendTerminalLine("ai request in progress...");
      try {
        const result = await requestAi("idea", { prompt: arg });
        appendTerminalLine(result.slice(0, 500));
      } catch (error) {
        appendTerminalLine(`ai error: ${error.message}`);
      }
      return;
    }

    // Fallback: execute real local shell command through backend
    appendTerminalLine("shell command executing...");
    try {
      const terminalBase = _isLocalDev ? "http://127.0.0.1:3000" : window.location.origin;
      const response = await fetch(`${terminalBase}/api/terminal/exec`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          command: input,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        appendTerminalLine(`shell error: ${data.message || `request failed (${response.status})`}`);
        return;
      }

      if (data.stdout) {
        appendTerminalLine(String(data.stdout).trimEnd());
      }
      if (data.stderr) {
        appendTerminalLine(String(data.stderr).trimEnd());
      }
      appendTerminalLine(`exit code: ${data.code}`);
    } catch (error) {
      appendTerminalLine(`shell error: ${error.message}`);
    }
  }

  populateLanguageSelect(languageSelect);
  renderProjectList();
  fillRuntimeConfigForm();
  loadSample("javascript", true);

  if (terminalConsole) {
    terminalConsole.textContent = "vpr-terminal ready\ntype: help";
  }

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
  
  const interactiveRunButton = document.getElementById("interactiveRunButton");
  if (interactiveRunButton) {
    interactiveRunButton.addEventListener("click", runCurrentCodeInteractive);
  }
  
  saveButton.addEventListener("click", saveProject);
  newProjectButton.addEventListener("click", () => loadSample(languageSelect.value, true));
  downloadButton.addEventListener("click", downloadCurrentProject);
  copyAllCodeButton?.addEventListener("click", async () => {
    const text = String(codeEditor.value || "");
    if (!text.trim()) {
      updateStatus('error', '복사할 코드 없음');
      outputConsole.textContent = "복사할 코드가 없습니다.";
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      updateStatus('done', '코드 복사 완료');
      outputConsole.textContent = "코드 전체를 클립보드에 복사했습니다.";
    } catch {
      codeEditor.focus();
      codeEditor.select();
      const copied = document.execCommand("copy");
      codeEditor.setSelectionRange(codeEditor.value.length, codeEditor.value.length);
      if (copied) {
        updateStatus('done', '코드 복사 완료');
        outputConsole.textContent = "코드 전체를 클립보드에 복사했습니다.";
      } else {
        updateStatus('error', '복사 실패');
        outputConsole.textContent = "클립보드 복사에 실패했습니다. Ctrl+C로 복사해 주세요.";
      }
    }
  });
  fixAiCodeButton?.addEventListener("click", () => {
    const languageKey = languageSelect.value;
    const currentCode = String(codeEditor.value || "");
    const fixedCode = cleanAiGeneratedCode(languageKey, currentCode);

    if (!fixedCode || fixedCode === currentCode) {
      updateStatus('ready', '변경 없음');
      outputConsole.textContent = "정리할 AI 코드 패턴을 찾지 못했습니다.";
      return;
    }

    codeEditor.value = fixedCode;
    updateLineNumbers();
    updateStatus('done', 'AI 코드 정리 완료');
    outputConsole.textContent = "AI가 섞어 넣은 설명문/코드펜스를 정리했습니다. 바로 실행해 보세요.";
  });
  
  // Keyboard shortcut: Ctrl+Enter for interactive, Shift+Enter for batch
  codeEditor.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();
      runCurrentCodeInteractive();
    }
  });

  terminalRunButton?.addEventListener("click", async () => {
    const command = terminalInput?.value || "";
    if (terminalInput) {
      terminalInput.value = "";
    }
    await handleTerminalCommand(command);
  });

  terminalInput?.addEventListener("keydown", async (event) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    const command = terminalInput.value;
    terminalInput.value = "";
    await handleTerminalCommand(command);
  });

  stdinInput?.addEventListener("keydown", async (event) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }
    if (!activeInteractiveSessionId) {
      return;
    }

    event.preventDefault();
    const value = (stdinInput.value || "").trim();
    if (!value) {
      return;
    }

    try {
      await sendInteractiveInput(activeInteractiveSessionId, value);
      stdinInput.value = "";
    } catch (error) {
      outputConsole.textContent += `\n\n[에러] 입력 전송 실패: ${error.message}`;
    }
  });

  terminalClearButton?.addEventListener("click", () => {
    if (terminalConsole) {
      terminalConsole.textContent = "vpr-terminal ready\ntype: help";
    }
  });

  terminalStatusButton?.addEventListener("click", async () => {
    await handleTerminalCommand("status");
  });

  terminalRuntimesButton?.addEventListener("click", async () => {
    await handleTerminalCommand("runtimes");
  });

  terminalRunCodeButton?.addEventListener("click", async () => {
    await handleTerminalCommand("run");
  });

  terminalAiPingButton?.addEventListener("click", async () => {
    await handleTerminalCommand("ai hello");
  });

  fileMenuButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleWindowMenu(fileMenuDropdown);
  });

  editMenuButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleWindowMenu(editMenuDropdown);
  });

  helpMenuButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleWindowMenu(helpMenuDropdown);
  });

  menuSaveButton?.addEventListener("click", () => {
    saveProject();
    hideAllWindowMenus();
  });

  menuSaveAsButton?.addEventListener("click", () => {
    saveProjectAs();
    hideAllWindowMenus();
  });

  menuDeleteProjectButton?.addEventListener("click", () => {
    deleteCurrentProject();
    hideAllWindowMenus();
  });

  menuFindButton?.addEventListener("click", () => {
    findInEditor();
    hideAllWindowMenus();
  });

  menuUndoButton?.addEventListener("click", () => {
    codeEditor.focus();
    document.execCommand("undo");
    hideAllWindowMenus();
  });

  menuRedoButton?.addEventListener("click", () => {
    codeEditor.focus();
    document.execCommand("redo");
    hideAllWindowMenus();
  });

  menuRunAgainButton?.addEventListener("click", async () => {
    await runCurrentCode();
    hideAllWindowMenus();
  });

  menuRunAgainInteractiveButton?.addEventListener("click", async () => {
    await runCurrentCodeInteractive();
    hideAllWindowMenus();
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".window-menu")) {
      return;
    }
    hideAllWindowMenus();
  });

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
      updateStatus('done', '저장 완료');
      outputConsole.textContent = "런타임 설정이 저장되었습니다. 다시 실행해 보세요.";
    } catch (error) {
      updateStatus('error', '설정 오류');
      outputConsole.textContent = `런타임 설정 오류\n\n${error.message}`;
    }
  });

  resetRuntimeConfigButton?.addEventListener("click", () => {
    setRuntimeConfig({ endpoint: defaultRuntimeEndpoint, headers: {} });
    fillRuntimeConfigForm();
    updateStatus('ready');
    outputConsole.textContent = "런타임 설정이 기본값으로 초기화되었습니다.";
  });

  applyCircuitNodeButton?.addEventListener("click", () => {
    const node = getNodeById(selectedNodeId);
    if (!node || !circuitWorkspace) {
      setCircuitStatus("먼저 편집할 부품을 선택하세요.");
      return;
    }
    const maxX = Math.max(0, circuitWorkspace.clientWidth - CIRCUIT_NODE_WIDTH);
    const maxY = Math.max(0, circuitWorkspace.clientHeight - CIRCUIT_NODE_HEIGHT);
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
    const maxX = Math.max(0, circuitWorkspace.clientWidth - CIRCUIT_NODE_WIDTH);
    const maxY = Math.max(0, circuitWorkspace.clientHeight - CIRCUIT_NODE_HEIGHT);
    const selectedType = circuitComponentType?.value || "resistor";

    let type = "resistor";
    let variant = undefined;
    let name = `Component ${nextIndex}`;
    let pin = "PIN";

    if (selectedType.startsWith("arduino") || selectedType.startsWith("esp")) {
      type = "mcu";
      variant = selectedType;
      name = componentTypes.arduinoBoards[selectedType] || componentTypes.espBoards[selectedType] || selectedType;
      pin = selectedType.startsWith("arduino") ? "5V/GND" : "3V3/GND";
    } else if (selectedType.startsWith("led")) {
      type = "led";
      variant = selectedType;
      name = componentTypes.ledColors[selectedType] || "LED";
      pin = "SIG";
    } else if (selectedType.includes("oled") || selectedType.includes("tft") || selectedType.includes("lcd")) {
      type = "display";
      variant = selectedType;
      name = componentTypes.displays[selectedType] || "Display";
      pin = "I2C/SPI";
    } else if (selectedType === "button") {
      type = "button";
      name = "Push Button";
      pin = "SIG";
    } else if (selectedType.includes("motor") || selectedType.includes("servo") || selectedType.includes("stepper")) {
      type = "motor";
      variant = selectedType;
      name = selectedType.includes("servo") ? "Servo Motor" : selectedType.includes("stepper") ? "Stepper Motor" : "DC Motor";
      pin = "PWM";
    } else if (selectedType.includes("sensor") || ["pir", "temp", "ldr", "gsm", "wifi", "bluetooth", "gps", "lorawan"].some((k) => selectedType.includes(k))) {
      type = "sensor";
      variant = selectedType;
      name = selectedType.toUpperCase();
      pin = "VCC/SIG/GND";
    } else if (selectedType === "breadboard") {
      type = "breadboard";
      name = "Breadboard";
      pin = "+ / -";
    } else if (selectedType === "resistor" || selectedType === "capacitor" || selectedType === "inductor") {
      type = selectedType === "resistor" ? "resistor" : "module";
      variant = selectedType;
      name = selectedType[0].toUpperCase() + selectedType.slice(1);
      pin = selectedType === "resistor" ? "220R" : "PIN";
    }

    const node = {
      id: `node-${Date.now()}`,
      type,
      variant,
      name,
      pin,
      x: clamp(40 + nextIndex * 24, 0, maxX),
      y: clamp(36 + nextIndex * 16, 0, maxY),
      state: {},
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
    if (!circuitModel) {
      setCircuitStatus("먼저 회로 언어(Arduino/ESP-IDF)를 선택하세요.");
      return;
    }
    connectFromNodeId = null;
    pendingPinLink = null;
    renderCircuitEditor();
    setCircuitStatus("핀 클릭 모드: 예) UNO의 5V 클릭 -> 모듈의 5V 클릭");
  });

  resetCircuitButton?.addEventListener("click", () => {
    if (!isCircuitLanguage(languageSelect.value)) {
      return;
    }
    loadCircuitForLanguage(languageSelect.value, true);
  });

  circuitTargetMcu?.addEventListener("change", (event) => {
    selectedTargetMcu = event.target.value || null;
    persistCircuitMcuSelection();
    const mcuNodes = extractCircuitMcuNodes();
    const selLabel = circuitTargetMcu.value ? 
      circuitTargetMcu.options[circuitTargetMcu.selectedIndex]?.textContent : 
      "미선택";
    setCircuitStatus(
      mcuNodes.length > 0 ?
      `회로에 ${mcuNodes.length}개 MCU 감지. 코드 배포 대상: ${selLabel}` :
      "회로에 MCU가 없습니다."
    );
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
      const fromNode = getNodeById(connectFromNodeId);
      const toNode = getNodeById(nodeId);
      const exists = circuitModel.wires.some(
        (wire) => (wire.from === connectFromNodeId && wire.to === nodeId) || (wire.from === nodeId && wire.to === connectFromNodeId)
      );
      if (!exists && fromNode && toNode) {
        const pair = pickNearestPinPair(fromNode, toNode);
        circuitModel.wires.push({ from: connectFromNodeId, to: nodeId, fromPin: pair.fromPin.key, toPin: pair.toPin.key });
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
    const scrollLeft = circuitWorkspaceScroll?.scrollLeft || 0;
    const scrollTop = circuitWorkspaceScroll?.scrollTop || 0;
    dragState = {
      nodeId,
      offsetX: event.clientX - workspaceRect.left + scrollLeft - node.x,
      offsetY: event.clientY - workspaceRect.top + scrollTop - node.y,
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
    const scrollLeft = circuitWorkspaceScroll?.scrollLeft || 0;
    const scrollTop = circuitWorkspaceScroll?.scrollTop || 0;
    const maxX = Math.max(0, circuitWorkspace.clientWidth - CIRCUIT_NODE_WIDTH);
    const maxY = Math.max(0, circuitWorkspace.clientHeight - CIRCUIT_NODE_HEIGHT);
    node.x = clamp(event.clientX - workspaceRect.left + scrollLeft - dragState.offsetX, 0, maxX);
    node.y = clamp(event.clientY - workspaceRect.top + scrollTop - dragState.offsetY, 0, maxY);
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
  const aiModelSelect = document.getElementById("aiModelSelect");
  const aiApiKeyInput = document.getElementById("aiApiKeyInput");
  const aiSaveButton = document.getElementById("aiSaveButton");
  const aiTestButton = document.getElementById("aiTestButton");
  const aiModelAuditButton = document.getElementById("aiModelAuditButton");
  const aiConfigStatus = document.getElementById("aiConfigStatus");
  const chatRoomSelect = document.getElementById("chatRoomSelect");
  const chatRoomNameInput = document.getElementById("chatRoomNameInput");
  const chatRoomCreateButton = document.getElementById("chatRoomCreateButton");
  const chatRoomDeleteButton = document.getElementById("chatRoomDeleteButton");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const chatSendButton = document.getElementById("chatSendButton");

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
    !aiModelSelect ||
    !aiApiKeyInput ||
    !aiSaveButton ||
    !aiTestButton ||
    !aiModelAuditButton ||
    !aiConfigStatus ||
    !chatRoomSelect ||
    !chatRoomNameInput ||
    !chatRoomCreateButton ||
    !chatRoomDeleteButton ||
    !chatMessages ||
    !chatInput ||
    !chatSendButton
  ) {
    return;
  }

  function renderAiModelOptions(items, selectedValue) {
    const selected = String(selectedValue || "").trim();
    aiModelSelect.innerHTML = "";
    for (const item of items) {
      const option = document.createElement("option");
      option.value = item.value;
      option.textContent = item.name;
      if (item.value === selected) {
        option.selected = true;
      }
      aiModelSelect.appendChild(option);
    }
    if (!aiModelSelect.value && items.length) {
      aiModelSelect.value = items[0].value;
    }
  }

  function getStoredChatRooms() {
    try {
      const parsed = JSON.parse(localStorage.getItem(aiChatRoomsKey) || "[]");
      if (!Array.isArray(parsed) || !parsed.length) {
        return [{ id: `room-${Date.now()}`, name: "General", messages: [] }];
      }
      return parsed
        .filter((room) => room && room.id && room.name)
        .map((room) => ({
          id: String(room.id),
          name: String(room.name),
          messages: Array.isArray(room.messages)
            ? room.messages
                .filter((msg) => msg && msg.role && typeof msg.text === "string")
                .map((msg) => ({ role: msg.role, text: msg.text, at: Number(msg.at || Date.now()) }))
            : [],
        }));
    } catch {
      return [{ id: `room-${Date.now()}`, name: "General", messages: [] }];
    }
  }

  function saveChatRooms(rooms) {
    localStorage.setItem(aiChatRoomsKey, JSON.stringify(rooms));
  }

  function getActiveChatRoomId(rooms) {
    const savedId = String(localStorage.getItem(aiActiveChatRoomKey) || "").trim();
    if (savedId && rooms.some((room) => room.id === savedId)) {
      return savedId;
    }
    return rooms[0]?.id || "";
  }

  function setActiveChatRoomId(roomId) {
    localStorage.setItem(aiActiveChatRoomKey, String(roomId || ""));
  }

  function renderChatRoomOptions(rooms, activeId) {
    chatRoomSelect.innerHTML = "";
    for (const room of rooms) {
      const option = document.createElement("option");
      option.value = room.id;
      option.textContent = room.name;
      if (room.id === activeId) {
        option.selected = true;
      }
      chatRoomSelect.appendChild(option);
    }
    if (!chatRoomSelect.value && rooms.length) {
      chatRoomSelect.value = rooms[0].id;
    }
  }

  function autoIndentPythonForChat(rawCode) {
    const lines = String(rawCode || "").replace(/\r\n/g, "\n").split("\n");
    const openerPattern = /:\s*(#.*)?$/;
    const topLevelStartPattern = /^(def\s+|class\s+|@|from\s+\w+\s+import\s+|import\s+|app\.run\s*\(|if\s+__name__\s*==)/;
    const dedentKeywordPattern = /^(elif\b|else\s*:|except\b|finally\s*:)/;

    for (let i = 0; i < lines.length - 1; i += 1) {
      const current = lines[i].trim();
      if (!current || !openerPattern.test(current)) {
        continue;
      }

      let j = i + 1;
      let indentedAnyLine = false;
      while (j < lines.length) {
        const line = lines[j];
        const trimmed = line.trim();
        const lineIndent = (line.match(/^\s*/) || [""])[0].length;
        const openerIndent = (lines[i].match(/^\s*/) || [""])[0].length;

        if (!trimmed) {
          if (indentedAnyLine) {
            break;
          }
          j += 1;
          continue;
        }
        if (topLevelStartPattern.test(trimmed) && lineIndent <= openerIndent) {
          break;
        }
        if (dedentKeywordPattern.test(trimmed) && lineIndent <= openerIndent) {
          break;
        }

        if (lineIndent <= openerIndent) {
          lines[j] = `${" ".repeat(openerIndent + 4)}${trimmed}`;
          indentedAnyLine = true;
          j += 1;
          continue;
        }

        indentedAnyLine = true;
        break;
      }
    }

    return lines.join("\n");
  }

  function restorePythonLineBreaksForChat(rawCode) {
    const source = String(rawCode || "").replace(/\r\n/g, "\n").trim();
    if (!source) {
      return source;
    }

    const newlineCount = (source.match(/\n/g) || []).length;
    const longestLine = source.split("\n").reduce((max, line) => Math.max(max, line.length), 0);
    if (newlineCount >= 4 && longestLine < 180) {
      return source;
    }

    let rebuilt = source.replace(/\s+/g, " ").trim();
    rebuilt = rebuilt
      .replace(/;\s*/g, "\n")
      .replace(/\)\s+(?=[A-Za-z_][\w.]*\s*=)/g, ")\n")
      .replace(/\)\s+(?=(Entity|Sky|AmbientLight|DirectionalLight|FirstPersonController|app\.run)\b)/g, ")\n")
      .replace(/:\s+(?=[A-Za-z_#])/g, ":\n")
      .replace(/\s+(?=(from\s+\w+\s+import\s+|import\s+\w+|class\s+\w+|def\s+\w+|for\s+\w+|while\s+\w+|if\s+|elif\s+|else:|try:|except\s+|finally:|with\s+|return\b|pass\b|break\b|continue\b))/g, "\n");

    const lines = rebuilt
      .split("\n")
      .map((line) => line.trimEnd())
      .filter((line, index, arr) => !(line === "" && arr[index - 1] === ""));

    return lines.join("\n");
  }

  function normalizeChatCodeByLanguage(language, rawCode) {
    const lang = normalizeIndentLanguageKey(language);
    const code = String(rawCode || "").replace(/\r\n/g, "\n").trimEnd();
    if (!code) {
      return code;
    }

    if (lang === "py" || lang === "python") {
      return autoIndentPythonForChat(restorePythonLineBreaksForChat(code));
    }
    return autoIndentCodeForLanguage(lang, code);
  }

  function normalizeChatCodeBlocksInText(text) {
    const content = String(text || "");
    const codeBlockPattern = /```([a-zA-Z0-9_+-]*)\s*([\s\S]*?)```/g;
    return content.replace(codeBlockPattern, (_, language, codeBlock) => {
      const fixed = normalizeChatCodeByLanguage(language, String(codeBlock || "").replace(/^\n/, ""));
      const langTag = String(language || "");
      return "```" + langTag + "\n" + fixed + "\n```";
    });
  }

  async function copyTextToClipboard(text) {
    const value = String(text || "");
    if (!value) {
      return false;
    }
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "readonly");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(textarea);
      return copied;
    }
  }

  function formatChatMessage(text, role) {
    const who = role === "assistant" ? "AI" : "YOU";
    const content = role === "assistant" ? normalizeChatCodeBlocksInText(text) : String(text || "");

    const codeBlockPattern = /```([a-zA-Z0-9_+-]*)([\s\S]*?)```/g;
    const hasCodeBlocks = codeBlockPattern.test(content);
    codeBlockPattern.lastIndex = 0;

    const inlineCodeHint = /\b(from\s+[A-Za-z_][\w.]*\s+import\b|import\s+[A-Za-z_][\w.]*|def\s+\w+\s*(\(|:)|class\s+\w+\s*:|for\s+\w+\s+in\s+|while\s+|if\s+|return\b|Entity\s*\(|FirstPersonController\s*\(|app\.run\s*\()/;
    if (role === "assistant" && !hasCodeBlocks && (looksLikeCodeAnswer(content) || inlineCodeHint.test(content))) {
      const normalized = normalizeChatCodeByLanguage("python", content);
      return `<p><strong>${who}:</strong></p><div class="chat-code-block"><div class="chat-code-toolbar"><button type="button" class="chat-code-copy-btn">이 코드 전체 복사</button></div><pre><code class="hljs language-python">${escapeHtml(normalized)}</code></pre></div>`;
    }

    if (!hasCodeBlocks) {
      return `<p><strong>${who}:</strong> ${escapeHtml(content)}</p>`;
    }

    let html = `<p><strong>${who}:</strong></p>`;
    let lastIndex = 0;
    const matches = [...content.matchAll(codeBlockPattern)];

    for (const match of matches) {
      const beforeText = content.substring(lastIndex, match.index);
      if (beforeText.trim()) {
        html += `<p>${escapeHtml(beforeText.trim())}</p>`;
      }

      const language = match[1] || "plaintext";
      const code = normalizeChatCodeByLanguage(language, String(match[2] || "").replace(/^\n/, ""));
      html += `<div class="chat-code-block"><div class="chat-code-toolbar"><button type="button" class="chat-code-copy-btn">이 코드 전체 복사</button></div><pre><code class="hljs language-${language}">${escapeHtml(code)}</code></pre></div>`;
      lastIndex = match.index + match[0].length;
    }

    const afterText = content.substring(lastIndex);
    if (afterText.trim()) {
      html += `<p>${escapeHtml(afterText.trim())}</p>`;
    }

    return html;
  }

  function renderChatMessages(room) {
    if (!room || !room.messages.length) {
      chatMessages.textContent = "아직 메시지가 없습니다. 첫 질문을 보내보세요.";
      return;
    }
    chatMessages.innerHTML = room.messages
      .map((msg) => {
        try {
          return formatChatMessage(msg.text, msg.role);
        } catch (error) {
          console.error("chat render error:", error);
          const who = msg.role === "assistant" ? "AI" : "YOU";
          return `<p><strong>${who}:</strong> ${escapeHtml(String(msg.text || ""))}</p>`;
        }
      })
      .join("");
    
    setTimeout(() => {
      if (typeof hljs !== "undefined" && window.hljs) {
        chatMessages.querySelectorAll("pre code").forEach((block) => {
          if (!block.classList.contains('hljs-done')) {
            try {
              hljs.highlightElement(block);
              block.classList.add('hljs-done');
            } catch (e) {
              console.log("hljs error:", e.message);
            }
          }
        });
      }

      chatMessages.querySelectorAll(".chat-code-copy-btn").forEach((button) => {
        if (button.dataset.bound === "1") {
          return;
        }
        button.dataset.bound = "1";
        button.addEventListener("click", async () => {
          const codeNode = button.closest(".chat-code-block")?.querySelector("pre code");
          const codeText = String(codeNode?.textContent || "");
          const copied = await copyTextToClipboard(codeText);
          aiConfigStatus.textContent = copied
            ? "코드 전체를 클립보드에 복사했습니다."
            : "클립보드 복사에 실패했습니다. Ctrl+C로 복사해 주세요.";
        });
      });
    }, 50);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  let chatRooms = getStoredChatRooms();
  let activeChatRoomId = getActiveChatRoomId(chatRooms);

  function fillAiConfigForm() {
    const config = getAiConfig();
    renderAiModelOptions(huggingFaceModels, config.model);
    aiProviderSelect.value = config.provider;
    aiApiKeyInput.value = config.apiKey;
    renderChatRoomOptions(chatRooms, activeChatRoomId);
    const activeRoom = chatRooms.find((room) => room.id === activeChatRoomId) || chatRooms[0] || null;
    if (activeRoom) {
      activeChatRoomId = activeRoom.id;
      setActiveChatRoomId(activeChatRoomId);
    }
    renderChatMessages(activeRoom);
  }

  function readAiConfigForm() {
    const provider = "huggingface";
    const endpoint = "https://router.huggingface.co/hf-inference/models";
    const model = String(aiModelSelect.value || "").trim();
    const apiKey = String(aiApiKeyInput.value || "").trim();
    if (!model) {
      throw new Error("모델을 선택해주세요.");
    }
    return { provider, endpoint, model, apiKey };
  }

  function applyPreset(provider) {
    // Only Hugging Face is available now
    // Model selection is handled by aiModelSelect dropdown
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

  aiModelAuditButton.addEventListener("click", async () => {
    aiConfigStatus.textContent = "모델 전체 점검 중... (수십 초 소요)";
    try {
      const config = readAiConfigForm();
      const response = await fetch(defaultAiModelAuditEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: config.endpoint,
          apiKey: config.apiKey,
          models: [...new Set(huggingFaceAuditCandidates)],
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(String(data.message || `모델 점검 실패 (${response.status})`));
      }

      const workingModels = Array.isArray(data.working) ? data.working.map((item) => item.model).filter(Boolean) : [];
      const failedModels = Array.isArray(data.failed) ? data.failed : [];
      if (!workingModels.length) {
        throw new Error("동작하는 모델을 찾지 못했습니다. API Key를 확인하세요.");
      }

      const workingSet = new Set(workingModels);
      const preferred = huggingFaceModels.filter((item) => workingSet.has(item.value));
      const extras = workingModels
        .filter((model) => !preferred.some((item) => item.value === model))
        .map((model) => ({ name: `${model} (auto)`, value: model }));
      const nextModels = [...preferred, ...extras];

      huggingFaceModels.length = 0;
      huggingFaceModels.push(...nextModels);
      renderAiModelOptions(huggingFaceModels, config.model);

      const nextConfig = {
        ...config,
        model: aiModelSelect.value || nextModels[0].value,
      };
      setAiConfig(nextConfig);

      const failedPreview = failedModels.slice(0, 5).map((item) => `${item.model}: ${item.reason || item.status}`).join("\n");
      aiConfigStatus.textContent =
        `점검 완료: 동작 ${workingModels.length}개 / 실패 ${failedModels.length}개\n` +
        `현재 모델: ${nextConfig.model}` +
        (failedPreview ? `\n\n실패 샘플\n${failedPreview}` : "");
    } catch (error) {
      aiConfigStatus.textContent = `모델 점검 실패: ${error.message}`;
    }
  });

  chatRoomSelect.addEventListener("change", () => {
    activeChatRoomId = String(chatRoomSelect.value || "");
    setActiveChatRoomId(activeChatRoomId);
    const activeRoom = chatRooms.find((room) => room.id === activeChatRoomId) || null;
    renderChatMessages(activeRoom);
  });

  chatRoomCreateButton.addEventListener("click", () => {
    const name = String(chatRoomNameInput.value || "").trim();
    if (!name) {
      aiConfigStatus.textContent = "방 이름을 입력해 주세요.";
      return;
    }
    const newRoom = {
      id: `room-${Date.now()}`,
      name,
      messages: [],
    };
    chatRooms.push(newRoom);
    activeChatRoomId = newRoom.id;
    saveChatRooms(chatRooms);
    setActiveChatRoomId(activeChatRoomId);
    renderChatRoomOptions(chatRooms, activeChatRoomId);
    renderChatMessages(newRoom);
    chatRoomNameInput.value = "";
  });

  chatRoomDeleteButton.addEventListener("click", () => {
    if (chatRooms.length <= 1) {
      aiConfigStatus.textContent = "최소 1개의 채팅방은 유지되어야 합니다.";
      return;
    }
    chatRooms = chatRooms.filter((room) => room.id !== activeChatRoomId);
    activeChatRoomId = chatRooms[0].id;
    saveChatRooms(chatRooms);
    setActiveChatRoomId(activeChatRoomId);
    renderChatRoomOptions(chatRooms, activeChatRoomId);
    renderChatMessages(chatRooms[0]);
  });

  chatSendButton.addEventListener("click", async () => {
    const text = String(chatInput.value || "").trim();
    if (!text) {
      return;
    }

    const room = chatRooms.find((item) => item.id === activeChatRoomId);
    if (!room) {
      aiConfigStatus.textContent = "활성 채팅방을 찾을 수 없습니다.";
      return;
    }

    room.messages.push({ role: "user", text, at: Date.now() });
    chatInput.value = "";
    renderChatMessages(room);
    saveChatRooms(chatRooms);

    try {
      const history = room.messages.slice(-12).map((msg) => ({ role: msg.role, text: msg.text }));
      const aiText = await requestAi("chat", { prompt: text, history });
      let safeText = sanitizeAiChatReply(aiText);
      if (looksLikeLowQualityAiReply(safeText)) {
        throw new Error("AI가 유효한 코드를 생성하지 못했습니다. 프롬프트를 더 구체적으로 입력해 주세요.");
      }
      room.messages.push({ role: "assistant", text: aiText, at: Date.now() });
      room.messages[room.messages.length - 1].text = safeText;
      saveChatRooms(chatRooms);
      renderChatMessages(room);
    } catch (error) {
      room.messages.push({ role: "assistant", text: `Error: ${error.message}`, at: Date.now() });
      saveChatRooms(chatRooms);
      renderChatMessages(room);
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
  const errorLanguageSelect = document.getElementById("errorLanguageSelect");
  const errorFileInput = document.getElementById("errorFileInput");
  const errorCodeInput = document.getElementById("errorCodeInput");
  const errorButton = document.getElementById("errorButton");
  const errorResponse = document.getElementById("errorResponse");
  if (!errorInput || !errorLanguageSelect || !errorFileInput || !errorCodeInput || !errorButton || !errorResponse) {
    return;
  }

  const languageOptions = [
    `<option value="auto">자동 감지</option>`,
    ...Object.entries(languageSamples).map(([key, sample]) => `<option value="${key}">${escapeHtml(sample.label)}</option>`),
  ];
  errorLanguageSelect.innerHTML = languageOptions.join("");
  errorLanguageSelect.value = "auto";

  errorResponse.textContent = content[currentLocale].errorEmpty;
  errorButton.addEventListener("click", () => {
    errorResponse.textContent = buildErrorResponse(errorInput.value, {
      language: errorLanguageSelect.value,
      fileName: errorFileInput.value,
      relatedCode: errorCodeInput.value,
    });
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
  const loginSecondPassword = document.getElementById("loginSecondPassword");
  const registerUsername = document.getElementById("registerUsername");
  const registerPassword = document.getElementById("registerPassword");
  const registerSecondPassword = document.getElementById("registerSecondPassword");
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const authStatusBox = document.getElementById("authStatusBox");
  if (
    !loginUsername ||
    !loginPassword ||
    !loginSecondPassword ||
    !registerUsername ||
    !registerPassword ||
    !registerSecondPassword ||
    !loginButton ||
    !registerButton ||
    !authStatusBox
  ) {
    return;
  }

  authStatusBox.textContent = "아이디는 3~20자, 1차/2차 비밀번호는 각각 8자 이상을 사용하세요.";

  registerButton.addEventListener("click", async () => {
    try {
      const username = await registerUserAccount(registerUsername.value, registerPassword.value, registerSecondPassword.value);
      authStatusBox.textContent = `계정 생성 완료: @${username}. 이제 로그인할 수 있습니다.`;
    } catch (error) {
      authStatusBox.textContent = error.message;
    }
  });

  loginButton.addEventListener("click", async () => {
    try {
      const user = await loginUserAccount(loginUsername.value, loginPassword.value, loginSecondPassword.value);
      authStatusBox.textContent = `로그인 성공: @${user.username}. 프로필 페이지로 이동합니다.`;
      setTimeout(() => {
        window.location.href = "profile.html";
      }, 400);
    } catch (error) {
      authStatusBox.textContent = error.message;
    }
  });
}

function initProfilePage() {
  const displayName = document.getElementById("profileDisplayName");
  const bio = document.getElementById("profileBio");
  const favoriteLang = document.getElementById("profileFavoriteLang");
  const saveButton = document.getElementById("saveProfileButton");
  const statusBox = document.getElementById("profileStatusBox");
  const logoutButton = document.getElementById("logoutButton");
  const deleteButton = document.getElementById("deleteAccountButton");
  const deletePassword = document.getElementById("deletePassword");
  const deleteSecondPassword = document.getElementById("deleteSecondPassword");
  const imagePreview = document.getElementById("profileImagePreview");
  const imageFile = document.getElementById("profileImageFile");
  const imageUrl = document.getElementById("profileImageUrl");
  const myPublicList = document.getElementById("myPublicSnippetList");
  if (
    !displayName ||
    !bio ||
    !favoriteLang ||
    !saveButton ||
    !statusBox ||
    !logoutButton ||
    !deleteButton ||
    !deletePassword ||
    !deleteSecondPassword ||
    !imagePreview ||
    !imageFile ||
    !imageUrl ||
    !myPublicList
  ) {
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

  if (!me.profile || typeof me.profile !== "object") {
    me.profile = {};
  }
  if (!me.profile.secondPasswordHash) {
    me.profile.secondPasswordHash = me.passwordHash;
  }

  displayName.value = me.profile.displayName || me.username;
  bio.value = me.profile.bio || "";
  favoriteLang.value = me.profile.favoriteLang || "";
  imagePreview.src = me.profile.imageDataUrl || "https://placehold.co/120x120?text=VPR";
  imageUrl.value = me.profile.imageDataUrl || "";
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
    me.profile.imageDataUrl = imageUrl.value.trim().slice(0, 200000);
    me.profile.secondPasswordHash = me.profile.secondPasswordHash || me.passwordHash;
    setUsers(users);
    imagePreview.src = me.profile.imageDataUrl || "https://placehold.co/120x120?text=VPR";
    statusBox.textContent = "프로필 저장 완료";
  });

  imageFile.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    imageUrl.value = dataUrl;
    imagePreview.src = dataUrl;
    statusBox.textContent = "이미지 미리보기 적용됨. 저장 버튼을 눌러 반영하세요.";
  });

  deleteButton.addEventListener("click", async () => {
    const confirmText = window.prompt("계정 삭제를 진행하려면 DELETE 를 입력하세요.");
    if (confirmText !== "DELETE") {
      statusBox.textContent = "계정 삭제가 취소되었습니다.";
      return;
    }

    try {
      await verifyCurrentUserDualPassword(deletePassword.value, deleteSecondPassword.value);
      deleteAccountCompletely(me.username);
      statusBox.textContent = "계정이 삭제되었습니다.";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 400);
    } catch (error) {
      statusBox.textContent = `계정 삭제 실패: ${error.message}`;
    }
  });

  logoutButton.addEventListener("click", () => {
    setCurrentUser(null);
    window.location.href = "login.html";
  });
}

async function bootstrapApp() {
  applyTheme(getCurrentTheme());
  await hydrateLocalStorageFromSql();
  applyLocaleSelections();
  applyThemeSelections();
  renderAuthShortcut();
  initHomePage();
  initEditorPage();
  initAssistantPage();
  initErrorsPage();
  initCommunityPage();
  initExamplesPage();
  initLoginPage();
  initProfilePage();
  
  // Initialize Highlight.js
  if (typeof hljs !== "undefined") {
    hljs.configure({ ignoreUnescapedHTML: true });
    
    // First, highlight any existing code blocks
    setTimeout(() => {
      document.querySelectorAll("pre code:not(.hljs-done)").forEach((block) => {
        try {
          hljs.highlightElement(block);
          block.classList.add("hljs-done");
        } catch (e) {
          console.log("Initial highlight error:", e);
        }
      });
    }, 100);
    
    // Then set up MutationObserver for dynamically added code blocks
    const observer = new MutationObserver(() => {
      document.querySelectorAll("pre code:not(.hljs-done)").forEach((block) => {
        try {
          hljs.highlightElement(block);
          block.classList.add("hljs-done");
        } catch (e) {
          console.log("Dynamic highlight error:", e);
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

bootstrapApp();
