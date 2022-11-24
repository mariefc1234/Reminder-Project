import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, MenuItem, Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import iconImg from '../../../img/logo.png';

const settings = [
  { id: 1, title: 'Profile', ref: '/healthytips' },
  { id: 2, title: 'Account', ref: '/aboutus' },
  { id: 3, title: 'Dashboard', ref: '/contactus' },
  { id: 4, title: 'Logout', ref: '/signin' },
];

function UserMenu() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={() => navigate(setting.ref)}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default UserMenu;
