const express = require("express")
const authMiddlware = require('./../../middlewares/auth')
const router = express.Router()
const authController=require("./controller")
router.post("/signUp",authController.signUp)
router.post("/login",authController.login)
router.get("/ping",authMiddlware,authController.getPing)
module.exports = router