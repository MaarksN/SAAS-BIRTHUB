from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# --- Models ---
class AttributionRequest(BaseModel):
    touchpoints: list

class AttributionResponse(BaseModel):
    models: dict

# --- Endpoints ---

@router.post("/growth/calculate-attribution", response_model=AttributionResponse)
async def calculate_attribution(request: AttributionRequest):
    return {
        "models": {
            "first_touch": {"channel_a": 0.4},
            "linear": {"channel_a": 0.2, "channel_b": 0.2}
        }
    }

@router.post("/growth/optimize-budget")
async def optimize_budget(current_spend: dict):
    return {"recommendation": {"increase": ["LinkedIn"], "decrease": ["Ads"]}}
