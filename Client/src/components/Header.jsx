import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState } from 'react';

const drawerWidth = 240;
const navItems = [
  {
    text: 'Home',
    url: '/',
  },
  {
    text: 'About',
    url: '/about',
  },
  {
    text: 'Projects',
    url: '/projects',
  },
]

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [theme, setTheme] = useState("dark");
  const location = useLocation().pathname;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sohan's Blog
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link to={item.url} key={item.url}>
            <ListItem disablePadding sx={{ backgroundColor: `${location === item.url ? `#006064` : null}`, color: `${location === item.url ? `white` : null}` }}>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>

        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleThemeChange = () => {
    setTheme((prev) => (prev === 'light') ? 'dark' : 'light');

    document.querySelector('html').classList.toggle('dark');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#006064' }} position='sticky'>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { sm: 'block' } }}
          >
            <Link>
              Sohan's Blog
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block', marginRight: '1rem' } }}>
            {navItems.map((item) => (
              <Link to={item.url} key={item.url}>
                <Button sx={{ color: '#fff' }}>
                  {item.text}
                </Button>
              </Link>
            ))}
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/signin'>
            <Button variant='contained' size='small' sx={{
              color: 'white',
              backgroundColor: '#f50057'
            }} className='hover:bg-rose-600 md:text-[1rem]'>Sign In</Button>
          </Link>
          <IconButton
            color='inherit'
            onClick={handleThemeChange}
            aria-label='theme-btn'
            sx={{ mr: 2, ml: 2 }}
          >
            {(theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />)}
          </IconButton>
        </Toolbar>

      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;