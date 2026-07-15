const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required:true

        },
        password: {
            type: String,
            required: true
        },
        name: String,
        phoneNumber: String,
        age: Number
    }
)
const authModel = mongoose.model("users", userSchema)
module.exports = authModel