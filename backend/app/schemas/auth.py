from pydantic import BaseModel
from typing import Optional
from app.schemas.user import UserResponse

class LoginRequest(BaseModel):
    identifier: str
    password: str

class TokenResponse(BaseModel):
    success: bool
    user: UserResponse
    access_token: str
    refresh_token: str

class OTPRequest(BaseModel):
    phone: str

class OTPVerify(BaseModel):
    phone: str
    otp: str