import mongoose from 'mongoose'

const user = new mongoose.Schema({
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    userName:{type:String, required:true}
})

export default mongoose.models.user || mongoose.model('user', user)