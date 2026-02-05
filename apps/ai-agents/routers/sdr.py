from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# --- Models ---
class LeadScoreRequest(BaseModel):
    lead_id: str
    behavior_data: dict

class LeadScoreResponse(BaseModel):
    score: float
    factors: dict

class ObjectionRequest(BaseModel):
    objection_text: str
    context: str

# --- Endpoints ---

@router.post("/sdr/score-lead", response_model=LeadScoreResponse)
async def score_lead(request: LeadScoreRequest):
    # In real app, this would call an ML model
    # Mock response consistent with TypeScript interface
    return {"score": 85.0, "factors": {"visits": 10, "email_opens": 5}}

@router.post("/sdr/handle-objection")
async def handle_objection(request: ObjectionRequest):
    return {
        "objection": request.objection_text,
        "response": "I understand your concern about pricing. However, our AI-driven approach reduces CAC by 30%..."
    }

@router.post("/sdr/suggest-schedule")
async def suggest_schedule(lead_id: str):
    return {"suggested_slots": ["2024-02-20T10:00:00Z", "2024-02-21T14:00:00Z"]}
