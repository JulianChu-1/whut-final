import request from "@/utils/request";
import qs from "qs";

export async function getMainInfo() {
    return request.get(`/api/mainInfo`);
}

export async function analysisWeibo(user_id: string) {
    // console.log(user_id);
    return request.get(`/api/analysis/${user_id}`);
}

export async function trendWeibo(user_id: string) {
    return request.get(`/api/trend/${user_id}`);
}