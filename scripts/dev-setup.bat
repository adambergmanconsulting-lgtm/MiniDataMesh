@echo off
echo.
echo ========================================
echo  MiniDataMesh Development Setup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not available
    echo Please reinstall Node.js with npm
    pause
    exit /b 1
)

echo ✅ Node.js and npm are available

REM Run the setup script
node scripts/dev-setup.js

pause
