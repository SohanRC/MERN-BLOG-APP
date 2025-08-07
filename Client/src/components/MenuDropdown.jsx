import React from 'react'
import { Menu, MenuItem, Button } from "@mui/material"
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';

export default function MenuDropdown() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignout = () => {
        handleClose();
        dispatch(logout());
        navigate('/signin');
    }

    const user = useSelector((state) => state.user?.userData)

    const menuItems = [
        {
            text: "Dashboard",
            url: "/dashboard?tab=dashboard",
            authStatus: user?.isAdmin,
        },
        {
            text: "Profile",
            url: "/dashboard?tab=profile",
            authStatus: null,
        },
        // {
        //     text: "Comments",
        //     url: "/dashboard?tab=comments",
        //     authStatus: user.isAuthenticated,
        // },
        // {
        //     text: "Users",
        //     url: "/dashboard?tab=users",
        //     authStatus: user.isAuthenticated,
        // },
        // {
        //     text: "Posts",
        //     url: "/dashboard?tab=posts",
        //     authStatus: user.isAuthenticated,
        // },
    ]

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: 'white' }}
            >
                <img src={user?.profilePic} alt="Profile Picture" className='rounded-full h-10 w-10' />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    menuItems.map((item) => item.authStatus || item.authStatus === null ? (
                        <MenuItem onClick={handleClose} key={item.url}>
                            <Link to={item.url}>
                                {item.text}
                            </Link>
                        </MenuItem>
                    ) : null)
                }
                <MenuItem onClick={handleSignout}>
                    SignOut
                </MenuItem>
            </Menu>
        </div>
    );
}
