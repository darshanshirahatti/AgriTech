from fastapi import APIRouter, Depends
from app.schemas.ai_router import AIRouterRequest, AIRouterResponse
from app.models.user import User
from app.middleware.auth_middleware import get_current_user
from app.services.ai_router_service import ai_router_service

router = APIRouter(prefix="/ai", tags=["AI Router"])

@router.post("/route", response_model=AIRouterResponse)
async def classify_route(req: AIRouterRequest, current_user: User = Depends(get_current_user)):
    return await ai_router_service.route(user_role=current_user.role, message=req.message)