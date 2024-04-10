import { WeiboQueryType } from "@/type/weibo";
import { format } from 'date-fns';
import axios from "axios";
import qs from "qs";

export async function getWeiboList(params?: WeiboQueryType) {
    var res;

    if (typeof params === "undefined"){
        res = await axios(
            `http://127.0.0.1:8000/weibos?${qs.stringify(params)}`
        );
    }
    else{
        const dateFormat = "YYYY-MM-DD";
        const formattedParams = Object.assign({}, params, {
            created_at: params.created_at ? params.created_at.format(dateFormat) : null
        });
        const queryString = qs.stringify(formattedParams);
        res = await axios(`http://127.0.0.1:8000/weibos?${queryString}`);
    }

    return res;
}
