import motor.motor_asyncio
from model import Weibo

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.test
collection = database['weibo']

# print(collection)

async def fetch_all_weibo():
    weibos = []
    cursor = collection.find({})
    async for document in cursor:
        weibos.append(Weibo(**document))
    return weibos