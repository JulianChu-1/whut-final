import re
import motor.motor_asyncio
from datetime import datetime
import json
import requests

import spider
import spider.weibo
from model import Weibo

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
weibo_collection = client['whut_final']['weibo']
spider_collection = client['test']['weibo']

async def fetch_weibo(screen_name = None, category = None, created_at = None):
    query = {}
    weibos = []
    if screen_name:
        query["screen_name"] = screen_name
    if category:
        query["category"] = category
    if created_at:
        date_regex = created_at + "T.*"
        query["created_at"] = {"$regex": re.compile(date_regex)}

    cursor = weibo_collection.find(query).sort([("spider_time", -1), ("created_at", -1)])

    async for document in cursor:
        weibos.append(Weibo(**document))
    return weibos

async def analysis_weibo(user_id):
    weibos = []

    cursor = weibo_collection.find({"user_id": int(user_id)})
    
    async for document in cursor:
        weibos.append(Weibo(**document))
    
    return weibos

async def create_weibo(weibo):
    result = await weibo_collection.insert_one(weibo)
    return str(result.inserted_id)

async def remove_weibo(id):
    if not weibo_collection.find_one({"id":id}):
        return False
    await weibo_collection.delete_one({"id":int(id)})
    return True

# async def update_weibo(id, data):
#     await collection.update_one({"id": id}, {"$set": data})

async def hot_spider():
    datas = []
    headers = {
        'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    }

    response = requests.get("https://www.weibo.com/ajax/side/hotSearch", headers=headers)
    response = json.loads(response.text)

    for i in range(6):
        datas.append(response['data']['realtime'][i]['word'])

    return datas


async def spider_weibo(weibo: dict):
    fields = {'id': 1, 'user_id': 1, 'screen_name': 1, 'text': 1, 'created_at': 1, 'topics': 1,}
    weibos = []

    with open("spider/config.json", 'r', encoding='utf-8') as f:
        config = json.load(f)
    
    for key, value in weibo.items():
        config[key] = value
    config['user_id_list'] = [config['user_id_list']]

    with open("spider/config.json", 'w', encoding='utf-8') as f:
        json.dump(config, f, ensure_ascii=False, indent=4)
   
    spider.weibo.main()
    cursor = spider_collection.find({"user_id": int(config['user_id_list'][0])}, fields)

    async for document in cursor:
        now = datetime.now()
        document['category'] = '娱乐'
        document['spider_time'] = now.strftime("%Y-%m-%dT%H:%M:%S")
        if not weibo_collection.find_one({"id": document["id"]}):
            weibos.append(document)
    
    # print(weibos)
    weibo_collection.insert_many(weibos)

    return len(weibos)

    

    
    