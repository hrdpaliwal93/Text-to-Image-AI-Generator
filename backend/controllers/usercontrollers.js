import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registeruser = async (req,res)=>{
    try{
        const {name, email, password}  = req.body
        if(!name || !password || !email){
        return res.json({success:false, message:"Missing Details"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        const userData = {
        name,password, email, password:hashedpassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({id:user._id}, `${process.env.JWT_SECRET}`)
        res.json({success:true, token, user:{name:user.name}})
    
    }catch(e){
        console.log(e)
    }

}

const loginuser =async (req,res)=>{
    try{
        let {email, password} = req.body
        const user  = await userModel.findOne({email})
        if(!user){
             return res.json({success:false, message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id}, `${process.env.JWT_SECRET}`)
             res.json({success:true, token, user:{name:user.name}})
        }
        else{
            return res.json({success:false, message:"Invalid credentials"})
        }

    }catch(e){
        console.log(e)
        }

}

const usercredits = async (req,res)=>{
   try{
     const userid = req.userid
    const user = await userModel.findById(userid)
    if(user.creditBalance===0 || user.creditBalance<0){
        res.json({success:false,credits:user.creditBalance, user: {name:user.name}})
    }else res.json({success:true, credits:user.creditBalance, user: {name:user.name}})
}catch(e){
    console.log(e)
}
   }

export {
    registeruser,
    loginuser,
    usercredits
}