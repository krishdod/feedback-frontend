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

## API Endpoints

- `POST /submit-feedback` - Submit training feedback

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