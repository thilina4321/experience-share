import mongoose from 'mongoose'

const comment = new mongoose.Schema({
    postId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'post'},
    comment:{type:String, required:true},
    owner:{type:String, required:true},
    
})

export default mongoose.models.comment || mongoose.model('comment', comment)