import CommentModel from "../models/CommentModel.js"
import errorHandler from "../utils/errorhandler.js";

export const createComment = async (req, res, next) => {
    try {
        const { content, userId, postId } = req.body;
        let comment = await CommentModel.create({ content, userId, postId });

        return res.status(201).json({
            success: true,
            message: "Comment Created Successfully!",
            comment
        })
    } catch (error) {
        next(error)
    }
}

export const getAllComments = async (req, res, next) => {
    try {
        const { postId } = req.body;

        let allComments = await CommentModel.find({ postId }).sort({ createdAt: -1 }); // recent ones frist

        return res.status(201).json({
            success: true,
            message: "All Comments !",
            allComments
        })
    } catch (error) {
        next(error)
    }
}

export const likeComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        const comment = await CommentModel.findOne({ _id: commentId });
        if (!comment) return next(errorHandler(404, 'Comment not found !'));

        const { userId } = req.user;
        const result = comment.likes.includes(userId);

        if (!result) {
            comment.likes.push(userId);
            comment.numberOfLikes += 1;
        }
        else {
            comment.likes = comment.likes.filter((e) => e != userId);
            comment.numberOfLikes -= 1;
        }

        const updatedComment = await CommentModel.findByIdAndUpdate(commentId, {
            likes: comment.likes,
            numberOfLikes: comment.numberOfLikes,
        }, { new: true })

        return res.status(201).json({
            success: true,
            message: "Comment updated successfully !",
            updatedComment,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        let result = await CommentModel.findByIdAndDelete({ _id: commentId });

        return res.status(201).json({
            success: true,
            message: "Comment Deleted !",
        })
    } catch (error) {
        next(error)
    }
}

export const editComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        let updatedComment = await CommentModel.findByIdAndUpdate(commentId, {
            content
        }, { new: true });

        return res.status(201).json({
            success: true,
            message: "Comment updated successfully !",
            updatedComment,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}