import motor.motor_asyncio
from model import Weibo

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.test
collection = database['weibo']

async def fetch_all_weibo():
    weibos = []
    cursor = collection.find({}).sort("created_at", -1)
    async for document in cursor:
        weibos.append(Weibo(**document))
    return weibos

async def fetch_weibo(screen_name, created_at):
    weibos = []
    cursor = collection.find({
        "screen_name": screen_name,
        "created_at": created_at
    })
    async for document in cursor:
        weibos.append(Weibo(**document))
    return weibos