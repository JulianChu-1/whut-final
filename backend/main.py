from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import database

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"]
)

@app.get("/")
async def root():
    response = await database.fetch_all_weibo()
    return response