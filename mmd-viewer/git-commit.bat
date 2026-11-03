@echo off
cd /d "%~dp0"

echo ==============================
echo   Git Quick Commit
echo ==============================
echo.

echo [1/4] Changed files:
git status --short
echo.

set /p msg=Commit message:
if "%msg%"=="" set msg=update

echo.
echo [2/4] git add ...
git add .

echo [3/4] git commit ...
git commit -m "%msg%"

echo [4/4] git push ...
git push

echo.
echo ==============================
echo   Done!
echo ==============================
pause
