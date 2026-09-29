from fastapi import APIRouter

router = APIRouter(tags=["Health"])

@router.get("/health")
async def health_check():
    return {"status": "healthy"}
    
@router.get("/health/database")
async def db_health_check():
    return {"status": "healthy"}