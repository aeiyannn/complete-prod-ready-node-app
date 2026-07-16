const jwt = require('jsonwebtoken')
const authMiddlware = (req, res, next) => {
    if (!req.headers["authorization"]) {
        res.status(400).json("token is required")
    }
    try {
        const secretkey = "fu4gy4hur4r4hu4ru4h"
        const decode = jwt.verify(req.headers["authorization"], secretkey)
        res.locals.user = decode
         res.locals.test="xyz"
        next()
    }
    catch (e) {
        console.log(e, "test")
        res.status(400).json("Invalid Token")
    }
}
module.exports = authMiddlware