import pymongo

client = pymongo.MongoClient(host='127.0.0.1:27017')
in_collection = client['test']['weibo']
to_collection = client['whut_final']['weibo']
fields = {'id': 1, 'user_id': 1, 'screen_name': 1, 'text': 1, 'created_at': 1, 'topics': 1,}
weibos = []

for weibo in in_collection.find({}, fields):
    new_weibo = weibo.copy()
    new_weibo['category'] = '娱乐'
    weibos.append(new_weibo)

to_collection.insert_many(weibos)
