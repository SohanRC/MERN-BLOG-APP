import React, { useState, useEffect, lazy } from 'react'
import postService from '../api/PostService';
import toast from 'react-hot-toast';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { update } from '../store/UserSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function DashPosts() {

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true)
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    const getPosts = async () => {
      setLoading(true)
      try {
        // get all posts by the current Admin
        let response = await postService.getPost({
          userId: user._id,
        });
        setLoading(false)

        if (!response.data) {
          toast.error('Could Not Fetch Post ! Internal Server Error !')
          return;
        }
        console.log(response.data.posts)
        if (response.data.posts.length < 9) setShowMore(false)
        setPosts(response.data.posts);
        return;
      } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error('Could Not Fetch Post ! Internal Server Error !');
        return;
      }
    }

    if (user.isAdmin) { getPosts(); }
  }, [user])

  const handleShowMore = async () => {
    try {
      const startIndex = posts.length; // fetch from this index onwards
      let response = await postService.getPost({
        startIndex,
      })

      if (!response.data) {
        toast.error('Could Not Fetch Post ! Internal Server Error !')
        return;
      }

      if (response.data.posts.length < 9) setShowMore(false)
      setPosts((posts) => [...posts, ...response.data.posts]);
      return;
    } catch (error) {
      console.log(error)
      return;
    }
  }


  const handlePostDelete = async (postId) => {
    try {
      setLoading(true)
      const response = await postService.deletePost(postId);
      setLoading(false)
      if (!response.data) {
        toast.error('Could Not Delete Post !');
        return;
      }

      toast.success('Post Deleted !');
      const { userData } = response.data;
      dispatch(update(userData));
      return;
    } catch (error) {
      console.log(error)
      return;
    }
  }


  return loading ? (
    <div className='grid place-items-center min-h-screen w-[100vw] md:-translate-x-28'>
      <Loader />
    </div>
  ) : posts?.length ? (
    <>
      <TableContainer component={Paper} className='w-full bg-slate-100 dark:bg-[rgb(31,41,55)]'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className='w-full'>
          <TableHead>
            <TableRow>
              <TableCell>DATE UPDATED</TableCell>
              <TableCell align="left">POST IMAGE</TableCell>
              <TableCell align="left">POST TITLE</TableCell>
              <TableCell align="left">CATEGORY</TableCell>
              <TableCell align="left">DELETE</TableCell>
              <TableCell align="left">EDIT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              posts.map((post) => {
                return <TableRow
                  key={post._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="post">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">
                    <Link to={`/post/${post._id}`}>
                      <LazyLoadImage src={post.postPic} alt="PostPic" className='h-16 w-28' />
                    </Link>
                  </TableCell>
                  <TableCell align="left">{post.title}</TableCell>
                  <TableCell align="left">{post.category}</TableCell>
                  <TableCell align="left">
                    <Button variant='contained' color='error' sx={{
                      fontSize: { md: "0.7rem" }
                    }}
                      onClick={() => handlePostDelete(post._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button variant='contained' color='primary' sx={{
                      fontSize: { md: "0.7rem" }
                    }}
                      onClick={() => navigate(`/edit-post/${post._id}`)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
      </TableContainer>

      {showMore && <Button variant='contained'
        className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-[0.8] m-3"
        sx={{
          fontSize: { lg: 20, md: 15, xs: 10 },
        }}
        onClick={handleShowMore}
      >
        Show More
      </Button>}

    </>

  ) : "No Posts Available ! Create a Post to view it !"
}
