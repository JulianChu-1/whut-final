import request from "@/utils/request";
import qs from "qs";

export async function getMainInfo() {
    return request.get(`/api/mainInfo`);
}