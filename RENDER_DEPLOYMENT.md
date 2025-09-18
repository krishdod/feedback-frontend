# Render Deployment Guide

## Backend Deployment

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Configure the following settings:**
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && python main.py`
   - **Python Version**: 3.9.16

4. **Set Environment Variables:**
   - `GOOGLE_SERVICE_ACCOUNT_JSON`: Your Google Service Account JSON (as a string)
   - `GOOGLE_SHEETS_SPREADSHEET_ID`: Your Google Sheets ID
   - `GOOGLE_SHEETS_TAB_NAME`: Sheet tab name (default: "Sheet1")

## Frontend Deployment

1. **Create a new Static Site on Render**
2. **Connect your GitHub repository**
3. **Configure the following settings:**
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`

## Environment Variables Setup

### Backend Environment Variables:
```
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"your-project",...}
GOOGLE_SHEETS_SPREADSHEET_ID=1BYCStdQILVx8DHFxeRWe5jlISGxgSWikHyuUy_NgoMY
GOOGLE_SHEETS_TAB_NAME=Sheet1
```

### Getting Google Service Account JSON:
1. Go to Google Cloud Console
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create Service Account
5. Download JSON key file
6. Copy the entire JSON content as a string for the environment variable

## Testing the Deployment

1. **Backend Health Check**: `https://your-backend-url.onrender.com/health`
2. **Frontend**: `https://your-frontend-url.onrender.com`
3. **Admin Dashboard**: `https://your-frontend-url.onrender.com/admin-dashboard.html`

## Troubleshooting

- Make sure all environment variables are set correctly
- Check the build logs for any missing dependencies
- Verify the Google Sheets API is enabled
- Ensure the service account has access to your Google Sheet
