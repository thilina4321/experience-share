import {connectDB} from '../../../db/database'
import Post from '../../../model/exe'
const cloudinary = require('cloudinary').v2
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  origin:"*",

  methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE', 'PATCH'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {

  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}




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
    
  await runMiddleware(req, res, cors)
    const posts = req.query
    const userId = posts['user-posts'][0]
    if(req.method == 'GET'){
        try {

            await connectDB()
            const posts = await Post.find({userId}).populate('userId')
            if(!posts) posts = []
            res.status(200).send({posts})
        } catch (error) {
            res.status(500).send({error:error.message})
        }
    }

    
    
}