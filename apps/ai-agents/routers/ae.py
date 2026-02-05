from fastapi import APIRouter
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter()

# --- Models ---
class DealAnalysisRequest(BaseModel):
    deal_id: str

class ProposalItem(BaseModel):
    name: str
    price: float
    quantity: int = 1

class ProposalRequest(BaseModel):
    deal_id: str
    items: List[ProposalItem]

# --- Endpoints ---

@router.post("/ae/analyze-meeting")
async def analyze_meeting(audio_url: str):
    return {
        "summary": "Client is interested in the Enterprise plan but concerned about implementation time.",
        "sentiment": "Positive",
        "action_items": ["Send implementation timeline", "Schedule technical deep dive"]
    }

@router.post("/ae/generate-proposal")
async def generate_proposal(request: ProposalRequest):
    total = sum(item.price * item.quantity for item in request.items)
    return {
        "deal_id": request.deal_id,
        "content": f"Proposal for {request.deal_id}. Total investment: ${total}",
        "total_value": total
    }

@router.get("/ae/forecast-deal/{deal_id}")
async def forecast_deal(deal_id: str):
    return {"probability": 75.5, "predicted_close_date": "2024-03-15"}
