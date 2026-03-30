from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from models.models import RoleEnum, PriorityEnum, StatusEnum


# ── Auth ──────────────────────────────────────────────────────────────────────
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserOut"

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
# ── User ──────────────────────────────────────────────────────────────────────
class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: RoleEnum
    is_active: bool

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None


class UserStatusUpdate(BaseModel):
    is_active: bool


# ── Helper ────────────────────────────────────────────────────────────────────
class HelperCreate(BaseModel):
    name: str
    email: EmailStr


class HelperOut(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime

    class Config:
        from_attributes = True


# ── Ticket ────────────────────────────────────────────────────────────────────
class TicketCreate(BaseModel):
    title: str
    description: str
    priority: PriorityEnum = PriorityEnum.low


class TicketStatusUpdate(BaseModel):
    status: StatusEnum


class TicketPriorityUpdate(BaseModel):
    priority: PriorityEnum


class TicketAssign(BaseModel):
    helper_id: int


class CommentOut(BaseModel):
    id: int
    comment: str
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class TicketOut(BaseModel):
    id: int
    title: str
    description: str
    priority: PriorityEnum
    status: StatusEnum
    user_id: int
    helper_id: Optional[int] = None
    created_at: datetime
    comments: List[CommentOut] = []

    class Config:
        from_attributes = True


# ── Comment ───────────────────────────────────────────────────────────────────
class CommentCreate(BaseModel):
    comment: str


TokenResponse.model_rebuild()
