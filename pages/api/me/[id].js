import { useRadioGroup } from '@material-ui/core'
import {connectDB} from '../../../db/database'
import User from '../../../model/user'
const cloudinary = require('cloudinary').v2



export default async(req,res)=>{
    const data = req.query

    console.log(data);
    const userId = data.id
    
    if(req.method == 'GET'){
        try {

            await connectDB()
            const user = await User.findById(userId)
            console.log(user);
            res.status(200).send({user: user})
        } catch (error) {
            res.status(500).send({error:error.message})
        }
    }

    
    
}