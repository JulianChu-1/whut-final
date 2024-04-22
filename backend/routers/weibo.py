from fastapi import APIRouter

from model import Weibo, WeiboSpider
from api import weibo

router = APIRouter()

@router.get("/api/weibos/")
async def get_weibo(screen_name: str | None = None, category: str | None = None, created_at : str | None = None):
    response = {}
    response['data'] = await weibo.fetch_weibo(screen_name, category, created_at)
    response['total'] = len(response['data'])
    return response

@router.post("/api/weibos/")
async def add_weibo(data: Weibo):
    # print(data)
    response = await weibo.create_weibo(data.dict())
    if response:
        return {"inserted_id": response}
    
@router.post("/api/weibos/spider")
async def spider_weibo(data: WeiboSpider):
    print(data)
    response = await weibo.spider_weibo(data.dict())
    if response:
        return response
    
@router.delete("/api/weibos/{id}")
async def delete_weibo(id):
    response = await weibo.remove_weibo(id)
    if response:
        return "Delete successfully"