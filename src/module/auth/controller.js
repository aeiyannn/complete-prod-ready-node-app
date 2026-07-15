const authService =require("./service")
const signUp = async (req,res)=>{
    const payload ={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        phoneNumber:req.body.phoneNumber,
        age:req.body.age
    }
    const result = await authService.signUp(payload)
    if(result?.error){
        res.status(400).json(result)
    }
    res.json(result)
}

const login = async (req,res)=>{
    const payload={
        email:req.body?.email,
        password:req.body?.password
    }
    const result =await authService.login(payload)
     if(result?.error){
        res.status(400).json(result)
    }
    res.json(result)
}

module.exports ={signUp,login}