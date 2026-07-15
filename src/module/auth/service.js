const joi = require('joi')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const authRepo = require('./repositries');
const { isValidObjectId } = require('mongoose');

const transporter = nodemailer.createTransport({
   host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
        user: "673d7d48aea115",
        pass: "72e7c383ed17f6",
    },
});
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
    const info = await transporter.sendMail({
        to: dbResponse.email, // list of recipients
        subject: "Welcome", // subject line
        text: "Welcome to our platform", // plain text body
        html: "<b>Welcome to our platform</b>",
    });
    console.log(info)

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
    return isEmailExist

}

const getUserbyEmail = async (email) => {
    const data = await authRepo.getUserbyEmail(email)
    return data
}

module.exports = {
    signUp,
    login
}