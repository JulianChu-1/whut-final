from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer

from routers import user, weibo


app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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

app.include_router(user.router)
app.include_router(weibo.router)

# @app.get("/api/weibos/")
# async def get_weibo(screen_name: str | None = None, category: str | None = None, created_at : str | None = None):
#     response = {}
#     response['data'] = await weibo.fetch_weibo(screen_name, category, created_at)
#     response['total'] = len(response['data'])
#     return response

# @app.post("/api/weibos/")
# async def add_weibo(data: Weibo):
#     # print(data)
#     response = await weibo.create_weibo(data.dict())
#     if response:
#         return {"inserted_id": response}
    
# @app.post("/api/weibos/spider")
# async def spider_weibo(data: WeiboSpider):
#     print(data)
#     response = await weibo.spider_weibo(data.dict())
#     if response:
#         return response
    
# @app.delete("/api/weibos/{id}")
# async def delete_weibo(id):
#     response = await weibo.remove_weibo(id)
#     if response:
#         return "Delete successfully"
 
# @app.get("/api/users/")
# async def get_user(nickname: str | None = None, status: str | None = None):
#     response = {}
#     response['data'] = await user.fetch_user(nickname, status)
#     response['total'] = len(response['data'])
#     return response

# @app.post("/api/users/")
# async def add_user(data: User):
#     response = await user.create_user(data.dict())
#     if response:
#         return {"inserted_id": response}
    
# @app.get("/api/users/{id}")
# async def get_user_detail(id):
#     response = await user.fetch_user(id = id)
#     return response

# @app.post("/api/login")
# async def user_login(data: UserLogin):
#     data = data.dict()
#     response = await user.login(**data)
#     # print(type(response))
#     if response:
#         return response
    
# @app.get("/api/logout")
# async def user_logout():
#     return 1