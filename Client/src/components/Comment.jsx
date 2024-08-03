import React, { useEffect, useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import userService from '../api/UserService';
import moment from 'moment'
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button } from '@mui/material';

export default function Comment({ comment, handleLike, handleDeleteComment, handleEdit}) {

    const [commentUser, setCommentUser] = useState({});
    const currentUser = useSelector((state) => state.user.userData);
    const liked = comment.likes.includes(currentUser?._id);
    const [showEdit, setShowEdit] = useState(false)
    const [commentBox, setCommentBox] = useState(comment.content);




    useEffect(() => {
        const getUser = async (userId) => {
            try {
                const response = await userService.getParticularUser(userId)

                if (!response.data) {
                    console.log(response)
                    return;
                }

                const { data: { user } } = response;
                setCommentUser(user);
                return;
            } catch (error) {
                console.log(error)
                return null;
            }
        }

        getUser(comment.userId);

    }, [])



    return (
        <li className='w-full flex justify-start items-center gap-2 border-b-2 border-slate-500 p-2 mb-2 flex-wrap'>
            <div>
                <LazyLoadImage src={commentUser?.profilePic} alt="Profile Pic" className=' h-9 w-9 rounded-full object-cover' placeholderSrc='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' />
            </div>
            <div className='flex flex-col gap-2 justify-start items-start'>
                <div>
                    <p className='text-sm mb-1'>{commentUser?.username}<span className='ml-2'>{moment(comment?.createdAt).fromNow()}</span></p>
                    {
                        !showEdit && <p className='border-b-[1px] border-slate-500 p-1'>{comment?.content}</p>
                    }
                </div>
                <div className='flex gap-2 items-center flex-wrap'>

                    {
                        !showEdit ?
                            <>
                                <ThumbUpIcon
                                    className={`text-lg ${liked ? `text-blue-400` : `white`} hover:text-blue-400 hover:scale-[1.1] transition-transform mr-1
                                    cursor-pointer`}
                                    onClick={() => {
                                        handleLike(comment._id)
                                    }}
                                />
                                <span>{comment.numberOfLikes} Likes</span>
                                {
                                    (currentUser?.isAdmin || currentUser?._id === comment?.userId) ?
                                        <>
                                            <Button size='small'
                                                className='dark:text-white'
                                                onClick={() => setShowEdit(true)}
                                            >Edit</Button>
                                            <Button size='small' className='dark:text-white' onClick={() => handleDeleteComment(comment?._id)} >Delete</Button>

                                        </> : null
                                }
                            </>
                            :
                            <>
                                <form action="" >
                                    <textarea name="comment-box" id="comment-box"
                                        className='w-full h-24 bg-slate-200 p-2 text-slate-700 outline-none m-2 border-none rounded-md shadow-md shadow-slate-600'
                                        value={commentBox}
                                        onChange={(e) => (e.target.value.length <= 200) ? setCommentBox(e.target.value) : null}
                                    ></textarea>
                                    <Button
                                        type='button'
                                        onClick={() => {
                                            handleEdit(comment?._id, commentBox);
                                            setShowEdit(false);
                                        }}
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        type='button'
                                        onClick={() => {
                                            setCommentBox(comment?.content)
                                            setShowEdit(false)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </form>
                            </>
                    }

                </div>
            </div>
        </li>
    )
}
