/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import PasswordChecklist from 'react-password-checklist';
import {
  Button, Card, CardContent, Grid, TextField, Typography, Link,
  InputLabel, FormControl, OutlinedInput, InputAdornment, IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import GeneralMenu from '../Utilities/Menu/GeneralMenu';
import { useForm } from '../../hooks/useForm';
import { context } from '../../context/authContext';
import AnnouncementDialog from '../Utilities/Dialogs/AnnouncementDialog';
import CustomAlert from '../Utilities/Dialogs/CustomAlert';

export function Signup() {
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(true);
  const authContext = useContext(context);
  const [usernameError, setUsernameError] = useState(false);
  const [announcementDialog, setAnnouncementDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const [alert, setAlert] = useState({ isOpen: false, message: '', severity: 'warning' });
  const [passwordShown, setPasswordShown] = useState(false);

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
    if (username.indexOf(' ') >= 0) {
      setUsernameError(true);
      setAlert({
        isOpen: true,
        message: 'Username should not contain spaces',
        severity: 'error',
      });
    } else if (password !== confPassword) {
      setAlert({
        isOpen: true,
        message: "Passwords doesn't match",
        severity: 'error',
      });
    } else {
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
      const isRegistered = resJSON.data.registered;
      if (!resJSON.ok) {
        setAnnouncementDialog({
          isOpen: true,
          title: 'Internal server error',
          onConfirm: () => {
            setAnnouncementDialog({
            ...announcementDialog,
                      isOpen: false,
            });
          },
        });
      }

      if (isRegistered) {
        await fetch('http://localhost:8080/api/email/sendConfirmation', {
          method: 'POST',
          headers: { 'Content-type': 'application/json; charset=UTF-8', authtoken: resJSON.data.token },
        });

        authContext.setLogged(true);
        authContext.setToken(resJSON.data.token);
      } else {
        setAnnouncementDialog({
          isOpen: true,
          title: 'Email already registered',
          onConfirm: () => {
            setAnnouncementDialog({
            ...announcementDialog,
                      isOpen: false,
            });
          },
        });
      }
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
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
                  <TextField fullWidth id="username" type="text" placeholder="Enter your username" variant="outlined" name="username" error={usernameError} onChange={handleInputChange} required />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="email">Email address*</InputLabel>
                  <TextField type="email" placeholder="Enter your email" variant="outlined" id="email" name="email" onChange={handleInputChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="password">Password*</InputLabel>
                  <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                      id="password"
                      type={passwordShown ? 'text' : 'password'}
                      name="password"
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your password"
                      endAdornment={(
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePassword}
                            edge="end"
                          >
                            {passwordShown ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                    )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="confPassword">Confirm Password*</InputLabel>
                  <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                      id="confPassword"
                      type={passwordShown ? 'text' : 'password'}
                      name="confPassword"
                      onChange={handleInputChange}
                      required
                      placeholder="Confirm your password"
                      endAdornment={(
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePassword}
                            edge="end"
                          >
                            {passwordShown ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                    )}
                    />
                  </FormControl>
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
      <AnnouncementDialog
        announcementDialog={announcementDialog}
        setAnnouncementDialog={setAnnouncementDialog}
      />
      <CustomAlert alert={alert} setAlert={setAlert} />
    </div>
  );
}
