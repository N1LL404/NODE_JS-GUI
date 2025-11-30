#!/bin/bash

echo "========================================"
echo " Building Electron + Go Desktop App"
echo "========================================"
echo ""

echo "[1/3] Installing Node.js dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed!"
    exit 1
fi
echo ""

echo "[2/3] Building Go server..."
go build -o server server.go
if [ $? -ne 0 ]; then
    echo "ERROR: Go build failed! Make sure Go is installed."
    exit 1
fi
echo ""

echo "[3/3] Making server executable..."
chmod +x server
echo ""

echo "========================================"
echo " All done! Run 'npm start' to launch"
echo "========================================"

