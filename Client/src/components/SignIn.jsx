import React, {useState} from "react"
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form"
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import Input from "./Input";
import { Link } from "react-router-dom";
import authService from "../api/AuthService";

export default function SignIn() {
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const submitEventHandler = async (data) => {
        setLoading(true)
        let res = await authService.signin(data);
        if (!res.data) {
            // error
            let { response: { data: { message } } } = res; // err message
            toast.error(message);
            console.log(res)
            setLoading(false)
            return;
        }

        toast.success(res.data.message);
        setLoading(false)
        // navigate('/signin');
        return;
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <div className="flex justify-center border-2 border-slate-500 items-center gap-5 py-10 px-4 rounded-lg flex-wrap bg-slate-200">
                <div className="max-w-[50%] flex flex-col items-start gap-2">
                    <h1 className="text-xl md:text-3xl font-serif p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">Sohan's Blog</h1>
                    <p className="font-serif md:text-xl">This is Demo Project. You can sign in with email & Password. OAuth Authentication is also provided !</p>
                </div>
                <div className="border-2 border-slate-600 p-5 rounded-lg bg-slate-100
                shadow-lg">
                    <form action="" onSubmit={handleSubmit(submitEventHandler)} className="w-full">
                        <Stack direction="column" spacing={2}>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="cursor-pointer font-semibold mb-2">Your Email</label>
                                <Input
                                    label="Email"
                                    type="email"
                                    control={control}
                                    Icon={<EmailIcon />}
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: "Email Required !",
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
                                            message : "Invalid Email Format!"
                                        }
                                    })}
                                />
                                <p className="text-red-600">{ errors.email?.message }</p>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="cursor-pointer font-semibold mb-2">Your Password</label>
                                <Input
                                    label="Password"
                                    type="password"
                                    control={control}
                                    Icon={<LockIcon />}
                                    {...register('password', {
                                        required: {
                                            value: true,
                                            message: "Password Required !",
                                        },
                                        minLength: {
                                            value: 5,
                                            message : "Minimum length should be 5",
                                        }
                                    })}
                                />
                                <p className="text-red-600">{ errors.password?.message }</p>
                            </div>

                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                                sx={{
                                    fontSize: { lg: 20, md: 15, xs: 10 },
                                }}
                                disabled={loading ? true : false}
                            >
                                {
                                    loading ? "Signing In..." : "Sign In"
                                }
                            </Button>
                            <Button
                                variant="outlined"
                                type="button"
                                startIcon={<GoogleIcon />}
                                sx={{
                                    color: "#c62828",
                                    fontSize: { lg: 20, md: 15, xs: 10 },
                                }}
                                className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                                disabled={loading ? true : false}
                            >
                                {
                                    loading ? "Signing In..." : "Continue With Google"
                                }
                            </Button>
                            <div>
                                <p className="font-semibold">Don't Have An Account ? </p>
                                <Link to='/signup'>
                                    <span className="font-semibold cursor-pointer text-blue-700">Sign Up Now !</span>
                                </Link>
                            </div>
                        </Stack>
                    </form>
                </div>
            </div>
        </div>
    )
}