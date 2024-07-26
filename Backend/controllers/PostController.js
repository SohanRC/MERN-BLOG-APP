import mongoose from "mongoose";
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

export const getAllPosts = async (req, res, next) => {
    try {
        let posts = await PostModel.find({});

        return res.status(201).json({
            success: true,
            message: "All Posts Fetch Successful!",
            posts
        })
    } catch (error) {
        next(error)
    }
}

// based on search
export const getSearchPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const posts = await PostModel.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                title: { $regex: req.query.searchTerm, $options: 'i' },
                description: { $regex: req.query.searchTerm, $options: 'i' },
            })
        }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

        const totalPosts = await PostModel.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
        )

        const lastMonthCount = await PostModel.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        })

        return res.status(201).json({
            success: true,
            message: "Search Successful !",
            posts,
            totalPosts,
            lastMonthCount
        })
    } catch (error) {
        next(error)
    }
}

export const deletePost = async (req, res, next) => {
    try {
        console.log(req.params)
        const { postId } = req.params;

        // first delete the actual post
        await PostModel.findOneAndDelete({ _id: postId });

        // now delete the post id from the user
        const { userId } = req.user;
        const user = await UserModel.findOne({ _id: userId });
        const existingPosts = user.posts; // array
        const newPosts = existingPosts.filter((post) => post.postId != postId);

        let updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, {
            posts: newPosts,
        }, { new: true })

        const { password: hash, ...restDetails } = updatedUser._doc;

        return res.status(201).json({
            success: true,
            message: "Post Deleted Successfully !",
            userData: restDetails
        })
    } catch (error) {
        next(error)
    }
}
