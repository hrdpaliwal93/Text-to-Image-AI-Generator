import jwt from "jsonwebtoken";


const userauth = (req,res,next)=>{
    const token  = req.headers.token
    if(!token){
        res.json({success:false, message:"Not authorised"})
    }
    const decodedtoken = jwt.verify(token, `${process.env.JWT_SECRET}`)

    if(decodedtoken.id){
        req.userid = decodedtoken.id
    }else{
        res.json({success:false, message:"not authorised. Login Again"})
    }
    next()
}

export default userauth