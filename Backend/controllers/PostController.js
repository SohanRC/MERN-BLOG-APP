import PostModel from "../models/PostModel.js"
import UserModel from "../models/UserModel.js";
import errorHandler from "../utils/errorhandler.js"

export const createPost = async (req, res, next) => {
    try {
        const post = req.body;
        const { userId } = req.user;

        let response = await PostModel.create({ ...post, userId }); // post created

        // now take the postid and update it in user
        const postId = response._id;
        let user = await UserModel.findOne({ _id: userId });
        const newPosts = [...user.posts, { postId }];
        let updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, {
            posts: newPosts 
        }, { new: true });

        const { password: hash, ...restDetails } = updatedUser._doc

        return res.status(200).json({
            success: true,
            message: "Post Created Successfully !",
            user: restDetails,
            postId,
        })

    } catch (error) {
        next(error);
    }
}