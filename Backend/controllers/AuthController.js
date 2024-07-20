import UserModel from "../models/UserModel.js";
import errorHandler from "../utils/errorhandler.js";
import bcryptjs from "bcryptjs"

export async function signIn(req, res) {
    res.json({ message: "Sign In Controller" })
}

export async function signUp(req, res, next) {
    const { username, email, password } = req.body;
    try {
        try {
            const hashedPassword = await bcryptjs.hash(password, 10)

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) next(errorHandler(400, "User Already Exists !"))


            const newUser = await UserModel.create({
                username, email, password: hashedPassword,
            })

            return res.status(200).json({ success: true, message: "User Created Successfully !" })
        } catch (error) {
            next(errorHandler(400, "Check Credentials ! Username & Email should be unique !"))
        }
    } catch (error) {
        next(error)
    }
}