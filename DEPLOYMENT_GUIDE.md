# Deployment Guide for Training Feedback Form

This guide will help you deploy both the frontend (Vercel) and backend (Render) of your Training Feedback Form application.

## Backend Deployment on Render

### Step 1: Prepare Your Backend Files

Ensure your backend directory (`training-feedback-form/backend/`) contains these files:

- ✅ `main.py` - FastAPI application
- ✅ `requirements.txt` - Python dependencies
- ✅ `render.yaml` - Render configuration
- ✅ `Training Feedback.xlsx` - Excel template
- ✅ `.gitignore` - Git ignore rules
- ✅ `README.md` - Documentation

### Step 2: Create a GitHub Repository

1. Create a new repository on GitHub
2. Push your entire project to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### Step 3: Deploy on Render

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up or login with your GitHub account

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository you just created

3. **Configure the Service**
   - **Name**: `training-feedback-backend` (or your preferred name)
   - **Environment**: `Python 3`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `training-feedback-form/backend` (if your repo contains the entire project)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Environment Variables** (Optional)
   - `PYTHON_VERSION`: `3.9.16`

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application
   - Wait for the build to complete (usually 2-5 minutes)

6. **Get Your Backend URL**
   - Once deployed, you'll get a URL like: `https://your-app-name.onrender.com`
   - Copy this URL for the next step

### Step 4: Update Frontend Configuration

1. **Update the Production API URL**
   - Open `training-feedback-form/frontend/src/config.js`
   - Replace `'https://your-render-backend-url.onrender.com'` with your actual Render URL
   ```javascript
   production: {
     apiUrl: 'https://your-actual-render-url.onrender.com'
   }
   ```

2. **Test Locally**
   ```bash
   cd training-feedback-form/frontend
   npm start
   ```
   - The app should now connect to your deployed backend

## Frontend Deployment on Vercel

### Step 1: Prepare Your Frontend

1. **Update API Configuration** (if not done already)
   - Ensure `config.js` has the correct production URL

2. **Test Build Locally**
   ```bash
   cd training-feedback-form/frontend
   npm run build
   ```

### Step 2: Deploy on Vercel

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or login with your GitHub account

2. **Import Your Repository**
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure the Project**
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `training-feedback-form/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Environment Variables** (if needed)
   - Add any environment variables your app needs

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your frontend
   - You'll get a URL like: `https://your-app-name.vercel.app`

## Testing Your Deployment

### Test Backend API
```bash
# Test the deployed backend directly
curl -X POST https://your-render-url.onrender.com/submit-feedback \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "job_role": "Developer",
    "training_title": "Test Training",
    "instructor_name": "Test Instructor",
    "content_ratings": [4, 4, 4, 4],
    "trainer_ratings": [4, 4, 4, 4, 4, 4],
    "organization_ratings": [4, 4, 4],
    "overall_ratings": [4, 4, 4],
    "covered_topics": ["Introduction"],
    "other_topic": "",
    "comments": "Test comment"
  }'
```

### Test Frontend
1. Visit your Vercel URL
2. Fill out the form
3. Submit and verify data appears in your Excel file

## Troubleshooting

### Common Issues

1. **Backend Build Fails**
   - Check `requirements.txt` has all dependencies
   - Ensure `main.py` has no syntax errors
   - Check Render logs for specific error messages

2. **Frontend Can't Connect to Backend**
   - Verify the API URL in `config.js` is correct
   - Check CORS settings in backend
   - Ensure backend is running and accessible

3. **Excel File Not Found**
   - Ensure `Training Feedback.xlsx` is in the backend directory
   - Check file permissions on Render

4. **CORS Errors**
   - Backend already has CORS configured for all origins
   - If issues persist, check browser console for specific errors

### Render Logs
- Go to your Render dashboard
- Click on your service
- Go to "Logs" tab to see build and runtime logs

### Vercel Logs
- Go to your Vercel dashboard
- Click on your project
- Go to "Functions" tab to see function logs

## Maintenance

### Updating Your Application

1. **Make changes to your code**
2. **Test locally**
3. **Push to GitHub**
4. **Render and Vercel will automatically redeploy**

### Monitoring

- **Render**: Monitor your service in the Render dashboard
- **Vercel**: Check analytics and performance in Vercel dashboard
- **Excel File**: Download and check your Excel file periodically

## Security Considerations

1. **API Security**
   - Consider adding authentication for production
   - Implement rate limiting
   - Add input validation

2. **Data Protection**
   - Consider encrypting sensitive data
   - Implement proper data backup
   - Follow GDPR/privacy regulations

3. **Environment Variables**
   - Use environment variables for sensitive data
   - Never commit API keys or secrets to Git

## Cost Optimization

### Render Free Tier
- 750 hours/month free
- Sleeps after 15 minutes of inactivity
- First request after sleep takes 10-30 seconds

### Vercel Free Tier
- Unlimited deployments
- 100GB bandwidth/month
- 100GB storage

## Support

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **FastAPI Documentation**: [fastapi.tiangolo.com](https://fastapi.tiangolo.com)
- **React Documentation**: [reactjs.org](https://reactjs.org) 