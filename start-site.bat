@echo off
cd /d "%~dp0"
where python >nul 2>&1
if errorlevel 1 (
  echo Python is required to serve this site so the song can play.
  echo Install Python, then double-click this file again.
  pause
  exit /b 1
)
start "Site server" /min python -m http.server 8765 --bind 127.0.0.1
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:8765/index.html
