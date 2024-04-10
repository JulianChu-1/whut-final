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

fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

@app.get("/weibos/")
async def get_weibos():
    response = await database.fetch_all_weibo()
    return response

@app.get("/weibo/")
async def get_weibo(screen_name: str = "", created_at: str = ""):
    response = await database.fetch_weibo("陶喆","2024-01-08")
    return response