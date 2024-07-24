import axios from "axios"
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL


class UserService {


    async uploadImage(file) {
        try {
            let data = new FormData();
            data.append('image', file);
            return await axios.post('/user/imageUpload', data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async deleteImage(id) {
        try {
            return await axios.post('/user/deleteImage', { id });
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async updateUser(data, id) {
        try {
            return await axios.patch('/user/updateUser', {
                data,
                id,
            });
        } catch (error) {
            return error
        }
    }

    async deleteUser(id) {
        try {
            return await axios.delete(`/user/deleteUser/${id}`);
        } catch (error) {
            return error
        }
    }
}


const userService = new UserService();

export default userService