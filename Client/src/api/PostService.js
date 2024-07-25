import axios from "axios"
import userService from "./UserService";
import toast from "react-hot-toast";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL


class PostService {


    async createPost(data) {
        try {
            const { title, category, imageFile, description } = data;
            let imageResponse = await userService.uploadImage(imageFile[0]);
            if (!imageResponse.data) {
                toast.error("Could Not Upload Image !");
                return;
            }
            const { uploadedImage } = imageResponse.data
            toast.success('Image Uploaded Successfully !');
            // currentImageSrcRef.current = uploadedImage.secure_url;

            return await axios.post('/post/createPost', {
                title,
                category,
                postPic: uploadedImage.secure_url,
                description,
            }, {withCredentials : true})
        } catch (error) {
            console.log(error)
            return error;
        }
    }
}


const postService = new PostService();

export default postService