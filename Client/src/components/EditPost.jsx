import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from './Input'
import SelectComponent from './Select';
import { Button } from '@mui/material';
import RTK from './RTK';
import postService from '../api/PostService';
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { useNavigate, useParams } from 'react-router-dom';
import { logout } from '../store/UserSlice';

export default function EditPost() {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { postId } = useParams();
  const user = useSelector((state) => state.user.userData)
  const [post, setPost] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {

    async function getPostById() {
      try {
        setLoading(true)
        let response = await postService.getPost({
          postId
        })
        setLoading(false)

        if (!response.data) {
          toast.error('Could not fetch post !');
          navigate('/dashboard?tab=posts')
          return;
        }

        setPost(response.data.posts[0]);
        return;

      } catch (error) {
        console.log(error)
        return;
      }
    }

    if (user.isAdmin) getPostById();
  }, [])


  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
    defaultValues: {
      title: "",
      category: "",
      imageFile: "",
      description:  "",
    }
  });

  useEffect(() => {
    if (post) {
      setValue('title', post.title)
      setValue('category', post.category)
      setValue('description', post.description)
    }
  }, [post])


  const submit = async (data) => {
    try {
      setLoading(true)
      let response = await postService.editPost(data, post._id);
      setLoading(false)

      // unauthorized creation other than admin
      if (!response.data) {
        const status = response.response.status;
        if (status === 401) {
          toast.error('Session Timed Out ! Login Again to Continue !');
          dispatch(logout());
          navigate('/signin');
        }
        else if (status === 403) toast.error('User does not have permission to Update post!');
        return;
      }

      let { message } = response.data;
      toast.success(message);
      navigate(`/dashboard?tab=posts`);
      return;
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error('Unauthorized ! Login to Continue!');
      navigate(`/dashboard?tab=posts`);
      return;
    }
  }

  const list = [
    {
      id: 1,
      value: "react-js",
    },
    {
      id: 2,
      value: "next-js",
    },
    {
      id: 3,
      value: "javascipt",
    },
  ]

  return (
    <div className='min-h-screen max-w-3xl mx-auto py-10 text-slate-700'>
      <div className='border-2 border-teal-500 bg-slate-100 p-3 rounded-md shadow-2xl shadow-slate-400'>
        <h1 className='font-montserrat text-4xl text-center text-slate-700'>Edit Post</h1>
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

          {post && <img src={post.postPic} alt={post.title} />}
          <div className='w-full border-2 border-teal-500 p-4 border-dotted flex gap-5 flex-wrap'>
            <label htmlFor="image" className='text-xl'>Select An Image</label>
            <input type="file" id="image" accept='image/*'
              {...register('imageFile')}
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
              loading ? "Editing Post..." : "Edit Post"
            }
          </Button>

        </form>

      </div>
    </div>
  )
}
