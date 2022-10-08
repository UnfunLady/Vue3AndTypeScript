const jwt = require("jsonwebtoken");
const secret = 'UnfunLady'
const createToken = (username) => {
    return jwt.sign(username, secret, {
        expiresIn: '10h'// 设置token的有效期 单位（秒）
    })
}
// 校验token
const authToken = (token) => {
    if (!token) return false;
    const verifyPayload = jwt.verify(token, secret, (err, payload) => {
        if (err) return false
        return true
    })
    return verifyPayload;
}
module.exports = { createToken, authToken }