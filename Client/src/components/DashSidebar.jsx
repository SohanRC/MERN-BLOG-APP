import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../store/UserSlice"

export default function DashSidebar({ tab }) {
    const user = useSelector((state) => state.user.userData)
    const dispatch = useDispatch();


    const handleSignout = () => {
        dispatch(logout());
    }

    const sidebarMenu = [
        {
            Icon: <DashboardIcon className='text-slate-500' />,
            text: "Dashboard",
            url: "/dashboard?tab=dashboard",
            tab: "dashboard",
            authStatus: user.isAdmin,
        },
        {
            Icon: <AccountCircleIcon className='text-slate-500' />,
            text: "Profile",
            url: "/dashboard?tab=profile",
            tab: "profile",
            authStatus: null,
        },
        {
            Icon: <ChatRoundedIcon className='text-slate-500' />,
            text: "Comments",
            url: "/dashboard?tab=comments",
            tab: "comments",
            authStatus: user.isAdmin,
        },
        {
            Icon: <PeopleOutlineRoundedIcon className='text-slate-500' />,
            text: "Users",
            url: "/dashboard?tab=users",
            tab: "users",
            authStatus: user.isAdmin,
        },
        {
            Icon: <PostAddRoundedIcon className='text-slate-500' />,
            text: "Posts",
            url: "/dashboard?tab=posts",
            tab: "posts",
            authStatus: user.isAdmin,
        },
    ]

    return (
        <div className='w-screen md:min-h-screen md:w-64 flex flex-col gap-5 p-10'>
            {
                sidebarMenu.map((item) => item.authStatus || item.authStatus === null ?
                    (
                        <div className={`text-center ${tab === item.tab ? 'bg-slate-300 text-black' : null} text-xl font-montserrat p-2 rounded-md`} key={item.url}>
                            <Link to={item.url} className='flex gap-2 items-center'>
                                <IconButton>
                                    {item.Icon}
                                </IconButton>
                                <span>
                                    {item.text}
                                </span>
                            </Link>
                        </div>
                    ) : null)
            }
            {
                user?.isAdmin && <div className={`text-center cursor-pointer text-xl font-montserrat p-2 rounded-md flex gap-2 items-center`} key="create"
                >
                    <Link to='/create-post'>
                        <IconButton>
                            <BorderColorRoundedIcon className='text-slate-500' />
                        </IconButton>
                        <span>
                            Create Post
                        </span>
                    </Link>
                </div>
            }

            <div className={`text-center cursor-pointer text-xl font-montserrat p-2 rounded-md flex gap-2 items-center`}
                onClick={handleSignout}
                key="signout"
            >
                <IconButton>
                    <ExitToAppIcon className='text-slate-500' />
                </IconButton>
                <span>
                    Signout
                </span>
            </div>
        </div>
    )
}
