@echo off
echo ========================================
echo  Building Electron + Go Desktop App
echo ========================================
echo.

echo [1/3] Installing Node.js dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)
echo.

echo [2/3] Building Go server...
go build -o server.exe server.go
if errorlevel 1 (
    echo ERROR: Go build failed! Make sure Go is installed.
    pause
    exit /b 1
)
echo.

echo [3/3] Build complete!
echo.
echo ========================================
echo  All done! Run 'npm start' to launch
echo ========================================
pause

