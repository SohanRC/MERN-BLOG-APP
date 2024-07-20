import express from "express"
const router = express.Router();
import {googleSignIn, signIn, signUp} from "../controllers/AuthController.js";


router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/googleSignIn', googleSignIn)



export default router