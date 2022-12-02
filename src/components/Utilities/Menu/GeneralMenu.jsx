import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import iconImg from '../../../img/logo.png';

const pagesG = [
  { id: 1, title: 'Healthy Tips', ref: '/healthytips' },
  { id: 2, title: 'About Us', ref: '/aboutus' },
  { id: 3, title: 'Contact Us', ref: '/contactus' },
  { id: 4, title: 'Sign In', ref: '/signin' },
];

const pages = [
  { id: 5, title: 'Healthy Tips', ref: '/healthytips' },
  { id: 6, title: 'About Us', ref: '/aboutus' },
  { id: 7, title: 'Contact Us', ref: '/contactus' },
];

function GeneralMenu() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={() => navigate('/')}><img src={iconImg} alt="Logo" width="45" /></Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} onClick={() => navigate('/')}><img src={iconImg} alt="Logo" width="35" /></Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            onClick={() => navigate('/')}
            sx={{
            mr: 2, flexGrow: 1, fontWeight: 700, color: '#45424b', textDecoration: 'none',
            }}
          >
            Reminder
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                variant="menuButton"
                key={page.id}
                onClick={() => navigate(page.ref)}
                sx={{ my: 2, display: 'block' }}
                href=""
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pagesG.map((page) => (
                <MenuItem key={page.id} onClick={() => navigate(page.ref)}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={() => navigate('/signin')} variant="defaultButton">Sign In</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default GeneralMenu;
