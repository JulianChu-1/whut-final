from fastapi import APIRouter
import motor.motor_asyncio
from datetime import datetime, timedelta, date
import json

router = APIRouter()

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client['whut_final']
database_spider = client['test']
collection_user = database['user']
collection_weibo = database['weibo']
collection_poster = database_spider['user']

@router.get("/api/weibos/spiderVolumeByDays")
async def spider_volume_by_days():
    today = datetime.today().strftime('%Y-%m-%d')
    today = date.fromisoformat(today)
    fourteen_days_ago = today - timedelta(days=13)
    # print(fourteen_days_ago) # 2024-04-12

    # 准备日期范围和每日统计
    date_range = [fourteen_days_ago + timedelta(days=i) for i in range(15)]
    # print(date_range)
    daily_counts = []

    # 按天查询并计算数量
    for i in range(len(date_range) - 1):
        start_date = date_range[i]
        end_date = date_range[i + 1]
        count = await collection_weibo.count_documents({
            'spider_time': {
                '$gte': start_date.strftime('%Y-%m-%d'),
                '$lt': end_date.strftime('%Y-%m-%d')
            }
        })
        date_str = start_date.strftime('%m-%d')
        daily_counts.append({'type': date_str, 'value': count})
    
    return daily_counts

@router.get("/api/weibos/spiderVolumeByYear")
async def spider_volume_by_year():
    today = datetime.now()
    one_year_ago = today - timedelta(days=365)

    # 准备每月的时间范围
    start_date = datetime(one_year_ago.year, one_year_ago.month, 1)
    months = []
    while start_date < today:
        end_date = (start_date + timedelta(days=32)).replace(day=1)
        if end_date > today:
            end_date = today
        months.append((start_date, end_date))
        start_date = end_date

    # 按月查询并计算数量
    monthly_counts = []
    for start_date, end_date in months:
        count = await collection_weibo.count_documents({
            'spider_time': {
                '$gte': start_date.strftime('%Y-%m-%dT%H:%M:%S'),
                '$lt': end_date.strftime('%Y-%m-%dT%H:%M:%S')
            }
        })
        # 格式化月份为年-月
        month_str = start_date.strftime('%Y-%m')
        monthly_counts.append({'type': month_str, 'value': count})
    
    return monthly_counts

@router.get("/api/mainInfo")
async def main_info():
    count_weibo = await collection_weibo.count_documents({})
    count_user = await collection_user.count_documents({})
    count_poster = await collection_poster.count_documents({})
    response = {
        'weibo': count_weibo,
        'user': count_user,
        'poster': count_poster,
    }
    return response

@router.get("/api/analysis/{user_id}")
async def analysis_by_posterid(user_id):
    return 1