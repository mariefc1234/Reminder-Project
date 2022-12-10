/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button, Card, CardContent, Grid, IconButton, InputLabel, Link, Snackbar, TextField, Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { context } from '../../context/authContext';
import { useForm } from '../../hooks/useForm';
import GeneralMenu from '../Utilities/Menu/GeneralMenu';
import Popup from '../Utilities/Popup';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';

export function Signin() {
  const navigate = useNavigate();
  const authContext = useContext(context);
  const [openPopup, setOpenPopup] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const initialForm = {
      email: '',
      password: '',
  };
  const [formValues, handleInputChange] = useForm(initialForm);
  const {
    email, password,
  } = formValues;
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
      email,
      password,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    const resJSON = await res.json();

    const isLogged = resJSON.data.logged;

    if (isLogged) {
      await authContext.setToken(resJSON.data.token);
      await authContext.setLogged(true);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Incorrect Credentials',
        icon: 'error',
      });
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const isEmailSent = (emailSent) => {
    if (emailSent) {
      setOpenAlert(true);
    }
  };

  return (
    <div>
      <GeneralMenu />
      <Grid>
        <Card style={{ maxWidth: 650, padding: '20px 5px', margin: '0 auto' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" align="center" sx={{ fontWeight: '500' }}>
              Welcome!
            </Typography>
            <form onSubmit={handleLogin}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="email">Email address*</InputLabel>
                  <TextField fullWidth id="email" type="email" placeholder="Enter your email" variant="outlined" name="email" onChange={handleInputChange} required />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="password">Password*</InputLabel>
                  <TextField fullWidth id="password" type="password" placeholder="Enter your password" variant="outlined" name="password" onChange={handleInputChange} required />
                  <Link underline="hover" variant="body2" onClick={() => setOpenPopup(true)} sx={{ color: 'text.secondary', cursor: 'pointer' }}>
                    Forgot Password?
                  </Link>
                </Grid>
                <Grid item xs={12} mt={2} mb={1}>
                  <Button fullWidth type="submit" variant="defaultButton">Sign In</Button>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                  <Typography variant="body1" gutterBottom>
                    Not a member?
                    {' '}
                    <Link underline="hover" variant="body1" onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}> Sign up now </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Popup
        title="Forgot password?"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ForgotPassword isEmailSent={isEmailSent} />
      </Popup>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert
          action={(
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
          sx={{ mb: 2 }}
        >
          Email Sent
        </Alert>
      </Snackbar>
    </div>
  );
}
