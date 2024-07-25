import express from "express"
import { createPost, getAllPosts, getSearchPosts } from "../controllers/PostController.js";
import { AdminCheck } from "../middleware/AdminCheck.js";
const router = express.Router();


router.get('/getAllPosts', getAllPosts)
router.get('/getSearchPosts', getSearchPosts)
router.post('/createPost', AdminCheck , createPost)











export default router