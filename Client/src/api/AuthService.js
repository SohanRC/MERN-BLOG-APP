import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL


class AuthService {

    async signup(data) {
        try {
            return await axios.post('/auth/signup', data, {
                withCredentials : true,
            });
        } catch (error) {
            return error
        }
    }

    async signin(data) {
        try {
            return await axios.post('/auth/signin', data, {
                withCredentials : true,
            })
        } catch (error) {
            return error
        }
    }
}

const authService = new AuthService();

export default authService