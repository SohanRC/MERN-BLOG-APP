import express from "express"
import { createComment, deleteComment, editComment, getAllComments, likeComment } from "../controllers/CommentController.js";
import { VerifyToken } from "../middleware/VerifyToken.js";
const router = express.Router();




router.post('/createComment', createComment)
router.post('/getAllComments', getAllComments)
router.patch('/likeComment/:commentId', VerifyToken, likeComment);
router.patch('/editComment/:commentId', VerifyToken, editComment);
router.delete('/deletComment/:commentId', VerifyToken, deleteComment);




export default router