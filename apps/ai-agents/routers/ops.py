from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# --- Models ---
class CommissionRequest(BaseModel):
    user_id: str
    deal_value: float

class CommissionResponse(BaseModel):
    amount: float
    breakdown: str

# --- Endpoints ---

@router.post("/ops/calculate-commission", response_model=CommissionResponse)
async def calculate_commission(request: CommissionRequest):
    commission = request.deal_value * 0.10
    return {"amount": commission, "breakdown": "10% Standard Rate"}

@router.post("/ops/audit-rules")
async def audit_rules():
    return {"status": "ok", "anomalies": []}
