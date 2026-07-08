const express = require("express")
const router = express.Router()
const authController=require("./controller")
router.post("/signUp",authController.signUp)
module.exports = router