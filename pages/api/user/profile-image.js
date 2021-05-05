import {connectDB} from '../../../db/database'
import User from '../../../model/user'
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
    const {url, id} = req.body


    await runMiddleware(req, res, cors)
    try {

        const image = await cloudinary.uploader.upload(url)
        await connectDB()
        await User.findByIdAndUpdate(id, {profileImage:image.url})
        res.status(200).send({image:image.url})
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}