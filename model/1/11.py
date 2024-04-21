import json

with open(r"../../backend/spider/config.json", 'r') as f:
    const = json.load(f)

const['since_date'] = 50

with open(r"../../backend/spider/config.json", 'w') as f:
    json.dump(const, f)