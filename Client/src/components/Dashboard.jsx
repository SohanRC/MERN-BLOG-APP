import React, { useState, useEffect, useId } from 'react'
import { useSearchParams, useLocation, Navigate } from "react-router-dom"
import DashSidebar from './DashSidebar';
import DashProfile from './DashProfile';
import Admin from './Admin';
import { useSelector } from 'react-redux';
import DashComments from './DashComments';
import DashUsers from './DashUsers';
import DashPosts from './DashPosts';

export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const urlTab = urlParams.get('tab');
        setTab(urlTab);
    }, [location.search])

    const user = useSelector((state) => state.user.userData)

    const dashDisplay = [
        {
            id : 1,
            tab: "dashboard",
            component: <Admin />,
            authStatus: user.isAdmin,
        },
        {
            id : 2,
            tab: "profile",
            component: <DashProfile />,
            authStatus: null,
        },
        {
            id: 3,
            tab: "comments",
            component: <DashComments />,
            authStatus: user.isAdmin,
        },
        {
            id : 4,
            tab: "users",
            component: <DashUsers />,
            authStatus: user.isAdmin,
        },
        {
            id : 5,
            tab: "posts",
            component: <DashPosts />,
            authStatus: user.isAdmin,
        },
    ]


    return (
        <div className='flex md:flex-row flex-col'>
            <div className=' bg-slate-200 md:w-68 dark:bg-[rgb(31,41,55)]'>
                {/* SideBar */}
                <DashSidebar tab={tab} />
            </div>
            <div className='flex justify-center items-center border-2 border-teal-500 w-full'>
                {/* Render Part */}
                {
                    dashDisplay.map((item) =>
                        (item.authStatus || item.authStatus === null) && item.tab === tab ?
                            (
                                <div key={item.id} className='h-full w-full grid place-items-center'>
                                    {item.component}
                                </div>
                            ) : null)
                }
            </div>
        </div>
    )
}
