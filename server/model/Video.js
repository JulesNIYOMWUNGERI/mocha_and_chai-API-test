import mongoose from 'mongoose';


const videoSchema = mongoose.Schema({
    creatorId: { 
        type: String, 
    },
    title: { 
        type: String, 
    },
    desc: { 
        type: String,
    },
    imgUrl: { 
        type: String,
    },
    videoUrl: { 
        type: String, 
    },
    views: {
        type: Number,
        default: 0
    },
    tags: {
        type:[String]
    },
    likes: {
        type:[String],
        default:[]
    },
    dislikes: {
        type:[String],
        default:[]
    }
},
{timestamps:true}
)

export default mongoose.model('Video',videoSchema);