import NextAuth from 'next-auth'
import Provider from 'next-auth/providers'
import bcryptjs from 'bcryptjs'

// database imports
import {connectDB} from '../../../db/database'
import User from '../../../model/user'

// password hash helper
// import {comparePassword} from '../../../helper/hash'

export default NextAuth({
    session:{
        jwt:true,
    },
    providers:[
        Provider.Credentials({
            async authorize(credentials){
                try {
                    // connect to the database
                    await connectDB()

                    const user = await User.findOne({email:credentials.email})
                    console.log(user);
                    if(!user){
                        throw new Error('User not found')
                    }

                    const isValid = await bcryptjs.compare(credentials.password, user.password)
                    if(!isValid){
                        throw new Error('Sorry invalid user name or password')
                    }

                    // set email to the jwt token
                    return {email:user._id, name:user.userName, image:user.profileImage}

                } catch (error) {
                    throw new Error(error.message || 'Something went wrong')
                }


            }
        })
    ]
})
