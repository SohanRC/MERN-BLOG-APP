import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isAdmin: {
        type: String,
        default: false,
        required: true,
    },
    posts: [{ type: mongoose.ObjectId }]
}, { timestamps: true })

// collection
const UserModel = mongoose.model('User', UserSchema)

export default UserModel
