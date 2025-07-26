import express from 'express'
import {registeruser, loginuser, usercredits} from '../controllers/usercontrollers.js'
import userauth from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register', registeruser)
userRouter.post('/login', loginuser)
userRouter.get('/credits', userauth,  usercredits)



export default userRouter