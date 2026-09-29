from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.schemas.user import UserCreate, UserResponse
from app.schemas.auth import LoginRequest, TokenResponse, OTPRequest, OTPVerify
from app.models.user import User
from app.models.role import UserRole
from app.core.security import get_password_hash, verify_password, create_access_token, create_refresh_token
from app.middleware.auth_middleware import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    if user_in.role == UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="ADMIN role cannot be registered publicly.")
        
    # Check duplicate email
    if user_in.email:
        result = await db.execute(select(User).filter(User.email == user_in.email))
        if result.scalars().first():
            raise HTTPException(status_code=400, detail="Email already registered")
            
    # Check duplicate phone
    result = await db.execute(select(User).filter(User.phone == user_in.phone))
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Phone already registered")

    user = User(
        full_name=user_in.full_name,
        email=user_in.email,
        phone=user_in.phone,
        role=user_in.role,
        password_hash=get_password_hash(user_in.password)
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    
    return {"success": True, "message": "Registration successful", "user_id": str(user.id), "requires_verification": True}

@router.post("/login")
async def login(req: LoginRequest, response: Response, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User).filter((User.email == req.identifier) | (User.phone == req.identifier))
    )
    user = result.scalars().first()
    
    if not user or not verify_password(req.password, user.password_hash):
        raise HTTPException(status_code=401, detail={"code": "INVALID_CREDENTIALS", "message": "Unable to authenticate."})
        
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=True, samesite="Lax")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=True, samesite="Strict")
    
    return TokenResponse(
        success=True,
        user=UserResponse.model_validate(user),
        access_token=access_token,
        refresh_token=refresh_token
    )

@router.post("/otp/request")
async def request_otp(req: OTPRequest):
    # In a real app, hash and store the OTP in DB/Redis.
    return {"success": True, "message": "OTP sent"}

@router.post("/otp/verify")
async def verify_otp(req: OTPVerify):
    # Abstracted verify logic
    if req.otp != "123456": # Mock for MOCK_OTP
        raise HTTPException(status_code=400, detail="Invalid OTP")
    return {"success": True, "message": "OTP Verified"}

@router.post("/forgot-password")
async def forgot_password(req: dict):
    return {"success": True, "message": "If the account exists, a reset instruction has been sent."}

@router.post("/reset-password")
async def reset_password(req: dict):
    return {"success": True, "message": "Password reset successful."}

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"success": True, "message": "Logged out successfully"}

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user