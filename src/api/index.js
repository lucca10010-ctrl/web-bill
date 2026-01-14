import request from "@/util/request";

export function fetchBillList123(condition) {
    return request({
        url: '/ka',
        method: 'get',
        params: condition
    });

    // return request.get("/ka", { params: condition });
}

