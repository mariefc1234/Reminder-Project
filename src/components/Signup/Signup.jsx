/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable consistent-return */
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import PasswordChecklist from 'react-password-checklist';
import {
 Button, Card, CardContent, Grid, TextField, Typography, Link, InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GeneralMenu from '../Utilities/Menu/GeneralMenu';
import { useForm } from '../../hooks/useForm';
import { context } from '../../context/authContext';

export function Signup() {
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(true);
  const authContext = useContext(context);

  const initialForm = {
    username: '',
    email: '',
    password: '',
    confPassword: '',
  };

  const [formValues, handleInputChange] = useForm(initialForm);
  const {
    username, email, password, confPassword,
  } = formValues;

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    const resJSON = await res.json();
    console.log(resJSON);
    const isRegistered = resJSON.data.registered;
    if (!resJSON.ok) {
      return Swal.fire({
        title: 'Error',
        text: 'Internal server error :c',
        icon: 'error',
      });
    }

    if (isRegistered) {
      authContext.setLogged(true);
      authContext.setToken(resJSON.data.token);
    } else {
      return Swal.fire({
        title: 'Error',
        text: 'Email already registered',
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
              Create Account
            </Typography>
            <form onSubmit={handleRegister}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="username">Username*</InputLabel>
                  <TextField fullWidth id="username" type="text" placeholder="Enter your username" variant="outlined" name="username" onChange={handleInputChange} required />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="email">Email address*</InputLabel>
                  <TextField type="email" placeholder="Enter your email" variant="outlined" id="email" name="email" onChange={handleInputChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="password">Password*</InputLabel>
                  <TextField type="password" fullWidth placeholder="Password" variant="outlined" id="password" name="password" onChange={handleInputChange} required />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="confPassword">Confirm Password*</InputLabel>
                  <TextField type="password" fullWidth placeholder="Confirm Password" variant="outlined" id="confPassword" name="confPassword" onChange={handleInputChange} required />
                </Grid>
                <Grid item xs={12} md={6} style={{ fontFamily: '"Poppins", sans-serif', fontSize: '14px' }}>
                  <PasswordChecklist
                    rules={['minLength', 'lowercase', 'specialChar']}
                    minLength={8}
                    value={password}
                    valueAgain={confPassword}
                    onChange={(isValid) => {
                      if (isValid) {
                        setDisableBtn(false);
                      } else {
                        setDisableBtn(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ fontFamily: '"Poppins", sans-serif', fontSize: '14px' }}>
                  <PasswordChecklist
                    rules={['number', 'capital', 'match']}
                    minLength={8}
                    value={password}
                    valueAgain={confPassword}
                    onChange={(isValid) => {
                      if (isValid) {
                        setDisableBtn(false);
                      } else {
                        setDisableBtn(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} mt={2} mb={1}>
                  <Button type="submit" color="primary" variant="defaultButton" disabled={disableBtn} fullWidth>Sign Up</Button>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                  <Typography variant="body1" gutterBottom>
                    Already have an account?
                    {' '}
                    <Link component="button" underline="hover" variant="body1" onClick={() => navigate('/signin')}> Sign in </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
