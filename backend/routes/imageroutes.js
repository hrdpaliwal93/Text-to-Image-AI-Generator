import userauth from "../middlewares/auth.js"
import express from 'express'
import generateimage from "../controllers/imagecontroller.js"

const imagerouter  = express.Router()

imagerouter.post('/generate-image', userauth, generateimage)

export default imagerouter