from app.schemas.ai_router import AIRouterResponse
from app.models.role import UserRole

class AgenticAIRouter:
    async def route(self, user_role: UserRole, message: str) -> AIRouterResponse:
        # Mock abstraction logic
        intent = "general_inquiry"
        route = "/dashboard"
        confidence = 0.85
        
        message_lower = message.lower()
        if user_role == UserRole.FARMER:
            if "crop" in message_lower or "disease" in message_lower:
                intent = "crop_management"
                route = "/farmer/dashboard"
                confidence = 0.96
        elif user_role == UserRole.BUYER:
            if "buy" in message_lower or "price" in message_lower:
                intent = "market_purchase"
                route = "/buyer/dashboard"
                confidence = 0.92
        elif user_role == UserRole.EXPERT:
            intent = "expert_consultation"
            route = "/expert/dashboard"
            confidence = 0.90
            
        return AIRouterResponse(intent=intent, recommended_route=route, confidence=confidence)

ai_router_service = AgenticAIRouter()