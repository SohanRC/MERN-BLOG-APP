import React, { useState, useEffect } from 'react'
import userService from "../api/UserService"
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
import { logout, update } from '../store/UserSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';

export default function DashUsers() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const currentUser = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    const getAllUsers = async () => {
      setLoading(true)
      try {
        // get all users
        let response = await userService.getAllUsers();
        setLoading(false)

        if (!response.data) {
          toast.error('Session Timed Out !');
          dispatch(logout());
          navigate('/signin');
          return;
        }
        setUsers(response.data.users);
        return;
      } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error('Could Not Fetch Users ! Internal Server Error !');
        return;
      }
    }

    if (currentUser.isAdmin) { getAllUsers(); }
  }, [])


  const handleUserDelete = async (userId) => {
    setLoading(true)
    try {
      let response = await userService.deleteUser(userId);
      setLoading(false);

      if (!response.data) {
        const { response: { data: { message }, status } } = response;
        toast.error(message);

        if (status === 401 || status === 403) {
          toast.error('Only Admin Can delete !');
          dispatch(logout())
          navigate('/signin')
        };
        return;
      }

      const { message } = response.data;
      toast.success(message);
      setUsers((prev) => prev.filter((user) => user._id != userId))
      return;
    } catch (error) {
      console.log(error)
      toast.error('Cannot Delete User !');
      return;
    }
  }




  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  }));


  return loading ? (
    <div className='grid place-items-center min-h-screen w-[100vw] md:-translate-x-28'>
      <Loader />
    </div>
  ) : users?.length ? (
    <>
      <TableContainer component={Paper} className='w-full bg-slate-100 dark:bg-[rgb(31,41,55)] self-start'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className='w-full'>
          <TableHead>
            <TableRow>
              <TableCell>DATA CREATED</TableCell>
              <TableCell align="left">USER IMAGE</TableCell>
              <TableCell align="left">USERNAME</TableCell>
              <TableCell align="left">EMAIL</TableCell>
              <TableCell align="left">ADMIN</TableCell>
              <TableCell align="left">DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // display all users except myself
              users.map((user) => {
                return (user._id !== currentUser._id) && <TableRow
                  key={user._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="user">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">
                    <LazyLoadImage src={user.profilePic} alt="profilePic" className='h-16 w-16 rounded-full' />
                  </TableCell>
                  <TableCell align="left">{user.username}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">
                    {user.isAdmin ? <CheckIcon className='text-teal-500 dark:text-teal-400' /> : <CloseIcon  className='text-rose-500' />}
                  </TableCell>
                  <TableCell align="left">
                    <Button variant='contained' color='error' sx={{
                      fontSize: { md: "0.7rem" }
                    }}
                      onClick={() => handleUserDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
      </TableContainer>

    </>

  ) : "No Other Users are Available ! "
}
