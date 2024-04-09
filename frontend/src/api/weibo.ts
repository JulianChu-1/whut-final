import axios from "axios";
import qs from "qs";

export async function getWeiboList() {

    const res = await axios(
        'http://127.0.0.1:8000'
    )
    return res
}