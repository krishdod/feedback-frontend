# 📊 Training Feedback System

A complete training feedback system with web dashboard and Google Sheets integration.

## 🚀 Quick Start

### 1. Deploy Backend (Render)
```bash
cd backend
# Deploy to Render with these environment variables:
# GOOGLE_SERVICE_ACCOUNT_JSON=your_service_account_json
# GOOGLE_SHEETS_SPREADSHEET_ID=your_sheet_id
# GOOGLE_SHEETS_TAB_NAME=Sheet1
```

### 2. Deploy Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### 3. Add Google Sheets Button
1. Open your Google Sheet
2. Go to Extensions → Apps Script
3. Copy code from `deployed-dashboard-button.gs`
4. Update URLs with your deployment URLs
5. Run `addDashboardButton()`

## 📁 Project Structure

```
├── admin-dashboard.html          # Web admin dashboard
├── deployed-dashboard-button.gs  # Google Sheets button script
├── DEPLOYMENT_GUIDE.md          # Deployment instructions
├── backend/                     # Python API server
│   ├── main.py                  # FastAPI application
│   ├── requirements.txt         # Python dependencies
│   └── service-account.json     # Google Sheets credentials
└── frontend/                    # React application
    ├── src/                     # Source code
    └── build/                   # Production build
```

## 🌐 URLs After Deployment

- **Frontend**: `https://your-app.vercel.app`
- **Admin Dashboard**: `https://your-app.vercel.app/admin-dashboard.html`
- **Backend API**: `https://your-backend.onrender.com`
- **Google Sheet**: Your existing sheet with button

## 🎯 Features

✅ **Feedback Form** - Collect training feedback
✅ **Web Admin Dashboard** - View and manage submissions
✅ **Google Sheets Integration** - Automatic data storage
✅ **Google Sheets Button** - Quick access to dashboard
✅ **Mobile Friendly** - Works on all devices
✅ **Real-time Updates** - Data syncs instantly

## 🔧 Configuration

Update these URLs in `deployed-dashboard-button.gs`:
```javascript
const vercelUrl = 'https://your-app.vercel.app/admin-dashboard.html';
const renderUrl = 'https://your-backend.onrender.com';
```

## 📱 Mobile Access

Everything works on mobile:
- Feedback form
- Admin dashboard
- Google Sheets
- Button functionality

## 🎉 Ready to Deploy!

Follow the `DEPLOYMENT_GUIDE.md` for detailed deployment instructions.
