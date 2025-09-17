#!/bin/bash

# Build script for Render deployment
# This script handles the installation process to avoid read-only file system issues

echo "Starting build process..."

# Set environment variables to avoid cache issues
export PIP_NO_CACHE_DIR=1
export CARGO_HOME=/tmp/cargo
export RUSTUP_HOME=/tmp/rustup

# Create necessary directories
mkdir -p /tmp/cargo
mkdir -p /tmp/rustup

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies with specific flags to avoid compilation issues
echo "Installing dependencies..."
pip install --no-cache-dir --prefer-binary fastapi==0.104.1
pip install --no-cache-dir --prefer-binary uvicorn==0.24.0
pip install --no-cache-dir --prefer-binary openpyxl==3.1.2
pip install --no-cache-dir --prefer-binary pydantic==2.4.2

echo "Build completed successfully!" 