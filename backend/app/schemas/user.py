from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID
from datetime import datetime
from app.models.role import UserRole

class UserCreate(BaseModel):
    full_name: str
    email: Optional[EmailStr] = None
    phone: str = Field(..., pattern=r"^\+91[0-9]{10}$")
    password: str = Field(..., min_length=6)
    role: UserRole

class UserResponse(BaseModel):
    id: UUID
    full_name: str
    email: Optional[EmailStr]
    phone: str
    role: UserRole
    is_verified: bool

    class Config:
        from_attributes = True