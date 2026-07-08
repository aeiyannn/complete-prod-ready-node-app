const express = require("express")
const app = express()
const mongoose = require("mongoose")
const authRoute =require("./src/module/auth/route")
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Server is working")

})
app.use("/auth",authRoute)


mongoose.connect('mongodb://127.0.0.1:27017/authapp')
    .then(() => console.log('Connected!'))
    .catch((e)=>{
        console.log(e)
    })
app.listen(3600, () => {
    console.log('server is running on port 3600')
})