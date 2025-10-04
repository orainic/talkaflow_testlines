@echo off
echo ===============================================
echo    Ultravox Voice AI Server Startup
echo ===============================================
echo.

REM Kill any existing processes on port 8080
echo Checking for existing servers on port 8080...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080') do (
    echo Found process %%a using port 8080, terminating...
    taskkill /f /pid %%a >nul 2>&1
)

REM Wait a moment for cleanup
timeout /t 2 /nobreak >nul

echo.
echo Starting HTTP server on port 8080...
echo.
echo Available pages:
echo   - Main Interface: http://localhost:8080/start-ultravox.html
echo   - Alternative:    http://localhost:8080/ultravox-direct.html
echo.
echo Press Ctrl+C to stop the server
echo ===============================================
echo.

REM Start the Python HTTP server
python -m http.server 8080

echo.
echo Server stopped.
pause