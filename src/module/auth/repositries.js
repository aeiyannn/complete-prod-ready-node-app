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

const getUserbyEmail= async (email)=>{
    const resp=await userModel.findOne({
        email:email
    })
    return resp
}

module.exports = {
    signUp,
    getUserbyEmail
}