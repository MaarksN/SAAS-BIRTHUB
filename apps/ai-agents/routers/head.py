from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# --- Models ---
class PerformanceRequest(BaseModel):
    rep_id: str
    period: str

# --- Endpoints ---

@router.post("/head/detect-burnout")
async def detect_burnout(rep_id: str):
    return {"risk_level": "LOW", "indicators": ["Working late hours"]}

@router.post("/head/analyze-performance")
async def analyze_performance(request: PerformanceRequest):
    return {"quota_attainment": 95, "trend": "Upward"}
