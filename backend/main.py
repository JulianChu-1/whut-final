from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import Weibo
from database import weibo

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"]
)

# fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

@app.get("/")
async def root():
    return {"data": "hello world"}

@app.get("/weibos/")
async def get_weibo(screen_name: str | None = None, category: str | None = None, created_at : str | None = None):
    response = {}
    response['data'] = await weibo.fetch_weibo(screen_name, category, created_at)
    response['total'] = len(response['data'])
    return response

@app.post("/weibos/")
async def create_weibo(data: Weibo):
    print(data)
    response = await weibo.create_weibo(data.dict())
    if response:
        return {"inserted_id": response}
    
@app.delete("/weibos/{id}")
async def delete_weibo(id):
    response = await weibo.remove_weibo(id)
    if response:
        return "Delete successfully"

