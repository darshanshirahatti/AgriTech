from pydantic import BaseModel

class AIRouterRequest(BaseModel):
    message: str

class AIRouterResponse(BaseModel):
    intent: str
    recommended_route: str
    confidence: float