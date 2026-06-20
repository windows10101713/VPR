$ErrorActionPreference = "Continue"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

$ollamaPath = "C:\Users\user\AppData\Local\Programs\Ollama\ollama.exe"
$nodeCmd = "node"

$basePath = "C:\Users\user\AppData\Local\Programs\Ollama;C:\msys64\mingw64\bin;C:\msys64\mingw32\bin;C:\msys64\usr\bin;" + [System.Environment]::GetEnvironmentVariable("PATH", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH", "User")
$env:PATH = $basePath

function Test-PortOpen {
  param([int]$Port)
  try {
    $client = New-Object System.Net.Sockets.TcpClient
    $asyncResult = $client.BeginConnect("127.0.0.1", $Port, $null, $null)
    $wait = $asyncResult.AsyncWaitHandle.WaitOne(600)
    if (-not $wait) {
      $client.Close()
      return $false
    }
    $client.EndConnect($asyncResult)
    $client.Close()
    return $true
  } catch {
    return $false
  }
}

Write-Host "[VPR] boot script started" -ForegroundColor Cyan

if (-not (Test-Path $ollamaPath)) {
  Write-Host "[VPR] Ollama not found at $ollamaPath" -ForegroundColor Yellow
  Write-Host "[VPR] AI provider may fail until Ollama is installed." -ForegroundColor Yellow
} else {
  if (-not (Test-PortOpen -Port 11434)) {
    Write-Host "[VPR] starting Ollama service..." -ForegroundColor Green
    Start-Process -FilePath $ollamaPath -ArgumentList "serve" -WindowStyle Hidden
    Start-Sleep -Seconds 2
  }

  if (Test-PortOpen -Port 11434) {
    Write-Host "[VPR] Ollama is online (11434)" -ForegroundColor Green
  } else {
    Write-Host "[VPR] Ollama is still offline" -ForegroundColor Yellow
  }
}

if (Test-PortOpen -Port 3000) {
  Write-Host "[VPR] local-server already running on 3000" -ForegroundColor Yellow
  Write-Host "[VPR] opening editor in browser..." -ForegroundColor Cyan
  Start-Sleep -Seconds 1
  Start-Process "file:///$($projectRoot -replace '\\', '/')/editor.html"
  exit 0
}

Write-Host "[VPR] starting local-server.js..." -ForegroundColor Green
$serverProcess = Start-Process -FilePath $nodeCmd -ArgumentList "local-server.js" -PassThru -NoNewWindow

Write-Host "[VPR] waiting for server to start..." -ForegroundColor Green
$maxRetries = 10
$retryCount = 0
while (-not (Test-PortOpen -Port 3000) -and $retryCount -lt $maxRetries) {
  Start-Sleep -Seconds 1
  $retryCount++
}

if (Test-PortOpen -Port 3000) {
  Write-Host "[VPR] ✓ Server is online! (port 3000)" -ForegroundColor Green
  Write-Host "[VPR] opening editor in browser..." -ForegroundColor Green
  Start-Sleep -Seconds 1
  Start-Process "file:///$($projectRoot -replace '\\', '/')/editor.html"
  Write-Host "[VPR] VPR 시작 완료! Editor가 브라우저에서 열렸습니다." -ForegroundColor Cyan
  Write-Host "[VPR] 브라우저에서 닫으면 아래에서 이 창을 닫으세요." -ForegroundColor Cyan
  Write-Host "[VPR] 서버 중지: Ctrl+C" -ForegroundColor Yellow
} else {
  Write-Host "[VPR] ✗ Server failed to start within timeout" -ForegroundColor Red
  $serverProcess | Stop-Process -Force -ErrorAction SilentlyContinue
  exit 1
}
