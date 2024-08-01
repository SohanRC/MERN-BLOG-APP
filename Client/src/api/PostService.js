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
            }, { withCredentials: true })
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    async getPost(query) {
        try {
            let uri = '/post/getSearchPosts?';
            for (let keys in query) uri = uri + `${keys}=${query[keys]}&`;
            let arr = uri.split('')
            arr.splice(arr.length - 1, 1);
            uri = arr.join('');
            return await axios.get(uri);
        } catch (error) {
            return error
        }
    }

    async getAllPosts(query) {
        try {
            let uri = '/post/getSearchPosts?';
            for (let keys in query) uri = uri + `${keys}=${query[keys]}&`;
            let arr = uri.split('')
            arr.splice(arr.length - 1, 1);
            uri = arr.join('');
            console.log(uri)
            return await axios.get('/post/getSearchPosts');
        } catch (error) {
            return error
        }
    }

    async deletePost(postId) {
        try {
            return await axios.delete(`/post/deletePost/${postId}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async editPost(data, postId) {
        try {
            const { title, category, imageFile, description } = data;
            if (imageFile) {
                let imageResponse = await userService.uploadImage(imageFile[0]);
                if (!imageResponse.data) {
                    toast.error("Could Not Upload Image !");
                    return;
                }
                const { uploadedImage } = imageResponse.data
                toast.success('Image Uploaded Successfully !');

                return await axios.patch(`/post/edit-post/${postId}`, {
                    title,
                    category,
                    postPic: uploadedImage.secure_url,
                    description,
                }, {
                    withCredentials: true
                });
            }
            else {
                return await axios.patch(`/post/edit-post/${postId}`, {
                    title,
                    category,
                    description,
                }, {
                    withCredentials: true
                });
            }
        } catch (error) {
            console.log(error)
            return;
        }
    }
}


const postService = new PostService();

export default postService