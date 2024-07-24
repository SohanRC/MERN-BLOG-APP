import express from "express"
const router = express.Router();
import { deleteImage, deleteUser, updateUser, uploadImage } from "../controllers/UserController.js";
import fileUpload from "express-fileupload"


const fileUploadconfig = {
    useTempFiles: true,
    tempFileDir: '/tmp/'
};

router.post('/imageUpload', fileUpload(fileUploadconfig), uploadImage)
router.post('/deleteImage', deleteImage)
router.patch('/updateUser', updateUser)
router.delete('/deleteUser/:id', deleteUser)


export default router