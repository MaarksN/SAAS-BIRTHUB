from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# --- Models ---
class TicketClassificationRequest(BaseModel):
    title: str
    description: str

class TicketClassificationResponse(BaseModel):
    category: str
    priority: str
    suggested_tags: list

# --- Endpoints ---

@router.post("/support/classify-ticket", response_model=TicketClassificationResponse)
async def classify_ticket(request: TicketClassificationRequest):
    return {
        "category": "Technical",
        "priority": "MEDIUM",
        "suggested_tags": ["login", "bug"]
    }

@router.post("/support/suggest-solution")
async def suggest_solution(ticket_id: str):
    return {"suggested_articles": [{"id": "1", "title": "Reset Password", "relevance": 0.95}]}
