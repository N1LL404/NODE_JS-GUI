#!/bin/bash

echo "================================================"
echo " Building Executable"
echo "================================================"
echo ""

# Detect platform
if [[ "$OSTYPE" == "darwin"* ]]; then
    PLATFORM="mac"
    GO_OUTPUT="server"
    BUILD_SCRIPT="dist:mac"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    PLATFORM="linux"
    GO_OUTPUT="server"
    BUILD_SCRIPT="dist:linux"
else
    echo "Unsupported platform: $OSTYPE"
    exit 1
fi

echo "Building for: $PLATFORM"
echo ""

echo "[Step 1/4] Checking if electron-builder is installed..."
if ! npm list electron-builder > /dev/null 2>&1; then
    echo "electron-builder not found. Installing..."
    npm install --save-dev electron-builder
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install electron-builder"
        exit 1
    fi
fi
echo "electron-builder is installed!"
echo ""

echo "[Step 2/4] Installing Node.js dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed!"
    exit 1
fi
echo ""

echo "[Step 3/4] Building Go server..."
go build -o "$GO_OUTPUT" server.go
if [ $? -ne 0 ]; then
    echo "ERROR: Go build failed! Make sure Go is installed."
    echo "Download Go from: https://golang.org/dl/"
    exit 1
fi
chmod +x "$GO_OUTPUT"
echo "Go server built successfully!"
echo ""

echo "[Step 4/4] Building $PLATFORM executable..."
echo "This may take a few minutes..."
npm run "$BUILD_SCRIPT"
if [ $? -ne 0 ]; then
    echo "ERROR: Build failed!"
    exit 1
fi
echo ""

echo "================================================"
echo " BUILD COMPLETE!"
echo "================================================"
echo ""
echo "Your executable files are in the 'dist' folder:"
echo ""
ls -lh dist/ | grep -E '\.(dmg|AppImage|deb)$' || ls -lh dist/
echo ""
echo "You can distribute these files to other computers!"
echo ""
echo "================================================"

