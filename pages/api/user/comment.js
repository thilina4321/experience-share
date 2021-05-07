import {connectDB} from '../../../db/database'
import Comment from '../../../model/comment'

export default async(req,res)=>{

    if(req.method == 'POST'){
    const {postId, comment, owner} = req.body
    try {
        await connectDB()
        const response = await Comment.create({postId, comment, owner})
        res.status(201).send({response})
    } catch (error) {
        res.status(500).send({error:error.message})
        
    }
}
if(req.method == 'GET'){
    const postId = req.query
    console.log(postId);
    try {
        await connectDB()
        const comments = await Comment.find({postId})
        res.status(200).send({comments})
    } catch (error) {
        res.status(500).send({error:error.message})
        
    }
}
}