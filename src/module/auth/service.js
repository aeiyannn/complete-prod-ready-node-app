const joi = require('joi')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const authRepo = require('./repositries');
const { isValidObjectId } = require('mongoose');
const jwt = require('jsonwebtoken')
const secretkey = "fu4gy4hur4r4hu4ru4h"
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "673d7d48aea115",
        pass: "72e7c383ed17f6",
    },
});
const verify = transporter.verify().then((resp) => {
    console.log(resp)
})
    .catch((e) => {
        console.log(e)
    })


const signUp = async (payload) => {
    const signUpSchema = joi.object({
        name: joi.string().optional(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(16).required(),
        phoneNumber: joi.string().required(),
        age: joi.number().optional()
    })
    const response = signUpSchema.validate(payload)
    if (response.error && response.error.details[0].message) {
        return {
            error: true,
            message: response.error.details[0].message
        }
    }
    const isEmailExist = await getUserbyEmail(payload.email)
    if (isEmailExist) {
        return {
            error: true,
            message: "User Already Exist"
        }
    }
    const hashpassword = bcrypt.hashSync(payload.password, 10)
    console.log(hashpassword)
    payload.password = hashpassword
    const dbResponse = await authRepo.signUp(payload)
    const emailResp = await transporter.sendMail({
        from: "Test User <from@example.com>",
        to: payload.email,
        html: "<h1 style='color:green;'> Welcome to our platform </h1>",
        subject: "Welcome!"
    })
    console.log(emailResp)
    return dbResponse

}
const login = async (payload) => {
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })
    const response = loginSchema.validate(payload)
    if (response.error && response.error.details[0].message) {
        return {
            error: true,
            message: response.error.details[0].message
        }
    }
    const isEmailExist = await getUserbyEmail(payload.email)
    if (!isEmailExist) {
        return {
            error: true,
            message: "User does not exist"
        }
    }
    const isPasswordMatch = bcrypt.compareSync(payload.password, isEmailExist.password)
    if (!isPasswordMatch) {
        return {
            error: true,
            message: "Email or Password is incorrect"
        }
    }
    console.log(isPasswordMatch,"test")
    const token = jwt.sign({
        id: isEmailExist._id,
        email: isEmailExist.email,
        name: isEmailExist.name
    }, secretkey,{
        expiresIn:"1d"
    })
    return {
        token,
        user:isEmailExist
    }

}

const getUserbyEmail = async (email) => {
    const data = await authRepo.getUserbyEmail(email)
    return data
}


const getUserProfile = async (id)=>{
 const data = await authRepo.getUserById(id)
 return data
}

module.exports = {
    signUp,
    login,
    getUserProfile
}