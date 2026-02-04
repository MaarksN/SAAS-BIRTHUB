from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# --- Models ---
class ProjectRequest(BaseModel):
    company_id: str
    name: str

class ProjectResponse(BaseModel):
    project_id: str
    status: str

# --- Endpoints ---

@router.post("/onboarding/start-project", response_model=ProjectResponse)
async def start_project(request: ProjectRequest):
    return {"project_id": "123", "status": "PLANNED"}

@router.post("/onboarding/validate-prerequisites")
async def validate_prerequisites(company_id: str):
    return {"valid": True, "missing_items": []}
