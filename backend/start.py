#!/usr/bin/env python3
"""
Production startup script for Render deployment
"""
import uvicorn
import os
from main import app

if __name__ == "__main__":
    print("🚀 Starting FastAPI server for production...")
    port = int(os.environ.get("PORT", 9000))
    print(f"🌐 Server will run on port {port}")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=False,
        log_level="info"
    )
