const userModel = require('./../../model/user')
const signUp = async (payload) => {
    try {
        return await userModel.create(payload)
    }
    catch (err) {
        return {
            error:true,
            message:err
        }
    }

}

module.exports = {
    signUp
}