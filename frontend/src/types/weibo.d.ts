export interface WeiboType {
    _id?: string; // mongo数据库的id
    id: string;
    screen_name: string;
    category: string;
    topics: string;
    created_at: string;
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