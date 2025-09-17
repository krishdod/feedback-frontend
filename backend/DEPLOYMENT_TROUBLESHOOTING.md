# Render Deployment Troubleshooting Guide

## Issue: pydantic-core Build Failure

If you encounter the "Read-only file system" error during `pydantic-core` installation, try these solutions in order:

### Solution 1: Use the Build Script (Recommended)

1. Make sure you have the `build.sh` file in your backend directory
2. The `render.yaml` is already configured to use this script
3. Deploy using this configuration

### Solution 2: Use Simple Requirements

If Solution 1 fails, try using the simpler requirements:

1. Rename `requirements-simple.txt` to `requirements.txt`
2. Update `render.yaml` to use:
   ```yaml
   buildCommand: pip install -r requirements.txt
   ```

### Solution 3: Manual Requirements Installation

If both above fail, try this `render.yaml`:

```yaml
services:
  - type: web
    name: training-feedback-backend
    env: python
    plan: free
    buildCommand: |
      pip install --upgrade pip
      pip install fastapi==0.95.2
      pip install uvicorn==0.22.0
      pip install openpyxl==3.1.2
      pip install pydantic==1.10.8
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: PYTHON_VERSION
        value: 3.9.16
      - key: PIP_NO_CACHE_DIR
        value: "1"
```

### Solution 4: Use Python 3.8

If all above fail, try using Python 3.8:

```yaml
services:
  - type: web
    name: training-feedback-backend
    env: python
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: PYTHON_VERSION
        value: 3.8.18
```

## Steps to Deploy

1. **Push to GitHub**: Make sure all files are committed and pushed to your GitHub repository

2. **Connect to Render**:
   - Go to [render.com](https://render.com)
   - Sign in and click "New +"
   - Select "Web Service"
   - Connect your GitHub repository

3. **Configure the Service**:
   - **Name**: `training-feedback-backend`
   - **Environment**: `Python`
   - **Build Command**: Use one of the solutions above
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Deploy**: Click "Create Web Service"

## After Deployment

1. **Get your backend URL**: It will be something like `https://your-app-name.onrender.com`

2. **Update frontend config**: Update `frontend/src/config.js` with your actual Render URL:
   ```javascript
   production: {
     apiUrl: 'https://your-app-name.onrender.com'
   }
   ```

3. **Redeploy frontend**: Push the updated config to trigger a new Vercel deployment

## Testing

1. Test your backend URL: `https://your-app-name.onrender.com/docs`
2. Test form submission from your frontend
3. Check that data is being saved to the Excel file

## Common Issues

- **Build timeout**: Try the simpler requirements
- **Memory issues**: Use the free plan, which has limitations
- **Cold starts**: First request might be slow, subsequent requests will be faster

## Support

If you continue to have issues:
1. Check Render logs for specific error messages
2. Try different Python versions (3.8, 3.9, 3.10)
3. Consider using a different deployment platform like Railway or Heroku 