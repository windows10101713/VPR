#!/usr/bin/env pwsh

Write-Host "`n=== Testing Input/GUI Detection ===" -ForegroundColor Yellow

# Test 1: Python with input()
Write-Host "`n[1] Python with input()" -ForegroundColor Cyan
$body = @{
  language = 'python'
  version = '*'
  files = @(@{ name = 'main.py'; content = 'x = input("Enter name: "); print(x)' })
  stdin = 'Alice'
} | ConvertTo-Json
$result = (Invoke-WebRequest -Uri 'http://localhost:3000/api/v2/piston/execute' -Method Post -Body $body -ContentType 'application/json' -UseBasicParsing).Content | ConvertFrom-Json
Write-Host "  hasInput: $($result.meta.hasInput)" -ForegroundColor Green
Write-Host "  hasGui: $($result.meta.hasGui)" -ForegroundColor Green

# Test 2: Python with tkinter
Write-Host "`n[2] Python with tkinter (GUI)" -ForegroundColor Cyan
$body = @{
  language = 'python'
  version = '*'
  files = @(@{ name = 'main.py'; content = 'import tkinter; root = tkinter.Tk()' })
  stdin = ''
} | ConvertTo-Json
$result = (Invoke-WebRequest -Uri 'http://localhost:3000/api/v2/piston/execute' -Method Post -Body $body -ContentType 'application/json' -UseBasicParsing).Content | ConvertFrom-Json
Write-Host "  hasInput: $($result.meta.hasInput)" -ForegroundColor Green
Write-Host "  hasGui: $($result.meta.hasGui)" -ForegroundColor Green
Write-Host "  guiWarning: $($result.meta.guiWarning)" -ForegroundColor Yellow

# Test 3: Python with pygame and input
Write-Host "`n[3] Python with pygame (GUI) + input" -ForegroundColor Cyan
$body = @{
  language = 'python'
  version = '*'
  files = @(@{ name = 'main.py'; content = 'import pygame; import input' })
  stdin = ''
} | ConvertTo-Json
$result = (Invoke-WebRequest -Uri 'http://localhost:3000/api/v2/piston/execute' -Method Post -Body $body -ContentType 'application/json' -UseBasicParsing).Content | ConvertFrom-Json
Write-Host "  hasInput: $($result.meta.hasInput)" -ForegroundColor Green
Write-Host "  hasGui: $($result.meta.hasGui)" -ForegroundColor Green

# Test 4: Java with Scanner
Write-Host "`n[4] Java with Scanner (input)" -ForegroundColor Cyan
$body = @{
  language = 'java'
  version = '*'
  files = @(@{ name = 'Main.java'; content = 'import java.util.Scanner; class Main { public static void main(String[] a) { Scanner s = new Scanner(System.in); System.out.println("ok"); } }' })
  stdin = 'test'
} | ConvertTo-Json
$result = (Invoke-WebRequest -Uri 'http://localhost:3000/api/v2/piston/execute' -Method Post -Body $body -ContentType 'application/json' -UseBasicParsing).Content | ConvertFrom-Json
Write-Host "  hasInput: $($result.meta.hasInput)" -ForegroundColor Green
Write-Host "  hasGui: $($result.meta.hasGui)" -ForegroundColor Green

# Test 5: C with scanf
Write-Host "`n[5] C with scanf (input)" -ForegroundColor Cyan
$body = @{
  language = 'c'
  version = '*'
  files = @(@{ name = 'main.c'; content = '#include <stdio.h>`nint main() { int x; scanf("%d", &x); printf("ok"); return 0; }' })
  stdin = '42'
} | ConvertTo-Json
$result = (Invoke-WebRequest -Uri 'http://localhost:3000/api/v2/piston/execute' -Method Post -Body $body -ContentType 'application/json' -UseBasicParsing).Content | ConvertFrom-Json
Write-Host "  hasInput: $($result.meta.hasInput)" -ForegroundColor Green
Write-Host "  hasGui: $($result.meta.hasGui)" -ForegroundColor Green

# Test 6: JavaScript with prompt (input)
Write-Host "`n[6] JavaScript with prompt (input)" -ForegroundColor Cyan
$body = @{
  language = 'javascript'
  version = '*'
  files = @(@{ name = 'main.js'; content = 'const x = prompt("Enter: "); console.log(x);' })
  stdin = 'test'
} | ConvertTo-Json
$result = (Invoke-WebRequest -Uri 'http://localhost:3000/api/v2/piston/execute' -Method Post -Body $body -ContentType 'application/json' -UseBasicParsing).Content | ConvertFrom-Json
Write-Host "  hasInput: $($result.meta.hasInput)" -ForegroundColor Green
Write-Host "  hasGui: $($result.meta.hasGui)" -ForegroundColor Green

# Test 7: Bash with read
Write-Host "`n[7] Bash with read (input)" -ForegroundColor Cyan
$body = @{
  language = 'bash'
  version = '*'
  files = @(@{ name = 'main.sh'; content = 'read x; echo $x' })
  stdin = 'hello'
} | ConvertTo-Json
$result = (Invoke-WebRequest -Uri 'http://localhost:3000/api/v2/piston/execute' -Method Post -Body $body -ContentType 'application/json' -UseBasicParsing).Content | ConvertFrom-Json
Write-Host "  hasInput: $($result.meta.hasInput)" -ForegroundColor Green
Write-Host "  hasGui: $($result.meta.hasGui)" -ForegroundColor Green

# Test 8: PowerShell with Read-Host
Write-Host "`n[8] PowerShell with Read-Host (input)" -ForegroundColor Cyan
$body = @{
  language = 'powershell'
  version = '*'
  files = @(@{ name = 'main.ps1'; content = '$x = Read-Host "Enter"; Write-Host $x' })
  stdin = 'test'
} | ConvertTo-Json
$result = (Invoke-WebRequest -Uri 'http://localhost:3000/api/v2/piston/execute' -Method Post -Body $body -ContentType 'application/json' -UseBasicParsing).Content | ConvertFrom-Json
Write-Host "  hasInput: $($result.meta.hasInput)" -ForegroundColor Green
Write-Host "  hasGui: $($result.meta.hasGui)" -ForegroundColor Green

Write-Host "`n✓ Detection tests complete!" -ForegroundColor Yellow
