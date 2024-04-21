import { WeiboFormType, WeiboQueryType, WeiboType } from "@/types";
import request from "@/utils/request";
import qs from "qs";

export async function getWeiboList(params?: WeiboQueryType) {
    var res;

    if (typeof params === "undefined"){
        res = request.get(
            `/api/weibos?${qs.stringify(params)}`
        );
    }
    else{
        const dateFormat = "YYYY-MM-DD";
        const formattedParams = Object.assign({}, params, {
            created_at: params.created_at ? params.created_at.format(dateFormat) : null
        });
        const queryString = qs.stringify(formattedParams);
        res = request.get(`/api/weibos?${queryString}`);
    }

    return res;
}

export async function weiboSpider(params: any) {
    return request.post("/api/weibo/spider", params);
}

export async function weiboAdd(params: WeiboType) {
    return request.post("/api/weibos", params)
}

export async function weiboUpdate() {
    
}

export async function weiboDelete(id: string) {
    return request.delete(`/api/weibos/${id}`);
}