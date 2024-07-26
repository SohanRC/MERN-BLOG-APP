import express from "express"
import { createPost, deletePost, editPost, getAllPosts, getSearchPosts } from "../controllers/PostController.js";
import { AdminCheck } from "../middleware/AdminCheck.js";
const router = express.Router();


router.get('/getAllPosts', getAllPosts)
router.get('/getSearchPosts', getSearchPosts)
router.post('/createPost', AdminCheck, createPost)
router.patch('/edit-post/:postId', AdminCheck, editPost)
router.delete(`/deletePost/:postId`, AdminCheck, deletePost);











export default router