# MSYS2로 gcc, g++, gfortran, nasm, sqlite3 설치
# MSYS2 완료 후 이 스크립트 실행
C:\msys64\usr\bin\bash.exe -lc "pacman -Syu --noconfirm 2>&1 | tail -5"
Start-Sleep 3
C:\msys64\usr\bin\bash.exe -lc "pacman -S --noconfirm mingw-w64-x86_64-gcc mingw-w64-x86_64-gcc-fortran mingw-w64-x86_64-nasm sqlite3 2>&1 | tail -10"

# PATH에 MinGW 추가
$mingwPath = "C:\msys64\mingw64\bin"
$currentPath = [System.Environment]::GetEnvironmentVariable("PATH", "User")
if ($currentPath -notlike "*msys64*") {
    [System.Environment]::SetEnvironmentVariable("PATH", "$mingwPath;$currentPath", "User")
    Write-Host "MinGW PATH 추가 완료: $mingwPath"
}

# 확인
$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH','User')
Write-Host ""
Write-Host "=== 설치 확인 ==="
foreach ($t in @('gcc','g++','gfortran','nasm')) {
    $r = Get-Command $t -ErrorAction SilentlyContinue
    Write-Host ($(if($r){'OK'}else{'MISS'}) + ' ' + $t)
}
