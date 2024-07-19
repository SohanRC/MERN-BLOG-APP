import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true || "Username required !",
        unique: true || "Username already taken !",
    },
    email: {
        type: String,
        required: true || "Username required !",
        unique: true || "Username already taken !",
    },
    password: {
        type: String,
        required: true || "Username required !",
    },
    profilePic: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isAdmin: {
        type: String,
        default: false,
        required: true || "Username required !",
    },
    posts: [{ type: mongoose.ObjectId }]
}, { timestamps: true })

// collection
const UserModel = mongoose.model('User', UserSchema)

export default UserModel
