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
            return await axios.delete(`/user/deleteUser/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            return error
        }
    }

    async getAllUsers() {
        try {
            return await axios.get('/user/getAllUsers', {
                withCredentials: true,
            });
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    async getParticularUser(userId) {
        try {
            return await axios.get(`/user/getUser/${userId}`, {
                withCredentials: true
            })
        } catch (error) {
            return error
        }
    }

    async getSearchUser(query) {
        try {
            let uri = '/user/getSearchUsers?';
            for (let keys in query) uri = uri + `${keys}=${query[keys]}&`;
            let arr = uri.split('')
            arr.splice(arr.length - 1, 1);
            uri = arr.join('');
            return await axios.get(uri, {withCredentials : true});
        } catch (error) {
            return error
        }
    }
}


const userService = new UserService();

export default userService