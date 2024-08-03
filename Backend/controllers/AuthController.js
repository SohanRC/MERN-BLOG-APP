import UserModel from "../models/UserModel.js";
import errorHandler from "../utils/errorhandler.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
config();


export async function signIn(req, res, next) {
    const { email, password } = req.body;
    try {
        let existingUser = await UserModel.findOne({ email });
        if (!existingUser) return next(errorHandler(404, "User Not Found !"));
        
        let result = await bcryptjs.compare(password, existingUser.password);
        if (!result) return next(errorHandler(404, "Incorrect Password !"));

        const tokenOptions = {
            expiresIn: 1000 * 60 * 60 * 2,
        }

        const token = jwt.sign({
            userId: existingUser._id,
            isAdmin : existingUser.isAdmin,
        }, process.env.JWT_SECRET, tokenOptions)

        const { password: hashedPassword, ...restUserDetails } = existingUser._doc;

        return res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 2, sameSite: 'None', httpOnly: true, secure: true}).status(200).json({
            success: true,
            message: "User SignIn Successful !",
            user: restUserDetails,
        })

    } catch (error) {
        next(error)
    }
}

export async function signUp(req, res, next) {
    const { username, email, password } = req.body;
    try {
        try {
            const hashedPassword = await bcryptjs.hash(password, 10)

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) next(errorHandler(400, "User Already Exists !"))


            const newUser = await UserModel.create({
                username, email, password : hashedPassword,
            })

            return res.status(200).json({ success: true, message: "User Created Successfully !" })
        } catch (error) {
            next(errorHandler(400, "Check Credentials ! Username & Email should be unique !"))
        }
    } catch (error) {
        next(error)
    }
}

export async function googleSignIn(req, res, next) {
    try {
        const { displayName, email, photoURL } = req.body;
        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            // already registered (signup)
            const tokenOptions = {
                expiresIn: 1000 * 60 * 60 * 2,
            }

            const token = jwt.sign({
                userId: existingUser._id,
                isAdmin : existingUser.isAdmin,
            }, process.env.JWT_SECRET, tokenOptions)

            const { password: hashedPassword, ...restUserDetails } = existingUser._doc;

            return res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 2, sameSite: 'None', httpOnly: true, secure: true}).status(200).json({
                success: true,
                message: "User SignIn Successful !",
                user: restUserDetails,
            })
        }
        else {
            // new joineee
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

            const hashedPassword = await bcryptjs.hash(randomPassword, 10);

            const newUser = await UserModel.create({
                username: displayName.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePic: photoURL,
            })

            const tokenOptions = {
                expiresIn: 1000 * 60 * 60 * 2,
            }

            const token = jwt.sign({
                userId: newUser._id,
                isAdmin : newUser.isAdmin,
            }, process.env.JWT_SECRET, tokenOptions)

            const { password: hash, ...restUserDetails } = newUser._doc;

            return res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 2, sameSite: 'None', httpOnly: true, secure: true}).status(200).json({
                success: true,
                message: "User SignUP Successful !",
                user: restUserDetails,
            })
        }
    } catch (error) {
        next(error)
    }
}