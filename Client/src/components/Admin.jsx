import React, { useEffect, useState } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import userService from '../api/UserService';
import postService from '../api/PostService';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Admin() {

  const [userInfo, setUserInfo] = useState({});
  const [postInfo, setPostInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  // console.log("User Info : ", userInfo)
  // console.log("Post Info : ", postInfo)

  useEffect(() => {
    if (!currentUser.isAdmin) {
      toast.error('You are not authorized to visit the Dashboard !');
      navigate('/');
      return;
    }

    setLoading(true)


    const getUserDetails = async () => {
      try {
        let res = await userService.getSearchUser({
          limit: 6,
        })
        console.log("User : ", res)
        if (!res.data) {
          setLoading(false);
          console.log(res)
          const { data: { message } } = res.response;
          toast.error(message)
          navigate('/');
          return;
        }

        const { data: { users, totalUsers, lastMonthUsers } } = res;
        setUserInfo({ users, totalUsers, lastMonthUsers });
        return;
      } catch (error) {
        console.log(error)
        setLoading(false)
        const { data: { message } } = error.response;
        toast.error(message)
        navigate('/');
        return;
      }
    }

    const getPostDetails = async () => {
      try {
        let res = await postService.getPost({
          limit: 8,
        });

        console.log("Posts : ", res)

        if (!res.data) {
          console.log(res)
          setLoading(false)
          const { data: { message } } = res.response;
          toast.error(message)
          navigate('/');
          return;
        }

        const { data: { posts, totalPosts, lastMonthCount } } = res;
        setPostInfo({ posts, totalPosts, lastMonthCount });
        return;
      } catch (error) {
        setLoading(false)
        console.log(error)
        const { data: { message } } = error.response;
        toast.error(message)
        navigate('/');
        return;
      }
    }

    getUserDetails();
    getPostDetails();
  }, [])


  return (
    <div className='min-h-screen w-full p-10  font-montserrat'>
      <div className='w-full flex justify-evenly items-center gap-5 flex-wrap'>
        <Link to='/dashboard?tab=users'>
          <div className="users flex justify-center items-center gap-12 border-2 border-teal-500 p-2 shadow-slate-500 shadow-lg dark:shadow-teal-400 rounded-lg">
            <div className="info font-bold">
              <h1 className=' text-2xl md:text-3xl'>TOTAL USERS</h1>
              <h2 className=' text-2xl md:text-3xl'>{userInfo?.totalUsers || 0}</h2>
              <p className='text-teal-700 dark:text-teal-400 mt-3'><ArrowUpwardIcon className='text-md' /> {userInfo?.lastMonthUsers || 0} last month</p>
            </div>
            <div className="icon self-start">
              <GroupIcon className='text-teal-700 dark:text-teal-400 text-3xl md:text-5xl' />
            </div>
          </div>
        </Link>
        <Link to='/dashboard?tab=posts'>
          <div className="posts flex justify-center items-center gap-12 border-2 border-teal-500 p-2 shadow-slate-500 shadow-lg dark:shadow-teal-400 rounded-lg">
            <div className="info font-bold">
              <h1 className=' text-2xl md:text-3xl'>TOTAL POSTS</h1>
              <h2 className=' text-2xl md:text-3xl'>{postInfo?.totalPosts || 0}</h2>
              <p className='text-teal-700 dark:text-teal-400 mt-3'><ArrowUpwardIcon className='text-md' /> {postInfo?.lastMonthCount || 0} last month</p>
            </div>
            <div className="icon self-start">
              <PostAddIcon className='text-teal-700 dark:text-teal-400 text-3xl md:text-5xl' />
            </div>
          </div>
        </Link>
      </div>
      <div className='allUsersPosts font-montserrat max-w-2xl mx-auto mt-14 p-4 grid gap-5 items-center'>
        <div className='mx-auto'>
          <h1 className='md:text-3xl m-2'>Recent Users
            <Link to='/dashboard?tab=users'>
              <Button className=" ml-4 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                See All
              </Button>
            </Link>
          </h1>
          <TableContainer component={Paper} className=' md:w-full bg-slate-100 dark:bg-[rgb(31,41,55)] self-start w-72'>
            <Table sx={{ minWidth: 300 }} aria-label="simple table" className='w-full'>
              <TableHead>
                <TableRow>
                  <TableCell>USER IMAGE</TableCell>
                  <TableCell align="left">USERNAME</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  userInfo?.users?.map((user) => {
                    return <TableRow
                      key={user._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="user">
                        <LazyLoadImage src={user.profilePic} alt="ProfilePic" className='h-12 w-12 rounded-full' />
                      </TableCell>
                      <TableCell align="left">{user.username}</TableCell>
                    </TableRow>
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className='mx-auto'>
          <h1 className='md:text-3xl m-2'>Recent Posts
            <Link to='/dashboard?tab=posts'>
              <Button className=" ml-4 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                See All
              </Button>
            </Link>
          </h1>
          <TableContainer component={Paper} className=' w-96 md:w-full bg-slate-100 dark:bg-[rgb(31,41,55)] self-start'>
            <Table sx={{ minWidth: 300 }} aria-label="simple table" className='w-full'>
              <TableHead>
                <TableRow>
                  <TableCell >POST IMAGE</TableCell>
                  <TableCell align="left">POST TITLE</TableCell>
                  <TableCell align="left">CATEGORY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  postInfo?.posts?.map((post) => {
                    return <TableRow
                      key={post._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="post">
                        <LazyLoadImage src={post.postPic} alt="postPic" className='h-16 w-28 rounded-md' />
                      </TableCell>
                      <TableCell align="left">{post.title}</TableCell>
                      <TableCell align="left">{post.category}</TableCell>
                    </TableRow>
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>

      </div>
    </div>
  )
}
