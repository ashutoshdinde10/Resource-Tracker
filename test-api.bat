@echo off
echo ================================================
echo Testing Project Allocation Tracker API
echo ================================================
echo.

echo Waiting for application to start...
timeout /t 10 /nobreak >nul

echo.
echo Testing Users API...
curl -s http://localhost:8080/api/users
echo.
echo.

echo Testing Projects API...
curl -s http://localhost:8080/api/projects
echo.
echo.

echo Testing Allocations API...
curl -s http://localhost:8080/api/allocations
echo.
echo.

echo ================================================
echo Test Complete!
echo ================================================
echo.
echo Open http://localhost:8080 in your browser to see the UI
pause

