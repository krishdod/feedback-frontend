#!/usr/bin/env python3
"""
Production startup script for Render deployment
"""
import uvicorn
from main import app

if __name__ == "__main__":
    print("🚀 Starting FastAPI server for production...")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=9000,
        reload=False,
        log_level="info"
    )
