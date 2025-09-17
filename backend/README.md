# Training Feedback Backend

FastAPI backend for the Training Feedback Form application.

## Local Development

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
uvicorn main:app --host 0.0.0.0 --port 9000 --reload
```

## Google Sheets Persistence

This backend can persist feedback data in Google Sheets using a service account. If Sheets is configured, all read/write/delete operations use Sheets. If not, it falls back to the local Excel file `Training Feedback.xlsx` (useful for local testing only).

### Required Environment Variables

- `GOOGLE_SERVICE_ACCOUNT_JSON` — The service account credentials JSON. You can provide either the raw JSON string or a base64-encoded JSON string.
- `GOOGLE_SHEETS_SPREADSHEET_ID` — The target spreadsheet ID (the long ID from the Google Sheets URL).
- `GOOGLE_SHEETS_TAB_NAME` — Optional; sheet/tab name. Defaults to `Sheet1`.

### Service Account Setup

1. Create a Google Cloud project, enable the "Google Sheets API" and "Google Drive API".
2. Create a service account and generate a JSON key.
3. Share your target Google Sheet with the service account email (Editor access).
4. Set the environment variables before starting the server.

Examples (PowerShell):

```powershell
$env:GOOGLE_SERVICE_ACCOUNT_JSON = (Get-Content -Raw -Path .\service-account.json)
$env:GOOGLE_SHEETS_SPREADSHEET_ID = "YOUR_SPREADSHEET_ID"
$env:GOOGLE_SHEETS_TAB_NAME = "Sheet1"
uvicorn main:app --host 0.0.0.0 --port 9000 --reload
```

Or base64 encode the JSON and set it:

```powershell
$b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes(".\service-account.json"))
$env:GOOGLE_SERVICE_ACCOUNT_JSON = $b64
```

### Endpoints

## API Endpoints

- `POST /submit-feedback` - Submit training feedback
- `GET /view-data` - List all feedback (from Google Sheets if configured)
- `GET /download-excel` - Export data to Excel (generated from Sheets if configured)
- `DELETE /delete-feedback/{submission_id}` - Delete a feedback entry by Submission ID

## Deployment on Render

This backend is configured for deployment on Render using the `render.yaml` file.

### Environment Variables

- `PORT` - Automatically set by Render
- `PYTHON_VERSION` - Set to 3.9.16

### Files Required for Deployment

- `main.py` - FastAPI application
- `requirements.txt` - Python dependencies
- `render.yaml` - Render configuration
- `Training Feedback.xlsx` - Excel template file 