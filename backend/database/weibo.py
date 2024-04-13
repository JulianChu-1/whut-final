import re
import motor.motor_asyncio
from model import Weibo

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client['whut_final']
collection = database['weibo']

async def fetch_weibo(screen_name=None, category = None, created_at=None):
    query = {}
    weibos = []
    if screen_name:
        query["screen_name"] = screen_name
    if category:
        query["category"] = category
    if created_at:
        date_regex = created_at + "T.*"
        query["created_at"] = {"$regex": re.compile(date_regex)}

    cursor = collection.find(query).sort("created_at", -1)

    async for document in cursor:
        weibos.append(Weibo(**document))
    return weibos

async def create_weibo(weibo):
    result = await collection.insert_one(weibo)
    return str(result.inserted_id)

async def remove_weibo(id):
    await collection.delete_one({"id":id})
    return True
