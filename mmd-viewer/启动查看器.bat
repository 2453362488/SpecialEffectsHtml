@echo off
cd /d "C:\Users\Administrator\Doubao"
start "" http://localhost:8765/mmd-viewer/mmd-viewer.html
python -m http.server 8765
pause
