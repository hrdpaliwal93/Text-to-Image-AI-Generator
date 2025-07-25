import mongoose  from "mongoose"
const Schema = mongoose.Schema

const user = new Schema({
    name:{type:String,required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String,required:true},
    creditBalance: {type:Number, default:5}
})

const userModel = mongoose.model('users', user)

export default userModel