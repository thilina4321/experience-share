import { useRadioGroup } from '@material-ui/core'
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