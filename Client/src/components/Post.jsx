import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import postService from '../api/PostService';
import toast from 'react-hot-toast';
import Loader from "./Loader"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import parse from 'html-react-parser'

export default function Post() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  useEffect(() => {

    const getPost = async () => {
      setLoading(true)
      try {
        let response = await postService.getPost({
          postId
        })
        setLoading(false)

        if (!response.data) {
          const { response: { data: { message } } } = response;
          toast.error(message)
          navigate('/');
          return;
        }

        const { posts, message } = response.data;
        setPost(posts[0]);
        return
      } catch (error) {
        console.log(error)
        toast.error('Could not Load Post !');
        navigate('/');
        return;
      }
    }

    getPost();
  }, [postId])

  return (
    <div className='min-h-screen w-[100vw]'>
      {loading ?
        <div className='grid place-items-center min-h-screen w-[100vw] '>
          <Loader />
        </div>
        :
        <div className='max-w-6xl border-2 border-rose-500 mx-auto flex flex-col justify-center items-center gap-8 p-8'>
          <div className='max-w-3xl text-center'>
            <h1 className='sm:text-2xl md:text-4xl font-montserrat'>
              {post?.title}
            </h1>
          </div>
          <div>
            <h2 className='border-2 border-teal-500 py-1 px-2 rounded-xl'>{post?.category}</h2>
          </div>
          <div className='p-2'>
            <LazyLoadImage src={post?.postPic} alt="PostPic" className='
            max-h-[600px] w-full object-cover shadow-md shadow-slate-800' />
          </div>
          <div className='w-full'>
            <div className='flex justify-end p-2 text-xm'>
              <p>Created At : {new Date(post?.createdAt).toLocaleDateString()}</p>
            </div>
            <hr className='dark:bg-white bg-slate-700 w-full' />
          </div>
          <div className='w-full p-5 post-description'>
            {parse(String(post?.description))}
          </div>
        </div>
      }
    </div>
  )


}
