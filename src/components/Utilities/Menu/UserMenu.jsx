import * as React from 'react';
import { useContext } from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, MenuItem, Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import iconImg from '../../../img/logo.png';
import { context } from '../../../context/authContext';

function UserMenu() {
  const authContext = useContext(context);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    authContext.setToken(false);
    authContext.setLogged(false);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}><img src={iconImg} alt="Logo" width="45" /></Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/main"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: '#45424b',
              textDecoration: 'none',
            }}
          >
            Reminder for your life
          </Typography>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}><img src={iconImg} alt="Logo" width="35" /></Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/main"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: '#45424b',
              textDecoration: 'none',
            }}
          >
            Reminder
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => navigate('/main')}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate('/changeuserinfo')}>
                <Typography textAlign="center">User info</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate('/changepassword')}>
                <Typography textAlign="center">Change Password</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default UserMenu;
