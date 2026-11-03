@echo off
cd /d "%~dp0"

echo ==============================
echo   Git Quick Commit
echo ==============================
echo.

echo [1/5] git pull ...
git pull
echo.

echo [2/5] Changed files (this folder only):
git status --short .
echo.

set /p msg=Commit message:
if "%msg%"=="" set msg=update

echo.
echo [3/5] git add ...
git add .

echo [4/5] git commit ...
git commit -m "%msg%"

echo [5/5] git push ...
git push

echo.
echo ==============================
echo   Done!
echo ==============================
pause
