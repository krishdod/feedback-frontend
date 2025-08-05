from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from openpyxl import load_workbook
from uuid import uuid4
from datetime import datetime
import os

app = FastAPI()
print("🚀 FastAPI is initializing...")


# Allow all origins for now (customize later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

EXCEL_FILE = "Training Feedback.xlsx"  # Excel file in the same directory

# Define expected data from frontend
class FeedbackForm(BaseModel):
    full_name: str
    email: str
    job_role: str
    training_title: str
    instructor_name: str
    content_ratings: list[int]
    trainer_ratings: list[int]
    organization_ratings: list[int]
    overall_ratings: list[int]
    covered_topics: list[str]
    other_topic: str
    comments: str

@app.get("/")
async def root():
    return {"message": "Training Feedback API is running!", "endpoints": ["/submit-feedback", "/view-data", "/download-excel", "/docs"]}

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring and wake-up detection"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Training Feedback API"
    }

@app.get("/view-data")
async def view_data():
    """View all stored feedback data"""
    try:
        if not os.path.exists(EXCEL_FILE):
            return {"status": "error", "message": f"{EXCEL_FILE} not found."}
        
        wb = load_workbook(EXCEL_FILE)
        ws = wb.active
        
        data = []
        headers = []
        
        # Get headers (first row)
        for cell in ws[1]:
            headers.append(cell.value)
        
        # Get all data rows
        for row in ws.iter_rows(min_row=2, values_only=True):
            if any(cell is not None for cell in row):  # Skip empty rows
                data.append(row)
        
        return {
            "status": "success",
            "total_submissions": len(data),
            "headers": headers,
            "data": data
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/download-excel")
async def download_excel():
    """Download the Excel file with all stored data"""
    try:
        if not os.path.exists(EXCEL_FILE):
            return {"status": "error", "message": f"{EXCEL_FILE} not found."}
        
        return FileResponse(
            path=EXCEL_FILE,
            filename="Training_Feedback_Data.xlsx",
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/submit-feedback")
async def submit_feedback(form: FeedbackForm):
    try:
        if not os.path.exists(EXCEL_FILE):
            return {"status": "error", "message": f"{EXCEL_FILE} not found."}

        wb = load_workbook(EXCEL_FILE)
        ws = wb.active

        submission_id = str(uuid4())[:8]
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        def average(lst):
            return round(sum(lst) / len(lst), 2) if lst else 0

        content_avg = average(form.content_ratings)
        trainer_avg = average(form.trainer_ratings)
        org_avg = average(form.organization_ratings)
        overall_avg = average(form.overall_ratings)

        row = [
            timestamp,
            submission_id,
            form.full_name,
            form.email,
            form.job_role,
            form.training_title,
            form.instructor_name,
            content_avg,
            trainer_avg,
            org_avg,
            overall_avg,
            ", ".join(form.covered_topics),
            form.other_topic,
            form.comments,
        ]

        ws.append(row)
        wb.save(EXCEL_FILE)

        return {"status": "success", "submission_id": submission_id}
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)

print("✅ FastAPI loaded successfully")
