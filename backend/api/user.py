import motor.motor_asyncio
from datetime import datetime
from model import User

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client['whut_final']
collection = database['user']

async def fetch_user(nickname=None, status = None, id = None):
    query = {}
    users = []
    if nickname:
        query["nickname"] = nickname
    if status:
        query["status"] = status
    if id:
        query["id"] = int(id)
    
    print(query)
    cursor = collection.find(query).sort("created_at", -1)

    async for document in cursor:
        users.append(User(**document))
    return users

async def create_user(user):
    now = datetime.now()
    time = now.strftime("%Y-%m-%dT%H:%M:%S")
    user['created_at'] = time
    result = await collection.insert_one(user)
    return str(result.inserted_id)