@echo off
echo ============================================
echo   PROJECT ALLOCATION TRACKER
echo   Starting Development Servers
echo ============================================
echo.

echo [1/2] Starting Backend...
echo.
start cmd /k "title Backend Server (Port 8080) && cd backend && mvn spring-boot:run"

echo Waiting 10 seconds for backend to start...
timeout /t 10 /nobreak >nul

echo.
echo [2/2] Starting Frontend...
echo.
start cmd /k "title Frontend Server (Port 3000) && cd frontend && npm install && npm run dev"

echo.
echo ============================================
echo   SERVERS STARTING...
echo ============================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:3000
echo H2 Console: http://localhost:8080/h2-console
echo.
echo Wait for both servers to fully start...
echo Then open: http://localhost:3000
echo.
echo Press any key to open browser...
pause >nul

start http://localhost:3000

echo.
echo ============================================
echo   Running! Close terminal windows to stop.
echo ============================================
pause

