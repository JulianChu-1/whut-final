from datetime import datetime
from pydantic import BaseModel

class Weibo(BaseModel):
    # _id : str
    # user_id : str
    id : str
    screen_name : str
    text : str
    created_at : str
    topics : str
    category : str
    # bid : str
    # article_url : str
    # pics : str
    # video_url : str
    # location : str
    # source : str
    # attitudes_count : str
    # comments_count : str
    # reposts_count: str
    # at_users : str
    # full_created_at : str

class WeiboUser(BaseModel):
    id : str

class User(BaseModel):
    username : str
    nickname : str
    password : str
    sex : str
    status : str
    role : str
    # created_at: str = None