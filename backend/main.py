from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import Weibo, User
from database import weibo, user

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
 
@app.get("/users/")
async def get_user(nickname: str | None = None, status: str | None = None):
    response = {}
    response['data'] = await user.fetch_user(nickname, status)
    response['total'] = len(response['data'])
    return response

@app.post("/users/")
async def create_user(data):
    # data_dict = data.dict()
    # current_time = datetime.now()
    # data_dict['created_at'] = current_time.strftime("%Y-%m-%dT%H:%M:%S")
    response = await user.create_user(data.dict())
    if response:
        return {"inserted_id": response}