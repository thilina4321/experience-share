import { useRadioGroup } from '@material-ui/core'
import {connectDB} from '../../../db/database'
import User from '../../../model/user'
const cloudinary = require('cloudinary').v2
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE', 'PATCH'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    await runMiddleware(req, res, cors)

  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}


export default async(req,res)=>{
    const data = req.query

    console.log(data);
    const userId = data.id
    
    if(req.method == 'GET'){
        try {
            await runMiddleware(req, res, cors)


            await connectDB()
            const user = await User.findById(userId)
            console.log(user);
            res.status(200).send({user: user})
        } catch (error) {
            res.status(500).send({error:error.message})
        }
    }

    
    
}