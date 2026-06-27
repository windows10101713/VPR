@echo off
setlocal

:: Request admin privileges for firewall rule creation
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [VPR] 관리자 권한으로 재시작합니다...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

powershell -ExecutionPolicy Bypass -File "%~dp0start-vpr.ps1"
endlocal
