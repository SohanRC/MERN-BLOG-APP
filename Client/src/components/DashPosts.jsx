import React, { useState, useEffect } from 'react'
import postService from '../api/PostService';
import toast from 'react-hot-toast';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';


export default function DashPosts() {

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

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
        setPosts(response.data.posts)
        return;
      } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error('Could Not Fetch Post ! Internal Server Error !');
        return;
      }
    }

    if (user.isAdmin) { getPosts(); }
  }, [])

  
  // const handlePostDelete = async (postId) => {
  //   try {
      
  //   } catch (error) {
  //     console.log(error)
  //     return;
  //   }
  // }


  return loading ? (
    <div className='grid place-items-center min-h-screen w-[100vw] md:-translate-x-28'>
      <Loader />
    </div>
  ) : posts?.length ? (

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
                  <img src={post.postPic} alt="PostPic" className='h-16 w-28' />
                </TableCell>
                <TableCell align="left">{post.title}</TableCell>
                <TableCell align="left">{post.category}</TableCell>
                <TableCell align="left">
                  <Button variant='contained' color='error' sx={{
                    fontSize: { md: "0.7rem" }
                  }}
                    // onClick={() => handlePostDelete(post._id)}
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

  ) : "No Posts Available ! Create a Post to view it !"
}
