let tokenManager = require("./token.js")
const queries = require("../db/queries.js");

async function authorizeToken(req, next) {
    let authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        throw {
            message: "Missing authentication header",
            status: 401
        }
    }

    try {
        let payload = tokenManager.verifyToken(token)
        console.log(payload)
        let user = await queries.getUser(payload.uid)
        if(!user.id) {
            throw Error()
        }
        next(payload.uid)

    } catch(err) {
        throw {
            message: "Expired or invalid token",
            status: 401
        }
    }
}

module.exports = {
    authorizeToken
};