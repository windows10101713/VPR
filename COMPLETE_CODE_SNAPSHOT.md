# VPR Complete Code Snapshot

## index.html
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VPR | Home</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body data-page="home">
    <div class="app-shell">
      <aside class="sidebar">
        <div>
          <a class="brand brand-link" href="index.html">
            <div class="brand-mark">V</div>
            <div>
              <p class="eyebrow">Virtual Program Runner</p>
              <h1>VPR</h1>
            </div>
          </a>

          <nav class="menu">
            <a class="menu-item is-active" href="index.html"><span>홈</span><small>Home</small></a>
            <a class="menu-item" href="editor.html"><span>에디터</span><small>Editor</small></a>
            <a class="menu-item" href="assistant.html"><span>AI 도우미</span><small>Assistant</small></a>
            <a class="menu-item" href="errors.html"><span>에러 해결</span><small>Error Fix</small></a>
            <a class="menu-item" href="community.html"><span>공유</span><small>Community</small></a>
          </nav>
        </div>

        <div class="sidebar-card">
          <p class="eyebrow">빠른 시작</p>
          <h2>설치 없이 바로 코딩</h2>
          <p>기능을 페이지별로 나눠 처음 보는 사용자도 길을 잃지 않게 구성했습니다.</p>
        </div>
      </aside>

      <main class="main-content page-stack">
        <header class="topbar">
          <div>
            <p class="eyebrow">Education-first coding workspace</p>
            <h2 id="page-title">쉽고 빠른 프로그래밍 시작</h2>
          </div>

          <div class="topbar-actions">
            <label class="language-switch" for="localeSelect">
              <span>언어</span>
              <select id="localeSelect">
                <option value="ko">한국어</option>
                <option value="en">English</option>
              </select>
            </label>
            <a class="ghost-button" href="community.html">예제 보기</a>
            <a class="primary-button" href="editor.html">코딩 시작</a>
          </div>
        </header>

        <section class="hero">
          <div class="hero-copy">
            <p class="eyebrow">초보자를 위한 온라인 컴파일 학습 환경</p>
            <h3>기능을 한눈에 보고, 필요한 페이지로 바로 이동</h3>
            <p>
              VPR은 홈, 에디터, AI 보조, 에러 해결, 커뮤니티를 각각 분리해 처음 접하는 사용자도
              화면을 덜 복잡하게 느끼도록 설계했습니다.
            </p>

            <div class="hero-actions">
              <a class="primary-button" href="editor.html">에디터 열기</a>
              <a class="secondary-button" href="assistant.html">AI 아이디어 보기</a>
            </div>
          </div>

          <div class="hero-grid">
            <article class="stat-card accent-a">
              <p>즉시 실행</p>
              <strong>언어별 학습 흐름</strong>
              <span>코드 작성, 저장, 미리보기, 예제 로딩을 분리된 페이지에서 사용</span>
            </article>
            <article class="stat-card accent-b">
              <p>학습 보조</p>
              <strong>AI와 에러 가이드</strong>
              <span>아이디어 생성과 오류 해설을 별도 화면으로 분리</span>
            </article>
            <article class="stat-card accent-c">
              <p>커뮤니티</p>
              <strong>예제에서 에디터로 이동</strong>
              <span>공개 스니펫을 선택하면 에디터로 바로 이어짐</span>
            </article>
          </div>
        </section>

        <section class="dashboard-grid">
          <article class="feature-card">
            <p class="eyebrow">페이지 구성</p>
            <h3>기능별 분리 구조</h3>
            <div class="response-box compact-box">
              <strong>Home</strong>
              <p>전체 구조와 최근 프로젝트 현황 확인</p>
              <strong>Editor</strong>
              <p>코드 작성, 저장, 실행, 미리보기, 가져오기/내보내기</p>
              <strong>Assistant / Errors / Community</strong>
              <p>학습 보조, 오류 해설, 예제 탐색을 각 페이지에서 집중</p>
            </div>
          </article>

          <article class="feature-card">
            <p class="eyebrow">최근 작업</p>
            <h3>내 프로젝트 현황</h3>
            <div class="response-box compact-box" id="homeProjectSummary"></div>
          </article>
        </section>

        <section class="quick-link-grid">
          <a class="feature-card card-link" href="editor.html">
            <p class="eyebrow">Editor</p>
            <h3>코드를 쓰고 저장</h3>
            <p>JavaScript 실행, HTML 미리보기, 로컬 프로젝트 라이브러리</p>
          </a>
          <a class="feature-card card-link" href="assistant.html">
            <p class="eyebrow">Assistant</p>
            <h3>아이디어와 학습 포인트</h3>
            <p>언어별 학습 포인트와 프로젝트 주제 추천</p>
          </a>
          <a class="feature-card card-link" href="errors.html">
            <p class="eyebrow">Errors</p>
            <h3>오류 메시지 해설</h3>
            <p>문법, null/undefined, 인덱스 오류 같은 대표 패턴 가이드</p>
          </a>
          <a class="feature-card card-link" href="community.html">
            <p class="eyebrow">Community</p>
            <h3>예제에서 바로 시작</h3>
            <p>공개 스니펫을 고르고 에디터로 넘겨서 바로 수정</p>
          </a>
        </section>
      </main>
    </div>

    <script src="app.js"></script>
  </body>
</html>
```

## editor.html
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VPR | Editor</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body data-page="editor">
    <div class="app-shell">
      <aside class="sidebar">
        <div>
          <a class="brand brand-link" href="index.html">
            <div class="brand-mark">V</div>
            <div>
              <p class="eyebrow">Virtual Program Runner</p>
              <h1>VPR</h1>
            </div>
          </a>
          <nav class="menu">
            <a class="menu-item" href="index.html"><span>홈</span><small>Home</small></a>
            <a class="menu-item is-active" href="editor.html"><span>에디터</span><small>Editor</small></a>
            <a class="menu-item" href="assistant.html"><span>AI 도우미</span><small>Assistant</small></a>
            <a class="menu-item" href="errors.html"><span>에러 해결</span><small>Error Fix</small></a>
            <a class="menu-item" href="community.html"><span>공유</span><small>Community</small></a>
          </nav>
        </div>
        <div class="sidebar-card">
          <p class="eyebrow">에디터 안내</p>
          <h2>프로젝트별로 저장</h2>
          <p>작성 중인 코드는 브라우저 로컬 저장소에 프로젝트 단위로 보관됩니다.</p>
        </div>
      </aside>

      <main class="main-content page-stack">
        <header class="topbar">
          <div>
            <p class="eyebrow">Notebook-style editor</p>
            <h2 id="page-title">코드를 작성하고 바로 실행해 보기</h2>
          </div>
          <div class="topbar-actions">
            <label class="language-switch" for="localeSelect">
              <span>언어</span>
              <select id="localeSelect">
                <option value="ko">한국어</option>
                <option value="en">English</option>
              </select>
            </label>
            <span class="run-mode-pill" id="runModePill">Cloud Runtime</span>
            <a class="ghost-button" href="community.html">예제 가져오기</a>
          </div>
        </header>

        <section class="page-intro">
          <div>
            <p class="eyebrow">Editor Workspace</p>
            <h3>언어 선택, 저장, 실행, 미리보기를 한 화면에서</h3>
          </div>
          <p>에디터 페이지에는 실제 작업에 필요한 기능만 남겨 집중도를 높였습니다.</p>
        </section>

        <section class="workspace editor-page-layout">
          <div class="window-frame">
            <div class="window-bar">
              <div class="window-dots"><span></span><span></span><span></span></div>
              <div class="window-actions">
                <button class="window-action" type="button">파일</button>
                <button class="window-action" type="button">편집</button>
                <button class="window-action" type="button">실행</button>
                <button class="window-action" type="button">도움말</button>
              </div>
            </div>

            <div class="editor-toolbar">
              <label class="project-name-field">
                프로젝트
                <input id="projectName" type="text" value="my-first-project" maxlength="40" />
              </label>
              <label>
                언어
                <select id="languageSelect"></select>
              </label>
              <label>
                테마
                <select>
                  <option>Classic Note</option>
                  <option>Ocean Lab</option>
                  <option>Paper Dark</option>
                </select>
              </label>
              <button class="ghost-button small" id="newProjectButton" type="button">새 초안</button>
              <button class="primary-button small" id="runButton" type="button">실행</button>
              <button class="ghost-button small" id="saveButton" type="button">저장</button>
              <button class="ghost-button small" id="downloadButton" type="button">내보내기</button>
              <label class="ghost-button small file-trigger" for="importFileInput">가져오기</label>
              <input id="importFileInput" type="file" accept=".txt,.js,.py,.cpp,.html,.json" hidden />
            </div>

            <div class="editor-layout">
              <div class="line-numbers" id="lineNumbers"></div>
              <textarea id="codeEditor" spellcheck="false"></textarea>
            </div>
          </div>

          <div class="output-panel">
            <div class="output-header">
              <h3>실행 결과</h3>
              <span id="statusBadge">준비됨</span>
            </div>
            <div class="meta-strip">
              <div>
                <strong>최근 저장</strong>
                <span id="saveMeta">아직 저장된 프로젝트가 없습니다.</span>
              </div>
              <div>
                <strong>저장된 프로젝트</strong>
                <span id="projectCount">0개</span>
              </div>
            </div>
            <div class="project-library">
              <div class="section-label">내 프로젝트</div>
              <ul class="project-list" id="projectList"></ul>
            </div>
            <div class="runtime-config-panel">
              <div class="runtime-config-head">
                <div class="section-label">런타임 설정</div>
                <button class="ghost-button small" id="toggleRuntimeConfigButton" type="button">설정 열기</button>
              </div>
              <div class="runtime-config-body is-hidden" id="runtimeConfigBody">
                <label>
                  Endpoint
                  <input id="runtimeEndpointInput" type="text" placeholder="https://your-runtime/api/v2/piston/execute" />
                </label>
                <label>
                  Headers(JSON)
                  <textarea id="runtimeHeadersInput" rows="4" spellcheck="false" placeholder='{"Authorization":"Bearer token"}'></textarea>
                </label>
                <div class="runtime-config-actions">
                  <button class="primary-button small" id="saveRuntimeConfigButton" type="button">저장</button>
                  <button class="ghost-button small" id="resetRuntimeConfigButton" type="button">기본값</button>
                </div>
                <p class="runtime-config-status" id="runtimeConfigStatus">현재 기본 공개 런타임 엔드포인트를 사용 중입니다.</p>
              </div>
            </div>
            <pre id="outputConsole"></pre>
            <div class="preview-panel">
              <div class="section-label">미리보기</div>
              <iframe id="previewFrame" title="VPR Preview" sandbox="allow-scripts"></iframe>
            </div>
            <div class="preview-panel">
              <div class="section-label">회로도</div>
              <div id="circuitEditor" class="circuit-editor is-disabled">
                <div class="circuit-toolbar">
                  <button class="ghost-button small" id="addComponentButton" type="button">부품 추가</button>
                  <button class="ghost-button small" id="connectComponentButton" type="button">연결 생성</button>
                  <button class="ghost-button small" id="resetCircuitButton" type="button">초기 배치</button>
                </div>
                <div class="circuit-workspace" id="circuitWorkspace">
                  <svg id="circuitWireLayer" class="circuit-wire-layer"></svg>
                  <div id="circuitNodeLayer" class="circuit-node-layer"></div>
                  <div id="circuitDisabledOverlay" class="circuit-disabled-overlay">Arduino/ESP-IDF를 선택하면 회로 편집기가 활성화됩니다.</div>
                </div>
                <div class="circuit-form">
                  <label>
                    이름
                    <input id="circuitNameInput" type="text" maxlength="24" placeholder="component name" />
                  </label>
                  <label>
                    핀/설명
                    <input id="circuitPinInput" type="text" maxlength="24" placeholder="D13 / GPIO2" />
                  </label>
                  <label>
                    X
                    <input id="circuitXInput" type="number" min="0" max="900" />
                  </label>
                  <label>
                    Y
                    <input id="circuitYInput" type="number" min="0" max="700" />
                  </label>
                  <button class="primary-button small" id="applyCircuitNodeButton" type="button">수정 적용</button>
                  <button class="ghost-button small" id="deleteCircuitNodeButton" type="button">선택 삭제</button>
                </div>
                <p id="circuitStatus" class="circuit-status">회로도를 수정하려면 부품을 선택하세요.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <script src="app.js"></script>
  </body>
</html>
```

## assistant.html
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VPR | Assistant</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body data-page="assistant">
    <div class="app-shell">
      <aside class="sidebar">
        <div>
          <a class="brand brand-link" href="index.html">
            <div class="brand-mark">V</div>
            <div>
              <p class="eyebrow">Virtual Program Runner</p>
              <h1>VPR</h1>
            </div>
          </a>
          <nav class="menu">
            <a class="menu-item" href="index.html"><span>홈</span><small>Home</small></a>
            <a class="menu-item" href="editor.html"><span>에디터</span><small>Editor</small></a>
            <a class="menu-item is-active" href="assistant.html"><span>AI 도우미</span><small>Assistant</small></a>
            <a class="menu-item" href="errors.html"><span>에러 해결</span><small>Error Fix</small></a>
            <a class="menu-item" href="community.html"><span>공유</span><small>Community</small></a>
          </nav>
        </div>
        <div class="sidebar-card">
          <p class="eyebrow">학습 보조</p>
          <h2>아이디어와 언어 학습</h2>
          <p>에디터와 분리해 생각 정리와 주제 탐색에 집중하도록 구성했습니다.</p>
        </div>
      </aside>

      <main class="main-content page-stack">
        <header class="topbar">
          <div>
            <p class="eyebrow">Assistant Workspace</p>
            <h2 id="page-title">아이디어 추천과 언어 학습 보조</h2>
          </div>
          <div class="topbar-actions">
            <label class="language-switch" for="localeSelect">
              <span>언어</span>
              <select id="localeSelect">
                <option value="ko">한국어</option>
                <option value="en">English</option>
              </select>
            </label>
            <a class="primary-button" href="editor.html">에디터로 이동</a>
          </div>
        </header>

        <section class="page-intro">
          <div>
            <p class="eyebrow">AI Support</p>
            <h3>아이디어 생성과 학습 포인트를 별도 화면에서</h3>
          </div>
          <p>입문자는 코딩 전 단계에서 막히는 일이 많기 때문에 아이디어 탐색과 학습 가이드를 분리했습니다.</p>
        </section>

        <section class="feature-grid assistant-layout">
          <article class="feature-card">
            <p class="eyebrow">AI 아이디어 생성</p>
            <h3>프로젝트 아이디어 추천</h3>
            <textarea id="ideaPrompt" placeholder="예: 파이썬으로 만들 수 있는 초보자용 게임 아이디어"></textarea>
            <button class="primary-button small" id="ideaButton" type="button">아이디어 받기</button>
            <div class="response-box" id="ideaResponse"></div>
          </article>

          <article class="feature-card">
            <p class="eyebrow">학습 보조</p>
            <h3>선택 언어 학습 가이드</h3>
            <label>
              언어
              <select id="assistantLanguageSelect" class="full-width-select"></select>
            </label>
            <div class="response-box learning-box" id="learningGuide"></div>
          </article>
        </section>
      </main>
    </div>

    <script src="app.js"></script>
  </body>
</html>
```

## errors.html
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VPR | Errors</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body data-page="errors">
    <div class="app-shell">
      <aside class="sidebar">
        <div>
          <a class="brand brand-link" href="index.html">
            <div class="brand-mark">V</div>
            <div>
              <p class="eyebrow">Virtual Program Runner</p>
              <h1>VPR</h1>
            </div>
          </a>
          <nav class="menu">
            <a class="menu-item" href="index.html"><span>홈</span><small>Home</small></a>
            <a class="menu-item" href="editor.html"><span>에디터</span><small>Editor</small></a>
            <a class="menu-item" href="assistant.html"><span>AI 도우미</span><small>Assistant</small></a>
            <a class="menu-item is-active" href="errors.html"><span>에러 해결</span><small>Error Fix</small></a>
            <a class="menu-item" href="community.html"><span>공유</span><small>Community</small></a>
          </nav>
        </div>
        <div class="sidebar-card">
          <p class="eyebrow">에러 가이드</p>
          <h2>오류를 따로 해석</h2>
          <p>코드 편집 화면과 분리해 오류 메시지 이해에 집중할 수 있게 만들었습니다.</p>
        </div>
      </aside>

      <main class="main-content page-stack">
        <header class="topbar">
          <div>
            <p class="eyebrow">Error Playground</p>
            <h2 id="page-title">오류 메시지를 붙여넣고 해결 방향 찾기</h2>
          </div>
          <div class="topbar-actions">
            <label class="language-switch" for="localeSelect">
              <span>언어</span>
              <select id="localeSelect">
                <option value="ko">한국어</option>
                <option value="en">English</option>
              </select>
            </label>
            <a class="ghost-button" href="editor.html">코드로 돌아가기</a>
          </div>
        </header>

        <section class="page-intro">
          <div>
            <p class="eyebrow">Error Fix</p>
            <h3>대표 오류 유형부터 빠르게 해석</h3>
          </div>
          <p>입력한 메시지를 바탕으로 초보자가 먼저 점검할 만한 방향을 제시합니다.</p>
        </section>

        <section class="feature-grid single-column-grid">
          <article class="feature-card wide">
            <p class="eyebrow">에러 진단</p>
            <h3>오류 메시지 붙여넣기</h3>
            <textarea id="errorInput" placeholder="예: SyntaxError: invalid syntax"></textarea>
            <button class="primary-button small" id="errorButton" type="button">해결 방법 보기</button>
            <div class="response-box" id="errorResponse"></div>
          </article>

          <article class="feature-card">
            <p class="eyebrow">대표 패턴</p>
            <h3>자주 보는 오류 체크리스트</h3>
            <div class="response-box compact-box">
              <strong>SyntaxError</strong>
              <p>괄호, 따옴표, 콜론, 세미콜론 누락 확인</p>
              <strong>null / undefined</strong>
              <p>값 존재 여부와 반환값 확인</p>
              <strong>index out of range</strong>
              <p>반복문 종료 조건과 배열 길이 확인</p>
            </div>
          </article>
        </section>
      </main>
    </div>

    <script src="app.js"></script>
  </body>
</html>
```

## community.html
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VPR | Community</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body data-page="community">
    <div class="app-shell">
      <aside class="sidebar">
        <div>
          <a class="brand brand-link" href="index.html">
            <div class="brand-mark">V</div>
            <div>
              <p class="eyebrow">Virtual Program Runner</p>
              <h1>VPR</h1>
            </div>
          </a>
          <nav class="menu">
            <a class="menu-item" href="index.html"><span>홈</span><small>Home</small></a>
            <a class="menu-item" href="editor.html"><span>에디터</span><small>Editor</small></a>
            <a class="menu-item" href="assistant.html"><span>AI 도우미</span><small>Assistant</small></a>
            <a class="menu-item" href="errors.html"><span>에러 해결</span><small>Error Fix</small></a>
            <a class="menu-item is-active" href="community.html"><span>공유</span><small>Community</small></a>
          </nav>
        </div>
        <div class="sidebar-card">
          <p class="eyebrow">커뮤니티</p>
          <h2>예제를 고르고 시작</h2>
          <p>공개 스니펫을 둘러보고 원하는 예제를 에디터로 바로 이어서 수정할 수 있습니다.</p>
        </div>
      </aside>

      <main class="main-content page-stack">
        <header class="topbar">
          <div>
            <p class="eyebrow">Community Snippets</p>
            <h2 id="page-title">인기 예제 코드를 살펴보고 에디터로 보내기</h2>
          </div>
          <div class="topbar-actions">
            <label class="language-switch" for="localeSelect">
              <span>언어</span>
              <select id="localeSelect">
                <option value="ko">한국어</option>
                <option value="en">English</option>
              </select>
            </label>
            <a class="primary-button" href="editor.html">빈 에디터 열기</a>
          </div>
        </header>

        <section class="page-intro">
          <div>
            <p class="eyebrow">Snippet Gallery</p>
            <h3>예제를 선택하면 에디터 페이지에서 이어서 작업</h3>
          </div>
          <p>한 화면에 모든 기능을 몰아넣는 대신, 탐색은 여기서 하고 실제 편집은 에디터에서 진행합니다.</p>
        </section>

        <section class="feature-grid">
          <article class="feature-card">
            <p class="eyebrow">예제 코드</p>
            <h3>인기 공개 스니펫</h3>
            <ul class="snippet-list" id="snippetList"></ul>
          </article>

          <article class="feature-card">
            <p class="eyebrow">업로드</p>
            <h3>내 코드 공개</h3>
            <div class="upload-box">
              <p id="publishStatus">로그인 후 프로젝트를 선택해 공개할 수 있습니다.</p>
              <label>
                프로젝트
                <select id="publishProjectSelect" class="full-width-select"></select>
              </label>
              <textarea id="publishDescription" placeholder="예제 설명을 입력하세요."></textarea>
              <button class="primary-button small" id="publishButton" type="button">공개하기</button>
            </div>
          </article>
        </section>

        <section class="feature-grid single-column-grid">
          <article class="feature-card wide">
            <p class="eyebrow">공개 피드</p>
            <h3>다른 사용자 공개 코드</h3>
            <ul class="snippet-list" id="publicSnippetList"></ul>
          </article>
        </section>
      </main>
    </div>

    <script src="app.js"></script>
  </body>
</html>
```

## login.html
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VPR | Login</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body data-page="login">
    <div class="app-shell">
      <aside class="sidebar">
        <div>
          <a class="brand brand-link" href="index.html">
            <div class="brand-mark">V</div>
            <div>
              <p class="eyebrow">Virtual Program Runner</p>
              <h1>VPR</h1>
            </div>
          </a>
          <nav class="menu">
            <a class="menu-item" href="index.html"><span>홈</span><small>Home</small></a>
            <a class="menu-item" href="editor.html"><span>에디터</span><small>Editor</small></a>
            <a class="menu-item" href="assistant.html"><span>AI 도우미</span><small>Assistant</small></a>
            <a class="menu-item" href="errors.html"><span>에러 해결</span><small>Error Fix</small></a>
            <a class="menu-item" href="community.html"><span>공유</span><small>Community</small></a>
          </nav>
        </div>
        <div class="sidebar-card">
          <p class="eyebrow">계정</p>
          <h2>로그인 및 회원가입</h2>
          <p>교육용 MVP로 로컬 저장소 기반 계정을 사용합니다.</p>
        </div>
      </aside>

      <main class="main-content page-stack">
        <header class="topbar">
          <div>
            <p class="eyebrow">Account Access</p>
            <h2>로그인 후 프로젝트 공개 및 프로필 관리</h2>
          </div>
          <div class="topbar-actions">
            <label class="language-switch" for="localeSelect">
              <span>언어</span>
              <select id="localeSelect">
                <option value="ko">한국어</option>
                <option value="en">English</option>
              </select>
            </label>
          </div>
        </header>

        <section class="feature-grid">
          <article class="feature-card">
            <p class="eyebrow">Sign In</p>
            <h3>로그인</h3>
            <label>아이디<input id="loginUsername" type="text" /></label>
            <label>비밀번호<input id="loginPassword" type="password" /></label>
            <button class="primary-button small" id="loginButton" type="button">로그인</button>
          </article>

          <article class="feature-card">
            <p class="eyebrow">Register</p>
            <h3>회원가입</h3>
            <label>아이디<input id="registerUsername" type="text" /></label>
            <label>비밀번호<input id="registerPassword" type="password" /></label>
            <button class="secondary-button small" id="registerButton" type="button">계정 만들기</button>
          </article>
        </section>

        <section class="feature-grid single-column-grid">
          <article class="feature-card wide">
            <p class="eyebrow">상태</p>
            <h3>인증 메시지</h3>
            <div class="response-box" id="authStatusBox"></div>
          </article>
        </section>
      </main>
    </div>

    <script src="app.js"></script>
  </body>
</html>
```

## profile.html
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VPR | Profile</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body data-page="profile">
    <div class="app-shell">
      <aside class="sidebar">
        <div>
          <a class="brand brand-link" href="index.html">
            <div class="brand-mark">V</div>
            <div>
              <p class="eyebrow">Virtual Program Runner</p>
              <h1>VPR</h1>
            </div>
          </a>
          <nav class="menu">
            <a class="menu-item" href="index.html"><span>홈</span><small>Home</small></a>
            <a class="menu-item" href="editor.html"><span>에디터</span><small>Editor</small></a>
            <a class="menu-item" href="assistant.html"><span>AI 도우미</span><small>Assistant</small></a>
            <a class="menu-item" href="errors.html"><span>에러 해결</span><small>Error Fix</small></a>
            <a class="menu-item" href="community.html"><span>공유</span><small>Community</small></a>
          </nav>
        </div>
        <div class="sidebar-card">
          <p class="eyebrow">프로필</p>
          <h2>내 계정 관리</h2>
          <p>소개, 선호 언어, 공개 코드 목록을 관리합니다.</p>
        </div>
      </aside>

      <main class="main-content page-stack">
        <header class="topbar">
          <div>
            <p class="eyebrow">User Profile</p>
            <h2>내 프로필 관리</h2>
          </div>
          <div class="topbar-actions">
            <label class="language-switch" for="localeSelect">
              <span>언어</span>
              <select id="localeSelect">
                <option value="ko">한국어</option>
                <option value="en">English</option>
              </select>
            </label>
          </div>
        </header>

        <section class="feature-grid">
          <article class="feature-card">
            <p class="eyebrow">내 정보</p>
            <h3>프로필 수정</h3>
            <label>표시 이름<input id="profileDisplayName" type="text" /></label>
            <label>소개<textarea id="profileBio"></textarea></label>
            <label>선호 언어<input id="profileFavoriteLang" type="text" /></label>
            <button class="primary-button small" id="saveProfileButton" type="button">프로필 저장</button>
          </article>

          <article class="feature-card">
            <p class="eyebrow">계정 상태</p>
            <h3>로그인 정보</h3>
            <div class="response-box" id="profileStatusBox"></div>
            <button class="ghost-button small" id="logoutButton" type="button">로그아웃</button>
          </article>
        </section>

        <section class="feature-grid single-column-grid">
          <article class="feature-card wide">
            <p class="eyebrow">공개 코드</p>
            <h3>내가 공개한 코드</h3>
            <ul class="snippet-list" id="myPublicSnippetList"></ul>
          </article>
        </section>
      </main>
    </div>

    <script src="app.js"></script>
  </body>
</html>
```

## styles.css
```css
:root {
  --bg: #f3efe5;
  --bg-secondary: #fbf8f1;
  --surface: rgba(255, 252, 246, 0.82);
  --surface-strong: #fffdf8;
  --ink: #1f2937;
  --ink-soft: #556072;
  --line: rgba(74, 58, 37, 0.12);
  --accent: #0f766e;
  --accent-strong: #134e4a;
  --accent-warm: #d97706;
  --accent-sky: #1d4ed8;
  --shadow: 0 20px 60px rgba(52, 40, 24, 0.12);
  --radius-xl: 28px;
  --radius-lg: 22px;
  --radius-md: 16px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "IBM Plex Sans KR", sans-serif;
  color: var(--ink);
  background:
    radial-gradient(circle at top left, rgba(255, 206, 123, 0.24), transparent 25%),
    radial-gradient(circle at bottom right, rgba(15, 118, 110, 0.14), transparent 26%),
    linear-gradient(135deg, #f7f4ec 0%, #efe7d5 100%);
}

button,
input,
select,
textarea {
  font: inherit;
}

.app-shell {
  display: grid;
  grid-template-columns: 300px 1fr;
  min-height: 100vh;
}

.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px;
  border-right: 1px solid var(--line);
  background: rgba(255, 250, 241, 0.84);
  backdrop-filter: blur(18px);
}

.brand {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 36px;
}

.brand-link {
  color: inherit;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 18px;
  background: linear-gradient(145deg, var(--accent), #34d399);
  color: white;
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  box-shadow: var(--shadow);
}

.brand h1,
.topbar h2,
.hero h3,
.feature-card h3,
.sidebar-card h2,
.output-header h3 {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
}

.eyebrow {
  margin: 0 0 6px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.menu {
  display: grid;
  gap: 10px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 16px 18px;
  border: 1px solid transparent;
  border-radius: 18px;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  text-decoration: none;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.menu-item:hover,
.menu-item.is-active {
  transform: translateX(4px);
  border-color: rgba(15, 118, 110, 0.22);
  background: rgba(15, 118, 110, 0.1);
}

.menu-item small {
  color: var(--ink-soft);
}

.sidebar-card,
.feature-card,
.output-panel,
.stat-card,
.window-frame {
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow);
}

.sidebar-card {
  padding: 22px;
}

.main-content {
  padding: 28px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  margin-bottom: 22px;
}

.topbar-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.auth-inline {
  display: flex;
  align-items: center;
  gap: 8px;
}

.auth-chip,
.run-mode-pill {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.75);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--ink-soft);
}

.language-switch {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.65);
}

select,
input,
textarea,
.ghost-button,
.primary-button,
.secondary-button,
.window-action {
  border-radius: 14px;
  border: 1px solid var(--line);
}

select,
input,
textarea {
  background: rgba(255, 255, 255, 0.86);
  color: var(--ink);
}

input {
  padding: 11px 14px;
}

.ghost-button,
.primary-button,
.secondary-button,
.window-action {
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.ghost-button,
.secondary-button,
.window-action {
  background: rgba(255, 255, 255, 0.72);
}

.primary-button {
  background: linear-gradient(135deg, var(--accent), #14b8a6);
  color: white;
  border: none;
  box-shadow: 0 16px 32px rgba(15, 118, 110, 0.24);
}

.secondary-button {
  background: linear-gradient(135deg, #fff1cc, #ffe0a3);
}

.ghost-button,
.primary-button,
.secondary-button {
  padding: 12px 18px;
}

.small {
  padding: 10px 14px;
}

.ghost-button:hover,
.primary-button:hover,
.secondary-button:hover,
.window-action:hover {
  transform: translateY(-1px);
}

.panel {
  display: none;
}

.panel.is-visible {
  display: block;
  animation: rise 260ms ease;
}

.hero {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 22px;
}

.page-stack {
  display: grid;
  gap: 22px;
}

.page-intro {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: end;
  padding: 20px 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.62);
  box-shadow: var(--shadow);
}

.page-intro h3 {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.5rem;
}

.page-intro p:last-child {
  margin: 0;
  max-width: 520px;
  color: var(--ink-soft);
}

.hero-copy,
.workspace,
.feature-grid {
  min-width: 0;
}

.hero-copy {
  padding: 34px;
  border-radius: var(--radius-xl);
  background:
    linear-gradient(145deg, rgba(255, 254, 250, 0.94), rgba(244, 235, 218, 0.9)),
    linear-gradient(120deg, rgba(15, 118, 110, 0.18), transparent);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}

.hero-copy h3 {
  font-size: clamp(2rem, 3.2vw, 3.3rem);
  line-height: 1.05;
  margin-bottom: 14px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 24px;
}

.hero-grid {
  display: grid;
  gap: 16px;
}

.stat-card {
  padding: 24px;
}

.stat-card strong {
  display: block;
  margin: 10px 0 8px;
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.4rem;
}

.accent-a {
  background: linear-gradient(145deg, rgba(15, 118, 110, 0.12), rgba(255, 255, 255, 0.88));
}

.accent-b {
  background: linear-gradient(145deg, rgba(217, 119, 6, 0.12), rgba(255, 255, 255, 0.88));
}

.accent-c {
  background: linear-gradient(145deg, rgba(29, 78, 216, 0.11), rgba(255, 255, 255, 0.88));
}

.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 18px;
}

.editor-page-layout {
  align-items: start;
}

.window-frame {
  overflow: hidden;
}

.window-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--line);
  background: rgba(255, 250, 241, 0.92);
}

.window-dots {
  display: flex;
  gap: 8px;
}

.window-dots span {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #f9a8d4;
}

.window-dots span:nth-child(2) {
  background: #fbbf24;
}

.window-dots span:nth-child(3) {
  background: #34d399;
}

.window-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.window-action {
  padding: 8px 12px;
}

.editor-toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  padding: 14px 18px;
  border-bottom: 1px solid var(--line);
}

.editor-toolbar label {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--ink-soft);
}

.project-name-field {
  min-width: 240px;
}

.project-name-field input {
  width: 100%;
}

.file-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.editor-layout {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  min-height: 520px;
}

.line-numbers {
  padding: 20px 12px;
  font-family: Consolas, monospace;
  font-size: 0.95rem;
  color: #8a94a7;
  background: rgba(236, 231, 220, 0.85);
  text-align: right;
  user-select: none;
  white-space: pre-line;
}

#codeEditor {
  width: 100%;
  min-height: 520px;
  padding: 20px 22px;
  border: none;
  border-radius: 0;
  resize: vertical;
  outline: none;
  font-family: Consolas, monospace;
  font-size: 0.98rem;
  line-height: 1.6;
  background: rgba(255, 254, 249, 0.96);
}

.output-panel {
  padding: 18px;
}

.meta-strip {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 14px 0 16px;
}

.meta-strip div,
.project-library,
.preview-panel {
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(74, 58, 37, 0.08);
}

.meta-strip strong,
.section-label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.project-library {
  margin-bottom: 16px;
}

.runtime-config-panel {
  margin-bottom: 16px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(74, 58, 37, 0.08);
}

.runtime-config-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.runtime-config-body {
  display: grid;
  gap: 10px;
  margin-top: 10px;
}

.runtime-config-body.is-hidden {
  display: none;
}

.runtime-config-body label {
  display: grid;
  gap: 6px;
  color: var(--ink-soft);
  font-size: 0.9rem;
}

.runtime-config-body textarea {
  min-height: 96px;
  resize: vertical;
  padding: 10px 12px;
  font-family: Consolas, monospace;
  font-size: 0.9rem;
}

.runtime-config-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.runtime-config-status {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
}

.project-list {
  display: grid;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.project-list li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(248, 243, 233, 0.9);
}

.project-list button {
  padding: 8px 12px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: white;
  cursor: pointer;
}

.project-list small {
  display: block;
  color: var(--ink-soft);
}

.output-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

#statusBadge {
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.12);
  color: var(--accent-strong);
  font-size: 0.9rem;
  font-weight: 700;
}

#outputConsole,
.response-box,
.learning-box,
.upload-box,
.snippet-list {
  margin: 0;
  padding: 16px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(74, 58, 37, 0.08);
}

#outputConsole {
  min-height: 240px;
  overflow: auto;
  white-space: pre-wrap;
}

.preview-panel {
  margin-top: 16px;
}

#previewFrame {
  width: 100%;
  min-height: 260px;
  border: 1px solid rgba(74, 58, 37, 0.12);
  border-radius: 14px;
  background: white;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.assistant-layout,
.dashboard-grid,
.quick-link-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.quick-link-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.single-column-grid {
  grid-template-columns: 1fr;
}

.feature-card {
  padding: 24px;
}

.feature-card label {
  display: grid;
  gap: 8px;
  margin-bottom: 10px;
  color: var(--ink-soft);
  font-size: 0.95rem;
}

.feature-card input,
.feature-card textarea,
.feature-card select {
  width: 100%;
}

.feature-card.wide {
  grid-column: 1 / -1;
}

.feature-card textarea {
  width: 100%;
  min-height: 140px;
  padding: 16px;
  margin: 14px 0 12px;
  resize: vertical;
}

.circuit-editor {
  display: grid;
  gap: 10px;
}

.circuit-editor.is-disabled {
  opacity: 0.9;
}

.circuit-toolbar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.circuit-workspace {
  position: relative;
  min-height: 260px;
  border: 1px solid rgba(74, 58, 37, 0.12);
  border-radius: 14px;
  background:
    linear-gradient(rgba(29, 78, 216, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(29, 78, 216, 0.06) 1px, transparent 1px),
    #ffffff;
  background-size: 24px 24px, 24px 24px, auto;
  overflow: hidden;
}

.circuit-wire-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.circuit-node-layer {
  position: absolute;
  inset: 0;
}

.circuit-node {
  position: absolute;
  width: 132px;
  padding: 8px 10px;
  border-radius: 12px;
  border: 1px solid rgba(15, 118, 110, 0.32);
  background: rgba(240, 253, 250, 0.95);
  box-shadow: 0 10px 18px rgba(15, 118, 110, 0.12);
  cursor: grab;
  user-select: none;
}

.circuit-node.is-selected {
  border-color: rgba(217, 119, 6, 0.8);
  box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.24);
}

.circuit-node-name {
  display: block;
  font-weight: 700;
  font-size: 0.86rem;
}

.circuit-node-pin {
  display: block;
  margin-top: 2px;
  color: var(--ink-soft);
  font-size: 0.8rem;
}

.circuit-disabled-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 18px;
  color: var(--ink-soft);
  background: rgba(255, 255, 255, 0.88);
}

.circuit-editor:not(.is-disabled) .circuit-disabled-overlay {
  display: none;
}

.circuit-form {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.circuit-form label {
  display: grid;
  gap: 6px;
  color: var(--ink-soft);
  font-size: 0.85rem;
}

.circuit-form input {
  width: 100%;
  padding: 9px 10px;
}

.circuit-status {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
}

@media (max-width: 720px) {
  .circuit-form {
    grid-template-columns: 1fr 1fr;
  }
}

#publicSnippetList button,
#myPublicSnippetList button {
  margin-top: 8px;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: white;
  cursor: pointer;
}

.snippet-list small {
  display: block;
  margin-top: 6px;
  color: var(--ink-soft);
}

.response-box,
.learning-box,
.upload-box {
  min-height: 168px;
  line-height: 1.7;
}

.compact-box {
  min-height: auto;
}

.card-link {
  display: block;
  color: inherit;
  text-decoration: none;
  transition: transform 180ms ease, border-color 180ms ease;
}

.card-link:hover {
  transform: translateY(-3px);
  border-color: rgba(15, 118, 110, 0.18);
}

.full-width-select {
  width: 100%;
  margin: 10px 0 14px;
}

.snippet-list {
  display: grid;
  gap: 12px;
  list-style: none;
}

.snippet-list li {
  padding: 14px;
  border-radius: 14px;
  background: rgba(245, 247, 251, 0.9);
  border: 1px solid rgba(29, 78, 216, 0.1);
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease;
}

.snippet-list li:hover {
  transform: translateY(-2px);
  border-color: rgba(29, 78, 216, 0.28);
}

.snippet-list strong {
  display: block;
  margin-bottom: 4px;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1100px) {
  .app-shell,
  .hero,
  .workspace,
  .feature-grid,
  .dashboard-grid,
  .quick-link-grid,
  .assistant-layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: 1px solid var(--line);
  }
}

@media (max-width: 720px) {
  .main-content,
  .sidebar {
    padding: 20px;
  }

  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .page-intro {
    align-items: flex-start;
    flex-direction: column;
  }

  .editor-layout {
    grid-template-columns: 48px minmax(0, 1fr);
    min-height: 420px;
  }

  .meta-strip {
    grid-template-columns: 1fr;
  }

  #codeEditor,
  #outputConsole,
  #previewFrame {
    min-height: 420px;
  }
}
```

## app.js
```javascript
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
const defaultRuntimeEndpoint = "https://emkc.org/api/v2/piston/execute";

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
    runner: { language: "rust", version: "1.68.2" },
    guide: ["소유권 에러를 타입 설계 문제로 보세요.", "panic보다 Result 기반 처리로 확장성을 확보하세요."],
    code: "fn main() {\n    println!(\"Hello from Rust\");\n}",
  },
  php: {
    label: "PHP",
    extension: "php",
    runner: { language: "php", version: "8.2.3" },
    guide: ["입력값은 필터링 후 사용하세요.", "예외 기반 오류 처리 규칙을 통일하세요."],
    code: "<?php\necho \"Hello from PHP\\n\";\n",
  },
  ruby: {
    label: "Ruby",
    extension: "rb",
    runner: { language: "ruby", version: "3.0.1" },
    guide: ["메서드 책임을 작게 유지하세요.", "동적 타입이라도 입력 검증은 필수입니다."],
    code: "puts 'Hello from Ruby'",
  },
  kotlin: {
    label: "Kotlin",
    extension: "kt",
    runner: { language: "kotlin", version: "1.8.20" },
    guide: ["null-safe 연산자를 적극 활용하세요.", "데이터 클래스와 확장 함수를 과도하게 남용하지 마세요."],
    code: "fun main() {\n  println(\"Hello from Kotlin\")\n}",
  },
  swift: {
    label: "Swift",
    extension: "swift",
    runner: { language: "swift", version: "5.3.3" },
    guide: ["옵셔널 언래핑 경로를 명확히 하세요.", "값 타입/참조 타입 선택 이유를 분명히 하세요."],
    code: "print(\"Hello from Swift\")",
  },
  html: {
    label: "HTML",
    extension: "html",
    mode: "preview",
    guide: ["시맨틱 태그를 우선 사용하세요.", "스타일/동작 분리를 유지하세요."],
    code: "<!DOCTYPE html>\n<html lang=\"ko\">\n  <body>\n    <h1>Hello from HTML</h1>\n    <p>Preview works in the panel.</p>\n  </body>\n</html>",
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
      compile_timeout: 10000,
      run_timeout: 10000,
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
      runModePill.textContent = "HTML Preview";
    } else if (mode === "circuit") {
      runModePill.textContent = "Circuit + Cloud";
    } else {
      runModePill.textContent = "Cloud Runtime";
    }
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
      previewFrame.srcdoc = code;
      outputConsole.textContent = "HTML 미리보기를 아래 프레임에 렌더링했습니다.";
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
      const runOutput = result.run?.output || "";
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
  if (!ideaPrompt || !ideaResponse || !learningGuide || !ideaButton || !assistantLanguageSelect) {
    return;
  }

  populateLanguageSelect(assistantLanguageSelect);
  assistantLanguageSelect.value = "javascript";
  renderLearningGuide(learningGuide, assistantLanguageSelect.value);
  ideaResponse.textContent = content[currentLocale].ideaFallback;

  assistantLanguageSelect.addEventListener("change", (event) => {
    renderLearningGuide(learningGuide, event.target.value);
  });
  ideaButton.addEventListener("click", () => {
    ideaResponse.textContent = buildIdeaResponse(ideaPrompt.value);
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
```

## README.md
```markdown
# VPR

============================================================================

프로그램명 : 가상 프로그램 실행 환경 (Virtual Program Runner, VPR)

프로그램 한 줄 소개 : 이 프로그램은 웹에서 쉽고 빠르게 코드를 작성하고 컴파일하는 교육용 도구 

기능 정리 :
* 핵심 기능 :
1. 프로그래밍 도구 설치하지 않고 그저 웹사이트(Google, Naver ...등)에서 즉시 프로그래밍
2. 아이디어가 부족하면 AI를 이용한 창작 및 아이디어 제공
3. 에러 및 오류 코드나 메시지 확인과 수정 코드 제공
4. 사용자가 선택한 언어 학습
* 부가 기능 :
1. 간단한 프로그램이나 예제 코드
2. 내가 만든 코드 업로드와 공개 및 다른 사람 코드 보기

프로젝트 목표 : 
* 초보자도 쉽게 프로그래밍 접하기
* 빠르게 프로그래밍 접하기
* 간단하게 프로그래밍 접하기

============================================================================

사용자 페르소나 :

* 코드를 배우러 오는 사람 및 잘 모르는 사람
* 저장 공간 절약이 필요한 사람
* 에러를 고쳐야하는데 모르는 사람
* 아이디어가 필요한 사람

기대 효과 : 진입 장벽이 낮아 초보자도 쉽게 접근할 수 있고,
            저러한 사용자들은 쉽고, 빠르게 프로그래밍을 접할 수 있다.

============================================================================

계기 :
프로그램을 만들면서 이게 제대로 도는지도 모르겠고
어디서 오류가 나는지 찾기도 힘들며 진짜 문제는 
새 언어를 배우려면 그 언어를 설치해야한다는
번거로움이 있어 만들게됨

============================================================================

핵심 화면 : 홈 화면은 버튼과 사이드 메뉴바 모양으로 만들기 
           에디터 창은 Windows 메모장처럼 친화적인 이미지로 만들되
           상단 메뉴바 정렬은 사용자 친화적으로 만들기 
           언어도 한국어 및 영어 정도만 만들기

============================================================================

설계

1. 언어는 웹사이트에 맞는 HTML및 JS, CSS나 이 외의 언어를 사용한다.
2. 데이터 저장소는 SQL같은 계열의 언어를 사용한다.
3. 로컬 AI보다는 무료 클라우드 AI를 사용한다.
4. 언어는 모든 언어를 전부 구현하기보다는 C, C++, C#, Python, HTML, SQL, Java, JS, Arduino
   등등의 언어를 주로 사용하며 텍스트 형식이여야 함.

보안

1. SQL 인젝션 방지를 위해 if문으로 예외처리
2. DDoS 방지를 위해 한 IP 접속량 제한 및 딜레이
3. eval() 같은 특정 위험 함수는 사용 제한
4. 계정 보호를 위해 이중 보안 방식 사용
5. 만약 코드에서 특정 웹 사이트를 크롤링 할 경우를 대비하여 제한

============================================================================

사용자 예상 시나리오
1. 프로그램 접속
2. 만약 로그인을 하였는가?
   * a. 예 : 사용자 홈 화면
   * b. 아니오 : 로그인 화면
3. 홈 화면에 들어왔다면 사이드 바를 구경한다.
4. 무언가를 눌렀는가?
   * 에디터. Windows 메모장 같은 에디터가 나오며 코드를 작성할 수 있다.
   * AI. 아이디어를 얻거나 코드를 수정한다.
   * 에러창. 에러를 넣으면 예시 수정 코드나 해결 방안 제시
5. 도움말 또는 스스로 익히며 프로그램을 사용한다.
6. 종료시 저장 여부 묻기.

============================================================================

현재 프로토타입 구현 상태 (2026-06-13)

1. 화면 구조
   * 홈, 에디터, AI 도우미, 에러 해결, 커뮤니티, 로그인, 프로필 페이지로 분리
   * 모든 페이지에서 공통 사이드 메뉴와 한국어/영어 전환 지원

2. 언어/실행
   * 지원 언어 확장: JavaScript, TypeScript, Python, C, C++, C#, Java, Go, Rust, PHP, Ruby, Kotlin, Swift, HTML, Arduino, ESP-IDF
   * HTML: 미리보기 프레임 실시간 렌더링
   * Arduino/ESP-IDF: 기본 회로도 템플릿(핀 연결 예시) 지원
   * 일반 언어: 클라우드 런타임 연동 구조 완성(실행/컴파일 출력 파이프라인 포함)
   * 주의: 기존 공개 Piston API(emkc.org)는 2026년 기준 화이트리스트 전용으로 변경되어 기본 설정에서는 401이 발생할 수 있음
   * 해결: localStorage 키 `vpr-runtime-config`로 자체/승인된 런타임 엔드포인트 및 인증 헤더를 지정해 실제 실행 가능

3. 계정/공개/프로필
   * 로그인/회원가입(로컬 MVP), 프로필 편집, 로그아웃
   * 저장된 프로젝트를 커뮤니티에 공개하고 공개 피드에서 다시 에디터로 불러오기

4. 보안 관련 현재 반영
   * 입력값 정규화(sanitize), 프로젝트명 제한
   * 실행 요청 간단 rate-limit(연속 호출 제한)
   * 비밀번호 단방향 해시 저장(SHA-256)

5. 운영 단계에서 추가해야 할 항목
   * 진짜 다중 사용자 공유를 위한 서버 DB/인증(JWT/OAuth2), RBAC
   * 런타임 운영: 자체 Piston 인스턴스 또는 승인된 실행 API 운영 및 키 관리
   * 업로드 코드 정적/동적 분석(sandbox, seccomp, 네트워크 격리)
   * 감사 로그, 이상 징후 탐지, DDoS 방어(WAF/rate-limit 분산)
   * Arduino/ESP-IDF 실제 빌드/플래시 및 고급 회로 시뮬레이터 연동

==============================================================================
```

