const jwt =require('jsonwebtoken')
const authMiddlware = (req, res, next) => {
    if (!req.query.token) {
        res.status(400).json("token is required")
    }
    let payload;
    try {
        const secretkey = "fu4gy4hur4r4hu4ru4h"
        jwt.verify(req.query.token, secretkey)
        next()
    }
    catch (e) {
        console.log(e, "test")
        res.status(400).json("Invalid Token")
    }
}
module.exports =authMiddlware