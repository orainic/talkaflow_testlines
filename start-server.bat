@echo off
echo Starting Ultravox Test Server...
echo.
echo This will start a local web server to resolve CORS issues.
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH.
    echo Please install Python from https://python.org
    echo.
    pause
    exit /b 1
)

echo Python found. Starting server...
echo.

REM Start the Python server
python server.py

pause