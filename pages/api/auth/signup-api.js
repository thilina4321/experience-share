import User from '../../../model/user'
import {connectDB} from '../../../db/database'
import bcryptjs from 'bcryptjs'

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
    if(req.method == 'POST'){
        try {

            await runMiddleware(req, res, cors)

            await connectDB()

            const {userName, email, password} = req.body
            const hash = await bcryptjs.hash(password, 8)
            const user = await User.create({email, password:hash, userName})



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