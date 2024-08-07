import express from "express"
const router = express.Router();
import { deleteImage, deleteUser, getAllUsers, updateUser, uploadImage, getParticularUser, getSearchUsers } from "../controllers/UserController.js";
import fileUpload from "express-fileupload"
import { AdminCheck } from "../middleware/AdminCheck.js"

const fileUploadconfig = {
    useTempFiles: true,
    tempFileDir: '/tmp/',
};

router.get('/getAllUsers', AdminCheck, getAllUsers)
router.get('/getSearchUsers', AdminCheck, getSearchUsers)
router.get('/getUser/:userId', getParticularUser);
router.post('/imageUpload', fileUpload(fileUploadconfig), uploadImage)
router.post('/deleteImage', deleteImage)
router.patch('/updateUser', updateUser)
router.delete('/deleteUser/:id', AdminCheck, deleteUser)


export default router