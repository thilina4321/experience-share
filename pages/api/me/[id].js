import {connectDB} from '../../../db/database'
import User from '../../../model/user'

export default async(req,res)=>{
    const data = req.query

    await runMiddleware(req, res, cors)
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