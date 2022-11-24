/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {
  Button, Card, CardContent, Grid, InputLabel, Link, TextField, Typography,
 } from '@mui/material';
import { context } from '../../context/authContext';
import { useForm } from '../../hooks/useForm';
import GeneralMenu from '../Utilities/Menu/GeneralMenu';
import Popup from '../Utilities/Popup';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export function Signin() {
  const navigate = useNavigate();
  const authContext = useContext(context);
  const [openPopup, setOpenPopup] = useState(false);
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
      await authContext.setLogged(true);
      await authContext.setToken(resJSON.data.token);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Incorrect Credentials',
        icon: 'error',
      });
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
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="email">Email address*</InputLabel>
                  <TextField fullWidth id="email" type="email" placeholder="Enter your email" variant="outlined" name="email" onChange={handleInputChange} required />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="password">Password*</InputLabel>
                  <TextField fullWidth id="password" type="password" placeholder="Enter your password" variant="outlined" name="password" onChange={handleInputChange} required />
                  <Link component="button" underline="hover" variant="body2" onClick={() => navigate('/signup')} sx={{ color: 'text.secondary' }}>
                    Forgot Password?
                  </Link>
                </Grid>
                <Grid item xs={12} mt={2} mb={1}>
                  <Button fullWidth type="submit" onClick={handleLogin}>Sign In</Button>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                  <Typography variant="body1" gutterBottom>
                    Not a member?
                    {' '}
                    <Link component="button" underline="hover" variant="body1" onClick={() => navigate('/signup')}> Sign up now </Link>
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
        <ForgotPasswordForm />
      </Popup>
    </div>
  );
}
