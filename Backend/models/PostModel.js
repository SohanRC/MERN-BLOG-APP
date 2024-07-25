import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required : true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    postPic: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        required : true,
    },
    category: {
        type: String,
        required : true,
    },
    likes: {
        type: Number,
        default: 0,
        min : 0,
    },
    dislikes: {
        type: Number,
        default: 0,
        min : 0,
    },
    comments: [
        {
            userId: mongoose.Types.ObjectId,
            text : String,
        }
    ],
}, { timestamps: true })

// collection
const PostModel = mongoose.model('Post', PostSchema)

export default PostModel
