import React, { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from "react-router-dom"
import DashSidebar from './DashSidebar';
import DashProfile from './DashProfile';
import Admin from './Admin';

export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const urlTab = urlParams.get('tab');
        setTab(urlTab);
    }, [location.search])
    return (
        <div className='flex md:flex-row flex-col'>
            <div>
                {/* SideBar */}
                <DashSidebar tab={tab} />
            </div>
            <div>
                {/* Render Part */}
                {tab === 'profile' && <DashProfile />}
                {/* {tab === 'dashboard' && <Admin />} */}
            </div>
        </div>
    )
}
