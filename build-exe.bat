@echo off
echo ================================================
echo  Building Windows Executable (.exe)
echo ================================================
echo.

echo [Step 1/4] Checking if electron-builder is installed...
call npm list electron-builder >nul 2>&1
if errorlevel 1 (
    echo electron-builder not found. Installing...
    call npm install --save-dev electron-builder
    if errorlevel 1 (
        echo ERROR: Failed to install electron-builder
        pause
        exit /b 1
    )
)
echo electron-builder is installed!
echo.

echo [Step 2/4] Installing Node.js dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)
echo.

echo [Step 3/4] Building Go server...
go build -o server.exe server.go
if errorlevel 1 (
    echo ERROR: Go build failed! Make sure Go is installed.
    echo Download Go from: https://golang.org/dl/
    pause
    exit /b 1
)
echo Go server built successfully!
echo.

echo [Step 4/4] Building Windows executable...
echo This may take a few minutes...
call npm run dist:win
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo.

echo ================================================
echo  BUILD COMPLETE!
echo ================================================
echo.
echo Your executable files are in the "dist" folder:
echo.
echo   Installer: dist\My Desktop App Setup 1.0.0.exe
echo   Portable:  dist\My Desktop App 1.0.0.exe
echo.
echo You can distribute these files to other computers!
echo.
echo ================================================
pause

