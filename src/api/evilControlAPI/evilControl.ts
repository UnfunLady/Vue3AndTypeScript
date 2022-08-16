import request from "@/http";

const reqGetEvilInfo = () => {
    return request({ url: 'https://api.tianapi.com/ncov/index?key=3fc0a98a6f2fa29aa2c1fadbc54d6a84', method: 'get' })
}

const evilControl = {
    reqGetEvilInfo
}
export default evilControl