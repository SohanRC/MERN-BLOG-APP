import express from "express"
import { config } from "dotenv"
config();
import cors from "cors"
import { dbConnect } from "./config/dbConnect.js";
import { AuthRoutes, UserRoutes, PostRoutes, CommentRoutes } from "./routes/routes.js";
import { v2 as cloudinary } from "cloudinary"
import cookieParser from "cookie-parser";


const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------------------------------


// MiddleWares
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(cookieParser());

// ---------------------------------------------------

// routers
app.use('/api/auth', AuthRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/post', PostRoutes)
app.use('/api/comment', CommentRoutes)



// start server
dbConnect().then(() => {
    app.listen(PORT, (err) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log(`Server running at port : ${PORT}`)
    })
})


// Error Middleware
app.use((err, req, res, next) => {
    const message = err.message || "Internal Server Error"
    const statusCode = err.statusCode || 500

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
}) 