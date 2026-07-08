const joi = require('joi')
const bcrypt = require('bcrypt');
const authRepo = require('./repositries')
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
    const hashpassword =  bcrypt.hashSync(payload.password,10)
    console.log(hashpassword)
    payload.password = hashpassword
    const dbRespose= await authRepo.signUp(payload)
    return dbRespose

}

module.exports = {
    signUp
}