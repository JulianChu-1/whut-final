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

# fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

@app.get("/weibos/")
async def get_weibo(screen_name: str | None = None, category: str | None = None, created_at : str | None = None):
    response = await database.fetch_weibo(screen_name, category, created_at)
    return response

