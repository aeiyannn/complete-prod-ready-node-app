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

const getUserById=async(id)=>{
    console.log(id)
    const resp = await userModel.findById(id)
    console.log(resp)
    return resp 
}

module.exports = {
    signUp,
    getUserbyEmail,
    getUserById
}