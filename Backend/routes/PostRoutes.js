import express from "express"
import { createPost } from "../controllers/PostController.js";
import { AdminCheck } from "../middleware/AdminCheck.js";
const router = express.Router();


router.post('/createPost', AdminCheck , createPost)











export default router