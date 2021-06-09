import {connectDB} from '../../../db/database'
import Exe from '../../../model/exe'


export default async(req,res)=>{
    const data = req.query

    const postId = data.id
    
    if(req.method == 'GET'){
        try {


            await connectDB()
            const post = await Exe.findById(postId)
            res.status(200).send({post: post})
        } catch (error) {
            res.status(500).send({error:error.message})
        }
    }   
    
}