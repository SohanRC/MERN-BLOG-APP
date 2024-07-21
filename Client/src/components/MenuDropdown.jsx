import React from 'react'
import { Menu, MenuItem, Button } from "@mui/material"
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/UserSlice';

export default function MenuDropdown() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignout = () => {
        handleClose();
        dispatch(logout());
    }

    const user = useSelector((state) => state.user.userData)

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
                <img src={user.profilePic} alt="Profile Picture" className='rounded-full h-10 w-10' />
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
                <MenuItem onClick={handleClose}>
                    <Link to='/dashboard?tab=profile'>
                        Profile
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleSignout}>
                    SignOut
                </MenuItem>
            </Menu>
        </div>
    );
}
