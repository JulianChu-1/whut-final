from pydantic import BaseModel

class Weibo(BaseModel):
    # _id : str
    # user_id : str
    id : str
    screen_name : str
    text : str
    created_at : str
    topics : str
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