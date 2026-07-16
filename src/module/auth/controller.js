const authService = require("./service")
const jwt = require('jsonwebtoken')
const signUp = async (req, res) => {
    const payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        age: req.body.age
    }
    const result = await authService.signUp(payload)
    if (result?.error) {
        res.status(400).json(result)
    }
    res.json(result)
}

const login = async (req, res) => {
    const payload = {
        email: req.body?.email,
        password: req.body?.password
    }
    const result = await authService.login(payload)
    if (result?.error) {
        res.status(400).json(result)
    }
    res.json(result)
}

const getPing = (req, res) => {
    // if(!req.query.token){
    //     res.status(400).json("token is required")
    // }
    // let payload;
    // try {
    //     const secretkey = "fu4gy4hur4r4hu4ru4h"
    //    payload= jwt.verify(req.query.token,secretkey)
    // }
    // catch(e){
    //     console.log(e,"test")
    // res.status(400).json("Invalid Token")
    // }

    res.json("success")
}


const getProfile = async (req, res) => {
    const user=res.locals.user
    console.log(user)
    const userId = user.id
    console.log(userId)
    const data = await authService.getUserProfile(userId)
    res.json(data)
}
module.exports = { signUp, login, getPing,getProfile }