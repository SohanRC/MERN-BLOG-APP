import { v2 as cloudinary } from "cloudinary"
import { config } from "dotenv";
import errorHandler from "../utils/errorhandler.js";
config();
import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs"


async function cloudinaryUpload(file, options) {
    try {
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.log(error)
        return false
    }
}

async function cloudinaryDelete(id) {
    try {
        return await cloudinary.uploader.destroy(id);
    } catch (error) {
        console.log(error)
        return false
    }
}

export const uploadImage = async (req, res, next) => {
    try {
        const imageFile = req.files.image;

        let result = await cloudinaryUpload(imageFile, {
            folder: process.env.CLOUDINARY_FOLDER,
        })

        if (!result) {
            next(errorHandler(404, "Could Not Upload Image !"));
            return;
        }


        return res.status(200).json({
            success: true,
            message: "Image Uplaoded !",
            uploadedImage: result,
        });
    } catch (error) {
        next(error)
    }
}

export const deleteImage = async (req, res, next) => {
    try {
        const { id } = req.body;
        let result = await cloudinaryDelete(id);

        if (!result) {
            next(errorHandler(500, "File Could Not Be Deleted !"))
            return;
        }

        return res.status(200).json({
            success: true,
            message: "File Deleted !",
        })
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        let { data: { username, email, updatedPassword, imageUrl }, id } = req.body;
        const currentUser = await UserModel.findOne({ _id: id });

        // check user with existing username
        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername && currentUser.username !== username) {
            next(errorHandler(404, "User with this username already exits !"));
            return;
        }

        // check user with exixsitng Email
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail && currentUser.email !== email) {
            next(errorHandler(404, "User with this Email Id already Exists !"));
            return;
        }

        // All Ok
        // hash passowrd
        const hashedPassword = updatedPassword ? await bcryptjs.hash(updatedPassword, 10) : currentUser.password;


        // update the user
        const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, {
            username,
            email,
            password: hashedPassword,
            profilePic: imageUrl,
        }, { new: true, })


        return res.status(200).json({
            success: true,
            message: "User Updated Succes !",
            user: updatedUser,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await UserModel.findOneAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully !",
        })
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({});

        const usersWithoutPassword = users.map((user) => {
            const { password: hash, ...restDetails } = user._doc;
            return restDetails;
        })

        const totalUsers = await UserModel.countDocuments();

        const now = new Date();
        const lastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )

        const lastMonthUsers = await UserModel.countDocuments({
            createdAt : {$gte : lastMonth}
        })

        return res.status(200).json({
            success: true,
            message: "All Users Fetched !",
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers
        })
    } catch (error) {
        next(error)
    }
}

export const getParticularUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        let userDetails = await UserModel.findOne({ _id: userId });

        const { password: hash, ...user } = userDetails._doc;

        return res.status(201).json({
            success: true,
            message: "User fetched Successful !",
            user,
        })
    } catch (error) {
        next(error)
    }
}

export const getSearchUsers = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const users = await UserModel.find({
            ...(req.query.userId && {_id: req.query.userId }),
        }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

        const totalUsers = await UserModel.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
        )

        const lastMonthUsers = await UserModel.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        })

        return res.status(201).json({
            success: true,
            message: "Search Successful !",
            users,
            totalUsers,
            lastMonthUsers
        })
    } catch (error) {
        next(error)
    }
}