import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from "react-redux"
import {logout} from "../store/UserSlice"

export default function DashSidebar({ tab }) {
    const user = useSelector((state) => state.user.userData)
    const dispatch = useDispatch();

    
    const handleSignout = () => {
        dispatch(logout());
    }
    return (
        <div className='w-screen md:min-h-screen bg-slate-200 md:w-56 dark:bg-[rgb(31,41,55)] flex flex-col gap-5 p-10'>
            <div className={`text-center ${tab === 'profile' ? 'bg-slate-300 text-black' : null} text-xl font-montserrat p-2 rounded-md`}>
                <Link to='/dashboard?tab=profile' className='flex gap-2 items-center'>
                    <IconButton>
                        <AccountCircleIcon className='text-slate-500' />
                    </IconButton>
                    <span>
                        Profile
                    </span>
                </Link>
            </div>
            {
                user?.isAdmin && <div className={`text-center ${tab === 'admin' ? 'bg-slate-300 text-black' : null} text-xl font-montserrat p-2 rounded-md`}>
                    <Link to='/dashboard?tab=admin' className='flex gap-2 items-center'>
                        <IconButton>
                            <DashboardIcon className='text-slate-500' />
                        </IconButton>
                        <span>
                            Admin
                        </span>
                    </Link>
                </div>
            }

            <div className={`text-center cursor-pointer text-xl font-montserrat p-2 rounded-md flex gap-2 items-center`}
                onClick={handleSignout}
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
