import axios from "axios"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import firebaseApp from "../../config/firebaseConfig";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL


class AuthService {


    async signup(data) {
        try {
            return await axios.post('/auth/signup', data, {
                withCredentials: true,
            });
        } catch (error) {
            return error
        }
    }

    async signin(data) {
        try {
            return await axios.post('/auth/signin', data, {
                withCredentials: true,
            })
        } catch (error) {
            return error
        }
    }

    async googleSignIn() {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(firebaseApp)
            const result = await signInWithPopup(auth, provider)
            const user = result.user;

            return await axios.post('/auth/googleSignIn', user, {
                withCredentials: true,
            });
        } catch (error) {
            console.log("Error : ", error);
            // error like axios
            const response = {
                response: {
                    data: {
                        success: false,
                        message: "Could Not login !",
                    }
                }
            }
            return response;
        }
    }
}

const authService = new AuthService();

export default authService