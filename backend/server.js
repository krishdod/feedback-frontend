const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json());

// Add request logging middleware only in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });
}

// Google Sheets setup
let sheets;
try {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  sheets = google.sheets({ version: 'v4', auth });
} catch (error) {
  console.error('Error setting up Google Sheets:', error);
}

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Helper function to format date
const formatDate = () => new Date().toLocaleString();

// API endpoint to submit feedback
app.post('/api/submit-feedback', async (req, res) => {
  console.log('Received feedback submission:', JSON.stringify(req.body, null, 2));
  
  try {
    const {
      details,
      contentImpact,
      trainer,
      organization,
      overall,
      coveredTopics,
      coveredTopicsOther,
      comments
    } = req.body;

    // Validate required fields
    if (!details || !details.name || !details.email) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if Google Sheets is configured
    if (!sheets || !SPREADSHEET_ID) {
      console.error('Google Sheets not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Prepare the row data
    const rowData = [
      formatDate(),
      details.name,
      details.email,
      details.role,
      details.title,
      details.instructor,
      contentImpact[0] || '',
      contentImpact[1] || '',
      contentImpact[2] || '',
      contentImpact[3] || '',
      '',
      trainer[0] || '',
      trainer[1] || '',
      trainer[2] || '',
      trainer[3] || '',
      trainer[4] || '',
      trainer[5] || '',
      '',
      organization[0] || '',
      organization[1] || '',
      organization[2] || '',
      '',
      overall[0] || '',
      overall[1] || '',
      overall[2] || '',
      '',
      coveredTopics.join(', '),
      coveredTopicsOther || '',
      comments || ''
    ];

    console.log('Saving to Google Sheets:', rowData);

    // Append the data to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:AC',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowData],
      },
    });

    console.log('Feedback saved successfully to Google Sheets');

    res.status(200).json({ 
      message: 'Feedback submitted successfully',
      data: {
        timestamp: formatDate(),
        details,
        contentImpact,
        trainer,
        organization,
        overall,
        coveredTopics,
        coveredTopicsOther,
        comments
      }
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ 
      error: 'Failed to submit feedback',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    googleSheets: !!sheets,
    spreadsheetId: !!SPREADSHEET_ID
  });
});

// Start server with error handling
const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server is running on port ${port}`);
    console.log(`Health check available at http://localhost:${port}/api/health`);
  }
}).on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please try a different port or kill the process using this port.`);
    process.exit(1);
  } else {
    console.error('Error starting server:', error);
    process.exit(1);
  }
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
}); 