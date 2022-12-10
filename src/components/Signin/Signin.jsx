/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Card, CardContent, FormControl, Grid, IconButton, InputAdornment,
  InputLabel, Link, OutlinedInput, TextField, Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { context } from '../../context/authContext';
import { useForm } from '../../hooks/useForm';
import GeneralMenu from '../Utilities/Menu/GeneralMenu';
import Popup from '../Utilities/Dialogs/Popup';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';
import CustomAlert from '../Utilities/Dialogs/CustomAlert';
import AnnouncementDialog from '../Utilities/Dialogs/AnnouncementDialog';

export function Signin() {
  const navigate = useNavigate();
  const authContext = useContext(context);
  const [openPopup, setOpenPopup] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, message: '', severity: 'error' });
  const [announcementDialog, setAnnouncementDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const [passwordShown, setPasswordShown] = useState(false);

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
      setAnnouncementDialog({
        isOpen: true,
        title: 'Incorrect credentials',
        onConfirm: () => {
          setAnnouncementDialog({
          ...announcementDialog,
                    isOpen: false,
          });
        },
      });
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const isEmailSent = (status, text, severity) => {
    if (status) {
      setAlert({
        isOpen: true,
        message: text,
        severity,
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
            <form onSubmit={handleLogin}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="email">Email address*</InputLabel>
                  <TextField fullWidth id="email" type="email" placeholder="Enter your email" variant="outlined" name="email" onChange={handleInputChange} required />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="password">Password*</InputLabel>
                  <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                      id="password"
                      type={passwordShown ? 'text' : 'password'}
                      name="password"
                      placeholder="Enter your password"
                      onChange={handleInputChange}
                      required
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
                  <Grid item xs={12}>
                    <Link underline="hover" variant="body2" onClick={() => setOpenPopup(true)} sx={{ color: 'text.secondary', cursor: 'pointer' }}>
                      Forgot Password?
                    </Link>
                  </Grid>
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
      <CustomAlert alert={alert} setAlert={setAlert} />
      <AnnouncementDialog
        announcementDialog={announcementDialog}
        setAnnouncementDialog={setAnnouncementDialog}
      />
    </div>
  );
}
