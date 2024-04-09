from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import motor.motor_asyncio
from pydantic import BaseModel

class Test(BaseModel):
    _id : str
    id : str

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.test
collection = database['name']
app = FastAPI()

@app.get("/")
async def root():
    contents = []
    cursor = collection.find({})
    async for document in cursor:
        contents.append(Test(**document))
    return {
        'data': contents
    }