@echo off
echo Starting the Film Premiere App...
echo.

REM Navigate to the app directory
cd /d "%~dp0"

REM Start the development server in a new command window
start cmd /k npm run dev

REM Wait a few seconds for the server to start
timeout /t 3 /nobreak

REM Open the app in the default browser
start http://localhost:5173/

echo Browser opening... The app should be loading at http://localhost:5173/
