import mongoose from 'mongoose'

const post = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'user'},
    description:{type:String, required:true},
    imageUrl:{type:String, required:true},
    comments:[]
    
})

export default mongoose.models.post || mongoose.model('post', post)