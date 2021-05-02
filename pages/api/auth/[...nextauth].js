import NextAuth from 'next-auth'
import Provider from 'next-auth/providers'

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
                        return new Error('User not found')
                    }

                    // const isValid = await comparePassword(credentials.password, user.password)
                    // if(!isValid){
                    //     throw new Error('Could not log in!')
                    // }

                    // set email to the jwt token
                    return {email:user.email, name:user._id}

                } catch (error) {
                    throw new Error(error.message || 'Something went wrong')
                }


            }
        })
    ]
})
