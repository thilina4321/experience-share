import User from '../../../model/user'
import {connectDB} from '../../../db/database'

export default async(req,res)=>{
    if(req.method == 'POST'){
        try {


            await connectDB()

            const {userName, email, password} = req.body
            const user = await User.create({email, password, userName})

            res.status(201).send({user})
        
        } catch (error) {
            console.log(error);
            let status = 500
            if(error.code == 11000){
                status = 200
            }
            res.status(status).send({error:error})
        }
    }
    
}