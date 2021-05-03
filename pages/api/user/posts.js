import {connectDB} from '../../../db/database'
import Post from '../../../model/exe'
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret 
  });

  export const config = {
    api: {
      bodyParser: {
        sizeLimit: '5mb',
      },
    },
  }

export default async(req,res)=>{
    const {imageUrl, userId, description} = req.body

    if(req.method == 'POST'){
        try {

            const image = await cloudinary.uploader.upload(imageUrl)
            await connectDB()
            const post = await Post.create({imageUrl:image.url, userId, description})
            res.status(200).send({post})
        } catch (error) {
            res.status(500).send({error:error.message})
        }
    }
    if(req.method == 'GET'){
        try {

            await connectDB()
            const posts = await Post.find().populate('userId')
            console.log(posts);
            res.status(200).send({posts})
        } catch (error) {
            res.status(500).send({error:error.message})
        }
    }

    if(req.method == 'DELETE'){
        try {

            await connectDB()
            const post = await Post.findByIdAndDelete(id)
            res.status(200).send({post})
        } catch (error) {
            res.status(500).send({error:error.message})
        }
    }

    if(req.method == 'PATCH'){
        const data = req.body
        try {

            await connectDB()
            const post = await Post.findByIdAndUpdate(id, {...data}, {new:true})
            res.status(200).send({post})
        } catch (error) {
            res.status(500).send({error:error.message})
        }
    }

    
}