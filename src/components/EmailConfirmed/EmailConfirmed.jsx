import React from 'react';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../Utilities/Menu/UserMenu';
import emailConfirmedImg from '../../img/emailConf.jpg';

export function EmailConfirmed() {
  const navigate = useNavigate();
  return (
    <div>
      <UserMenu />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <img src={emailConfirmedImg} alt="Yellow and funny face" style={{ height: '40vh', width: '40vh' }} />
        <Typography variant="h4" style={{ fontSize: '2rem' }}>Email Confirmed</Typography>
        <Button type="submit" onClick={() => navigate('/main')} variant="defaultButton">Continue</Button>
      </Box>
    </div>
  );
}
