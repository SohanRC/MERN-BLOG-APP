import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Input from "./Input"
import { useForm } from 'react-hook-form'
import { Stack, Button } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import userService from '../api/UserService'
import toast from "react-hot-toast"
import { login, logout } from '../store/UserSlice'
import { useNavigate } from 'react-router-dom'

export default function DashProfile() {
  const user = useSelector(state => state.user.userData)
  const inputFileRef = useRef();
  const [loading, setLoading] = useState(false)
  const [currentImageSrc, setCurrentImageSrc] = useState(user.profilePic)
  const [prevImageId, setPrevImageId] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      email: user.email || "",
      username: user.username || "",
      updatedPassword: "",
    }
  })

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    try {
      setUploadLoading(true);

      let response = await userService.uploadImage(file);
      if (!response.data) {
        setUploadLoading(false)
        toast.error("Could Not Upload Image !");
        return;
      }
      const { uploadedImage } = response.data
      setCurrentImageSrc(uploadedImage.secure_url)

      // delete prev uploaded image
      if (prevImageId) {
        await userService.deleteImage(prevImageId);
      }

      setPrevImageId(uploadedImage.public_id);
      setUploadLoading(false)
      toast.success('Image Upload Successful !');
      return;
    } catch (error) {
      console.log(error)
      setUploadLoading(false)
      return false
    }
  }

  const submit = async (data) => {
    try {
      setLoading(true)
      let response = await userService.updateUser({
        ...data,
        imageUrl: currentImageSrc,
      }, user._id);

      if (!response.data) {
        setLoading(false)
        const message = response.response.data.message;
        toast.error(message)
        return;
      }

      toast.success("User Updated !");
      setLoading(false)
      console.log("Updated User : ", response.data.user);
      dispatch(login(response.data.user));
      navigate('/');
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const deleteUser = async () => {
    try {
      setLoading(true)
      let res = await userService.deleteUser(user._id);
      if (!res.data) {
        setLoading(false)
        toast.error("Internal Server Error !")
        return;
      }
      setLoading(true)
      toast.success('User Deleted Successfully !');
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error)
      toast.error("Internal Server Error !");
    }
  }
  return (
    <div className='min-h-screen w-[100vw] flex justify-center items-center'>
      <div className='md:-translate-x-20 flex flex-col gap-5 items-center bg-slate-200 rounded-lg p-12 my-5 dark:text-slate-700'>
        <div>
          <h1 className='text-center text-4xl font-montserrat text-slate-700'>Profile</h1>
        </div>

        <div className='border-8 border-slate-400 rounded-full h-32 w-32 overflow-hidden'>
          <input type="file" name='imageFile' id="imageFile" ref={inputFileRef} hidden
            onChange={handleImageUpload}
          />

          <img src={currentImageSrc} alt="Profile Pic" className='h-32 w-32 cursor-pointer rounded-full object-cover object-center' onClick={() => inputFileRef.current.click()} />
        </div>
        <p className='text-black text-xl'>{uploadLoading ? "Uploading... Wait a bit !!!" : null}</p>
        <div>
          <form action="" onSubmit={handleSubmit(submit)}>
            <Stack direction="column" spacing={2}>
              <div className="flex flex-col">
                <label htmlFor="username" className="cursor-pointer font-semibold mb-2">Username</label>
                <Input
                  label="Username"
                  type="username"
                  control={control}
                  Icon={<AccountCircleIcon />}
                  {...register('username', {
                    required: {
                      value: true,
                      message: "Username Required !",
                    },
                  })}
                />
                <p className="text-red-600">{errors.username?.message}</p>
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
                      message: "Invalid Email Format!"
                    }
                  })}
                />
                <p className="text-red-600">{errors.email?.message}</p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="cursor-pointer font-semibold mb-2">Password</label>
                <Input
                  label="Password"
                  type="password"
                  control={control}
                  Icon={<LockIcon />}
                  {...register('updatedPassword')}
                />
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
                  loading ? "Updating..." : "Update Account"
                }
              </Button>
              <Button
                variant="outlined"
                type="button"
                startIcon={<DeleteIcon />}
                sx={{
                  color: "#c62828",
                  fontSize: { lg: 20, md: 15, xs: 10 },
                }}
                className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                disabled={loading ? true : false}
                onClick={deleteUser}
              >
                {
                  loading ? "Deleting..." : "Delete Account"
                }
              </Button>
            </Stack>
          </form>
        </div>

      </div>
    </div>
  )
}
