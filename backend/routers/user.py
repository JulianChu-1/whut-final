import motor.motor_asyncio
from datetime import datetime
from fastapi import APIRouter
from api import user

from model import User, UserLogin

router = APIRouter()

@router.get("/api/users/")
async def get_user(nickname: str | None = None, status: str | None = None):
    response = {}
    response['data'] = await user.fetch_user(nickname, status)
    response['total'] = len(response['data'])
    return response

@router.post("/api/users/")
async def add_user(data: User):
    response = await user.create_user(data.dict())
    if response:
        return {"inserted_id": response}
    
@router.get("/api/users/{id}")
async def get_user_detail(id):
    response = await user.fetch_user(id = id)
    return response

@router.post("/api/login")
async def user_login(data: UserLogin):
    data = data.dict()
    response = await user.login(**data)
    # print(type(response))
    if response:
        return response
    
@router.get("/api/logout")
async def user_logout():
    return 1