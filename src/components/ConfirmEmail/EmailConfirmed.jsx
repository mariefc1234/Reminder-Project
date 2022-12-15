/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../Utilities/Menu/UserMenu';
import emailConfirmedImg from '../../img/emailConf.jpg';

export function EmailConfirmed() {
  const queryParameters = new URLSearchParams(window.location.search);
  const pin = queryParameters.get('pin');
  const navigate = useNavigate();

  const confirmMail = async () => {
    await fetch(`http://localhost:8080/api/email/confirmMail/${pin}`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
  };

  useEffect(() => {
    confirmMail();
  }, []);

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
        <Typography variant="h4" style={{ fontSize: '2rem' }}>Thanks for confirm your mail !</Typography>
        <Button type="submit" onClick={() => navigate('/main')} variant="defaultButton">Continue</Button>
      </Box>
    </div>
  );
}
