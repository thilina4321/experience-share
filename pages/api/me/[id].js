import {connectDB} from '../../../db/database'
import User from '../../../model/user'

export default async(req,res)=>{
    const data = req.query

    const userId = data.id
    
    if(req.method == 'GET'){
        try {


            await connectDB()
            const user = await User.findById(userId)
            res.status(200).send({user: user})
        } catch (error) {
            res.status(500).send({error:error.message})
        }
    }   
    
}