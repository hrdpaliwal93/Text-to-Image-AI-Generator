import axios from "axios"
import userModel from "../models/userModel.js"
import FormData from "form-data"


const generateimage = async (req,res)=>{
    const {prompt} = req.body
    const userid = req.userid
    

    const user = await userModel.findById(userid)
    if(!user || !prompt){
        res.json({success:true, message:"Missing Details"})
    }
    if(user.creditBalance ===0 || user.creditBalance<0){
        
        res.json({success:false, message:'No credit Balance', creditbalance:user.creditBalance})
    }

    const formdata = new FormData()
    formdata.append('prompt', prompt)

    const data  = await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, 
            {
                headers:{
                    'x-api-key':process.env.API_KEY,
                    ...formdata.getHeaders()
                },
                responseType:'arraybuffer'
            }

    )
     const base64image = Buffer.from(data.data, 'binary').toString('base64')


    const image = `data:image/png;base64,${base64image}`

    let updatedCredits = user.creditBalance;
    if(updatedCredits<0){updatedCredits = 0}
    else{
        updatedCredits = updatedCredits-1
    }
    await userModel.findByIdAndUpdate(req.userid, { creditBalance: updatedCredits });
   
    res.json({success:true, message:"Image generated",creditBalance:updatedCredits, image })

    
}

export default generateimage