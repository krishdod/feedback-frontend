from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openpyxl import Workbook, load_workbook
from pathlib import Path

app = FastAPI()

# Allow CORS from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

excel_file = "feedback.xlsx"

# Create Excel if not exists
if not Path(excel_file).exists():
    wb = Workbook()
    ws = wb.active
    ws.append(["Name", "Email", "Feedback"])
    wb.save(excel_file)

@app.post("/api/submit-feedback")
async def submit_feedback(request: Request):
    data = await request.json()
    name = data.get("name")
    email = data.get("email")
    feedback = data.get("feedback")

    wb = load_workbook(excel_file)
    ws = wb.active
    ws.append([name, email, feedback])
    wb.save(excel_file)
    return {"message": "Feedback submitted successfully!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
