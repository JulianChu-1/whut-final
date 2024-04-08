from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
    return {
        'data': [
        {
        'key': '1',
        'name': '胡彦斌',
        'age': 32,
        'address': '西湖区湖底公园1号',
        },
        {
        'key': '2',
        'name': '胡彦祖',
        'age': 42,
        'address': '西湖区湖底公园1号',
        },
        ]
    }