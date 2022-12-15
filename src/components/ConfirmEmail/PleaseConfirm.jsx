import {
  Box, Button, Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../Utilities/Menu/UserMenu';
import confirmImg from '../../img/confirmMail.png';
import { context } from '../../context/authContext';
import { useFetchGet } from '../../hooks/useFetchGet';
import CustomAlert from '../Utilities/Dialogs/CustomAlert';

export default function PleaseConfirm() {
  const authContext = useContext(context);
  const navigate = useNavigate();
  const { data } = useFetchGet('https://reminder.herokuapp.com/api/user', authContext.token);
  const [alert, setAlert] = useState({ isOpen: false, message: '', severity: 'warning' });

  const sendMail = async (e) => {
    e.preventDefault();
    const resMail = await fetch('https://reminder.herokuapp.com/api/email/sendConfirmation', {
          method: 'POST',
          headers: { 'Content-type': 'application/json; charset=UTF-8', authtoken: authContext.token },
    });

    if (resMail.ok) {
      setAlert({
        isOpen: true,
        message: 'Email sent successfully',
        severity: 'success',
      });
    } else {
      setAlert({
        isOpen: true,
        message: 'Internal Server Error',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    if (data) {
      if (data.data.emailconfirmed === 1) {
        navigate('/main');
      }
    }
  }, [data]);

  return (
    <div>
      <UserMenu />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h5" mt={5} textAlign="center">We sent you a mail, </Typography>
        <Typography variant="h5" textAlign="center">Please confirm your mail</Typography>
        <img src={confirmImg} alt="Yellow and funny face" style={{ height: '30vh', width: '40vh' }} />

        <Button variant="defaultButton" onClick={sendMail}>Send email again</Button>
      </Box>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </div>
  );
}
