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
    
    if(req.method == 'POST'){
        const {imageUrl, userId, description} = req.body
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
            res.status(200).send({posts})
        } catch (error) {
            res.status(500).send({error:error.message})
        }
    }

    if(req.method == 'DELETE'){
        const {id} = req.query
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
        const id = data.id
        try {

            let image ;
            if(data.isImageEdit){
                 let newImage = await cloudinary.uploader.upload(imageUrl)
                 image = newImage.url

            }else{
                image = data.imageUrl
            }

            await connectDB()
            const post = await Post.findByIdAndUpdate(id, {...data, imageUrl:image}, {new:true})
            res.status(200).send({post})
        } catch (error) {
            res.status(500).send({error:error.message})
        }
    }

    
}