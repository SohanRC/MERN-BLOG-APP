import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ArticleCard from './ArticleCard'
import Loader from "./Loader"
import postService from '../api/PostService'
import toast from 'react-hot-toast'
export default function Home() {

    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getRecentPosts = async () => {
            setLoading(true);
            try {
                let res = await postService.getPost({
                    limit: 3,
                    order: 'des'
                })
                setLoading(false)

                if (!res.data) {
                    const { response: { data: { message } } } = res;
                    toast.error(message)
                    console.log(res)
                    return;
                }

                const { data: { posts } } = res;
                setRecentPosts(posts);
                return;
            } catch (error) {
                console.log("Error !", error)
                toast.error(error.message);
                return;
            }
        }

        getRecentPosts();
    }, [])

    useEffect(() => {
        console.log("Recent Possts : ", recentPosts);
    }, [recentPosts])

    return (
        <div className='min-h-screen w-full flex flex-col items-center justify-center font-montserrat gap-5 p-14'>
            <h1 className=' text-3xl md:text-5xl text-center'>Welcome To <span className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-5xl md:text-8xl">Bloggify!</span></h1>
            <h2 className='text-sm md:text-lg text-center'>
                Dive into a world of insightful articles, engaging stories, and expert advice on topics that matter to you. Whether you're looking for the latest trends, thought-provoking ideas, or practical tips, BLOGGIFY is your go-to source for inspiration and knowledge. Explore and start your journey of discovery today!
            </h2>
            <Link to="/projects">
                <Button
                    variant="contained"
                    type="submit"
                    className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-[0.9]"
                    sx={{
                        fontSize: { lg: 22, md: 17, xs: 12 },
                    }}
                >
                    Explore More Articles !
                </Button>
            </Link>

            <div className='w-full mt-14 p-10'>
                <h1 className=' text-3xl md:text-5xl text-center'>Recent Articles </h1>
                {
                    loading ?
                        <div className='grid place-items-center mt-12'>
                            <Loader />
                        </div>
                        :
                        <div className='mt-10 flex justify-center items-center gap-12 flex-wrap'>
                            {
                                recentPosts ?
                                    <>
                                        {
                                            recentPosts.map((post) => {
                                                return <Link to={`/post/${post._id}`}>
                                                    <ArticleCard post={post} key={post._id} />
                                                </Link>
                                            })
                                        }
                                    </> :
                                    <>
                                        <h1 className=' text-3xl md:text-5xl text-center'>No recent Articles !</h1>
                                    </>
                            }
                            {/* // <ArticleCard />
                            // <ArticleCard />
                            // <ArticleCard /> */}
                        </div>
                }

            </div>

        </div>
    )
}
