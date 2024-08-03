import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from './Input'
import SelectComponent from './Select';
import { Button } from '@mui/material';
import RTK from './RTK';
import postService from '../api/PostService';
import { useSelector, useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { logout, update } from '../store/UserSlice';

export default function CreatePost() {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      category: "",
      imageFile: "",
      description: "",
    }
  });
  const submit = async (data) => {
    try {
      setLoading(true)
      let response = await postService.createPost(data);
      setLoading(false)

      // unauthorized creation other than admin
      if (!response.data) {
        const status = response.response.status;
        if (status === 401) {
          toast.error('Session Timed Out ! Login Again to Continue !');
          dispatch(logout())
          navigate('/signin');
        }
        else if (status === 403) toast.error('User does not have permission to post!');
        return;
      }

      let { message, postId } = response.data;
      toast.success(message);
      navigate(`/post/${postId}`);
    } catch (error) {
      console.log(error)
      setLoading(false)
      return;
    }
  }

  const list = [
    {
      id: 1,
      value: "sports",
    },
    {
      id: 2,
      value: "movies",
    },
    {
      id: 3,
      value: "technology",
    },
    {
      id: 4,
      value: "travel",
    },
  ]

  return (
    <div className='min-h-screen max-w-3xl mx-auto py-10 text-slate-700'>
      <div className='border-2 border-teal-500 bg-slate-100 p-3 rounded-md shadow-2xl shadow-slate-400'>
        <h1 className='font-montserrat text-4xl text-center text-slate-700'>Create A Post</h1>
        <form action="" onSubmit={handleSubmit(submit)}
          className='grid place-items-center my-3 gap-4'
        >
          <div className='flex flex-wrap gap-5 items-center justify-center'>
            <div>
              <Input
                label="Title"
                type="text"
                control={control}
                {...register('title', {
                  required: {
                    value: true,
                    message: "Enter the Title For the Post !",
                  }
                })}
              />
              <p className="text-red-600">{errors.title?.message}</p>
            </div>
            <div>
              <SelectComponent
                label="Category"
                control={control}
                list={list}
                {...register('category', {
                  required: {
                    value: true,
                    message: "Select A Category !",
                  }
                })}
              />
              <p className="text-red-600">{errors.category?.message}</p>
            </div>
          </div>
          <div className='w-full border-2 border-teal-500 p-4 border-dotted flex gap-5 flex-wrap'>
            <label htmlFor="image" className='text-xl'>Select An Image</label>
            <input type="file" id="image" accept='image/*'
              {...register('imageFile', {
                required: {
                  value: true,
                  message: "Select A Cover Picture !",
                }
              })}
            />
            <p className="text-red-600">{errors.imageFile?.message}</p>
          </div>

          <div className='border-2 border-teal-500 w-full'>
            <RTK control={control} {...register('description', {
              required: {
                value: true,
                message: "Enter Description!",
              }
            })} />
            <p className="text-red-600">{errors.imageFile?.message}</p>
          </div>



          <Button
            variant="contained"
            type="submit"
            color="primary"
            className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
            fullWidth
            disabled={loading ? true : false}
          >
            {
              loading ? "Creating Post..." : "Create Post"
            }
          </Button>

        </form>

      </div>
    </div>
  )
}
