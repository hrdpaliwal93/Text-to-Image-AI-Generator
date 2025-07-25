import mongoose from 'mongoose'

const connectDB = async()=>{
    await mongoose.connect(`${process.env.DATABASE_URL}ImagifyDatabase`).then(console.log("database connected !"))
}





export default connectDB