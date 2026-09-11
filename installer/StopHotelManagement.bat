@echo off
title Stop Hotel Management System

echo ==========================================
echo     Stop Hotel Management System
echo ==========================================
echo.

cd /d "%~dp0.."

echo Stopping Hotel Management System...
docker compose down

if errorlevel 1 (
    echo.
    echo ERROR: The application could not be stopped.
    echo Make sure Docker Desktop is running.
    echo.
    pause
    exit /b 1
)

echo.
echo Hotel Management System stopped successfully.
echo Your database data has been preserved.
echo.

timeout /t 3 /nobreak >nul
exit