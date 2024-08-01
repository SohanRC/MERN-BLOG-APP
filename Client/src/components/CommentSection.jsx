import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import toast from 'react-hot-toast';
import Loader from './Loader';
import commentService from '../api/CommentService';
import userService from "../api/UserService"
import Comment from './Comment';
import { useNavigate } from 'react-router-dom'



export default function CommentSection({ postId }) {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const currentUser = useSelector((state) => state.user.userData)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const [commentBox, setCommentBox] = useState("");
    const navigate = useNavigate();

    const handleDeleteComment = async (commentId) => {
        try {
            let res = await commentService.deleteComment(commentId);

            if (!res.data) {
                console.log(res)
                const { data: { message } } = res.response;
                toast.error(message);
                return;
            }

            setComments((prevComments) => prevComments.filter(e => e._id !== commentId));
            return;
        } catch (error) {
            console.log(error)
            const { data: { message } } = error.response;
            toast.error(message);
            return;
        }
    }

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                toast.error('Sign in to comment !');
                navigate('/signin');
                return;
            }

            let res = await commentService.likeComment(commentId);
            if (!res.data) {
                const { data: { message } } = res.response;
                toast.error(message);
                return;
            }

            const { data: { updatedComment } } = res;
            setComments((prevComments) => prevComments.map((e) => (e._id == commentId) ? updatedComment : e));
            return;

        } catch (error) {
            console.log(error)
            const { data: { message } } = error.response;
            toast.error(message);
            return;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentBox) {
            toast.success('Enter something to post a comment !');
            return;
        }

        try {
            let result = await commentService.createComment({
                content: commentBox,
                userId: currentUser._id,
                postId,
            })

            if (!result.data) {
                console.log("Error in creating comment : ", result)
                const { data: { message } } = result.response;
                toast.error(message);
                return;
            }

            const { data: { comment, message } } = result
            toast.success(message);
            setCommentBox('');
            setComments((prev) => [comment, ...prev]);
            return;
        } catch (error) {
            console.log(error)
            const { data: { message } } = error.response;
            toast.error(message)
            return;
        }
    }

    const handleEdit = async (commentId, content) => {
        try {
            if (!currentUser) {
                toast.error('Sign in to Edit comment !');
                navigate('/signin');
                return;
            }

            let res = await commentService.editComment(commentId, content);
            if (!res.data) {
                const { response: { data: { message } } } = res;
                toast.error(message);
                console.log(res);
                return;
            }

            const { data: { updatedComment } } = res;

            setComments((prevComments) => prevComments.map((e) => (e._id == commentId) ? updatedComment : e));
            toast.success('Comment Updated !');
            return;
        } catch (error) {
            const { response: { data: { message } } } = error;
            toast.error(message);
            console.log(error);
            return;
        }
    }

    useEffect(() => {

        const getAllComments = async () => {
            try {
                setLoading(true)
                let res = await commentService.getComments(postId);
                setLoading(false)
                if (!res.data) {
                    const { data: { message } } = res.response;
                    toast.error(message)
                    console.log("Error ! :", res);
                    return;
                }

                const { data: { allComments, message } } = res;
                setComments(allComments);
                return;
            } catch (error) {
                console.log(error)
                console.log("Error! Could not fetch initial comments !", error);
                return;
            }
        }

        getAllComments();
    }, [setComments])


    return (
        <>
            {
                loading ? <div className='grid place-items-center min-h-screen w-full '>
                    <Loader />
                </div> : <><div className='comment-box border-2 border-teal-500 flex justify-center flex-col items-center w-4/6 mx-auto p-5 rounded-lg'>
                    <div className='w-full mx-auto'>
                        <p>Signed In as : {isAuthenticated ? <><span><img src={currentUser?.profilePic} alt="Profile Picture" className='h-8 w-8 rounded-full inline mr-2' /></span><span>{currentUser?.username}</span></> : "Signin To Comment"}
                        </p>
                    </div>
                    <form action="" className='w-full' onSubmit={handleSubmit}>
                        <textarea name="comment-box" id="comment-box"
                            className='w-full h-24 bg-slate-200 p-2 text-slate-700 outline-none m-2 border-none rounded-md shadow-md shadow-slate-600'
                            placeholder='Add Comment !'
                            value={commentBox}
                            onChange={(e) => (e.target.value.length <= 200) ? setCommentBox(e.target.value) : null}
                            disabled={!isAuthenticated}
                        >

                        </textarea>
                        <div className=' w-full flex justify-between items-center p-2'>
                            <p className='text-sm'>{200 - commentBox.length} chars remaining</p>
                            <Button variant='contained'
                                type='submit'
                                disabled={!isAuthenticated}
                            >Submit
                            </Button>
                        </div>
                    </form>


                </div>
                    <div className='comment-section border-2 border-teal-500 flex justify-center flex-col items-center w-4/6 mx-auto p-5 rounded-lg mt-5'>
                        <div className='w-full'>
                            <p>Comments <span className='border-2 border-teal-500 p-1 rounded-md ml-2'>{comments.length}</span></p>
                        </div>
                        <ul className='w-full mt-3 p-5'>
                            {
                                comments.map((comment) => <Comment key={comment._id} comment={comment} handleLike={handleLike} handleDeleteComment={handleDeleteComment}
                                    handleEdit={handleEdit}
                                />)
                            }
                        </ul>
                    </div>
                </>
            }
        </>

    )
}
