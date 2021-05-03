import mongoose from 'mongoose'

const user = new mongoose.Schema({
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    userName:{type:String, required:true},
    profileImage:{type:String}
})

user.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
  
    delete userObject.password
  
    return userObject
  }

export default mongoose.models.user || mongoose.model('user', user)