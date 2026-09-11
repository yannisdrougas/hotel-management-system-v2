@echo off
setlocal EnableDelayedExpansion

title Hotel Management System Launcher

echo ==========================================
echo     Hotel Management System Launcher
echo ==========================================
echo.

REM =====================================================
REM GO TO APPLICATION ROOT
REM installer\StartHotelManagement.bat -> project root
REM =====================================================

cd /d "%~dp0.."

echo Application folder:
echo %CD%
echo.


REM =====================================================
REM CHECK DOCKER
REM =====================================================

echo Checking Docker installation...

where docker >nul 2>&1
if errorlevel 1 goto DockerNotInstalled

echo Docker found.
echo.


REM =====================================================
REM CHECK DOCKER ENGINE
REM =====================================================

echo Checking Docker Engine...

docker info >nul 2>&1
if not errorlevel 1 goto DockerReady

echo Docker Desktop is not running.
echo Starting Docker Desktop...
echo.

if not exist "%ProgramFiles%\Docker\Docker\Docker Desktop.exe" goto DockerDesktopNotFound

start "" "%ProgramFiles%\Docker\Docker\Docker Desktop.exe"

echo Waiting for Docker Desktop to become ready...
echo.

set attempts=0


:WaitForDocker

timeout /t 5 /nobreak >nul

docker info >nul 2>&1
if not errorlevel 1 goto DockerReady

set /a attempts+=1

echo Waiting for Docker... !attempts!/24

if !attempts! GEQ 24 goto DockerTimeout

goto WaitForDocker


REM =====================================================
REM DOCKER READY
REM =====================================================

:DockerReady

echo.
echo Docker Engine is ready.
echo.


REM =====================================================
REM START / REBUILD APPLICATION
REM =====================================================

echo Starting Hotel Management System...
echo.

docker compose up -d --build

if errorlevel 1 goto ApplicationError


REM =====================================================
REM VERIFY CONTAINERS
REM =====================================================

echo.
echo Docker services:
docker compose ps
echo.


REM =====================================================
REM WAIT FOR FRONTEND
REM =====================================================

echo Waiting for frontend to become available...
echo.

set frontendAttempts=0


:WaitForFrontend

powershell -NoProfile -Command ^
    "try { $r = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 3; if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 500) { exit 0 } else { exit 1 } } catch { exit 1 }"

if not errorlevel 1 goto FrontendReady

set /a frontendAttempts+=1

echo Waiting for frontend... !frontendAttempts!/30

if !frontendAttempts! GEQ 30 goto FrontendTimeout

timeout /t 3 /nobreak >nul

goto WaitForFrontend


REM =====================================================
REM FRONTEND READY
REM =====================================================

:FrontendReady

echo.
echo Frontend is ready.
echo Opening Hotel Management System...
echo.

start "" "http://localhost:3000"

echo.
echo Application started successfully.
echo.

timeout /t 3 /nobreak >nul
exit /b 0


REM =====================================================
REM ERRORS
REM =====================================================

:DockerNotInstalled

echo.
echo ERROR: Docker is not installed or is not available in PATH.
echo Please install Docker Desktop first.
echo.
pause
exit /b 1


:DockerDesktopNotFound

echo.
echo ERROR: Docker Desktop executable was not found.
echo Expected location:
echo %ProgramFiles%\Docker\Docker\Docker Desktop.exe
echo.
pause
exit /b 1


:DockerTimeout

echo.
echo ERROR: Docker Desktop did not become ready within 2 minutes.
echo Please start Docker Desktop manually and try again.
echo.
pause
exit /b 1


:FrontendTimeout

echo.
echo ERROR: The frontend did not become available.
echo.
echo Current Docker status:
docker compose ps
echo.
echo Check Docker Desktop and try again.
echo.
pause
exit /b 1


:ApplicationError

echo.
echo ERROR: Hotel Management System could not be started.
echo.
echo Docker status:
docker compose ps
echo.
pause
exit /b 1