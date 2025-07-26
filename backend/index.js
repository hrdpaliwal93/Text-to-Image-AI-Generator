import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './db.js';
import userRouter from './routes/userRoutes.js';
import imagerouter from './routes/imageroutes.js';

const app = express();

app.use(express.json())
app.use(cors())

await connectDB();

app.use('/api/user', userRouter)
app.use('/api/image', imagerouter)



app.get('/', (req,res)=>{
    

   
})




app.listen(3000)