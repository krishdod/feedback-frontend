# 🚀 Deployment Guide for Training Feedback System

## 📋 **Overview**

Deploy your training feedback system to Vercel (frontend) and Render (backend) for global access.

## 🌐 **Frontend Deployment (Vercel)**

### Step 1: Prepare Frontend
```bash
cd frontend
npm run build
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository
5. Set build command: `npm run build`
6. Set output directory: `build`
7. Deploy!

### Step 3: Update Configuration
In `frontend/src/config.js`, update the production URL:
   ```javascript
const config = {
   production: {
    apiUrl: 'https://your-backend-name.onrender.com' // Your Render URL
   }
};
   ```

## 🔧 **Backend Deployment (Render)**

### Step 1: Prepare Backend
   ```bash
cd backend
# Make sure all files are ready
```

### Step 2: Deploy to Render
1. Go to [render.com](https://render.com)
2. Sign up/Login
3. Click "New Web Service"
4. Connect your GitHub repository
5. Set build command: `pip install -r requirements.txt`
6. Set start command: `python main.py`
7. Deploy!

### Step 3: Set Environment Variables
In Render dashboard, add these environment variables:
```
GOOGLE_SERVICE_ACCOUNT_JSON=your_service_account_json
GOOGLE_SHEETS_SPREADSHEET_ID=1BYCStdQILVx8DHFxeRWe5jlISGxgSWikHyuUy_NgoMY
GOOGLE_SHEETS_TAB_NAME=Sheet1
```

## 📊 **Google Sheets Button Setup**

### Step 1: Add Button Script
1. Open your Google Sheet
2. Go to Extensions → Apps Script
3. Copy the code from `deployed-dashboard-button.gs`
4. Save the script

### Step 2: Update URLs
In the script, replace these URLs with your actual deployment URLs:
```javascript
const vercelUrl = 'https://your-app-name.vercel.app/admin-dashboard.html';
const renderUrl = 'https://your-app-name.onrender.com/admin-dashboard.html';
```

### Step 3: Run Setup
1. Select `addDashboardButton` from the dropdown
2. Click Run
3. Grant permissions when prompted
4. Go back to your Google Sheet - you'll see the button!

## 🎯 **Final URLs**

After deployment, you'll have:

| Component | URL | Purpose |
|-----------|-----|---------|
| **Frontend** | `https://your-app.vercel.app` | Main feedback form |
| **Admin Dashboard** | `https://your-app.vercel.app/admin-dashboard.html` | Web admin dashboard |
| **Backend API** | `https://your-backend.onrender.com` | API server |
| **Google Sheet** | Your existing sheet | Data storage + button |

## 🔄 **How It Works**

1. **Users submit feedback** → Frontend (Vercel)
2. **Data saves to Google Sheets** → Backend (Render) → Google Sheets
3. **Admin views data** → Google Sheet button → Web dashboard (Vercel)
4. **Real-time updates** → All components stay in sync

## 🛠️ **Troubleshooting**

### Frontend Issues
- Check if build completed successfully
- Verify API URL in config.js
- Check browser console for errors

### Backend Issues
- Check Render logs for errors
- Verify environment variables are set
- Test API endpoints directly

### Google Sheets Issues
- Make sure service account has access
- Check if button script ran successfully
- Verify URLs are correct

## 🎉 **Benefits of This Setup**

✅ **Global Access** - Available anywhere in the world
✅ **Automatic Updates** - Changes deploy automatically
✅ **Scalable** - Handles traffic spikes
✅ **Reliable** - Multiple deployment options
✅ **Mobile Friendly** - Works on all devices
✅ **Real-time** - Data updates instantly
✅ **Secure** - Environment variables protected
✅ **Free** - Vercel and Render free tiers

## 📱 **Mobile Access**

Your deployed system works perfectly on mobile:
- **Feedback form** - Mobile-optimized
- **Admin dashboard** - Responsive design
- **Google Sheets** - Mobile app or browser
- **Button** - Works on mobile Google Sheets

## 🔐 **Security Notes**

- Environment variables are encrypted in Render
- Google Sheets access is controlled by service account
- HTTPS enabled by default on both platforms
- No sensitive data in frontend code

## 🚀 **Quick Start Commands**

```bash
# Frontend
cd frontend
npm run build
# Deploy to Vercel

# Backend
cd backend
# Deploy to Render with environment variables

# Google Sheets
# Add button script and run addDashboardButton()
```

Your training feedback system is now globally accessible! 🌍