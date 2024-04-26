export interface WeiboType {
    _id?: string; // mongo数据库的id
    id: number;
    screen_name: string;
    category: string;
    topics: string;
    created_at: any;
    text: string;
}

export interface WeiboQueryType {
    screen_name?: string;
    category?: number;
    created_at?: any;
    current?: number;
    pageSize?: number;
}

export interface WeiboFormType {
    title: string;
    editData?: WeiboType;
}

export interface WeiboSpiderType {
    user_id_list: string;
    since_date: number;
    start_page: string;
    cookie: string;
}

export interface datasByTime {
    type: string;
    value: number;
}