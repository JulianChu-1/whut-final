from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import Weibo, User
from api import weibo, user

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

@app.get("/api/weibos/")
async def get_weibo(screen_name: str | None = None, category: str | None = None, created_at : str | None = None):
    response = {}
    response['data'] = await weibo.fetch_weibo(screen_name, category, created_at)
    response['total'] = len(response['data'])
    return response

@app.post("/api/weibos/")
async def add_weibo(data: Weibo):
    print(data)
    response = await weibo.create_weibo(data.dict())
    if response:
        return {"inserted_id": response}
    
@app.delete("/api/weibos/{id}")
async def delete_weibo(id):
    response = await weibo.remove_weibo(id)
    if response:
        return "Delete successfully"
 
@app.get("/api/users/")
async def get_user(nickname: str | None = None, status: str | None = None):
    response = {}
    response['data'] = await user.fetch_user(nickname, status)
    response['total'] = len(response['data'])
    return response

@app.post("/api/users/")
async def add_user(data: User):
    response = await user.create_user(data.dict())
    if response:
        return {"inserted_id": response}
    
@app.get("/api/users/{id}")
async def get_user_detail(id):
    response = await user.fetch_user(id = id)
    return response