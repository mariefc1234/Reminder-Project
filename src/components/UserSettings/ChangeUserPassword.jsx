import {
  Button, Card, CardContent, Grid, InputLabel, TextField, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import UserMenu from '../Utilities/Menu/UserMenu';
import { useForm } from '../../hooks/useForm';
import CustomAlert from '../Utilities/Dialogs/CustomAlert';

export default function ChangeUserPassword() {
  const [emailError, setEmailError] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, message: '', severity: 'error' });

  const initialForm = {
    email: '',
  };
  const [formValues, handleInputChange] = useForm(initialForm);
  const {
    email,
  } = formValues;

  const handleClick = async (e) => {
    e.preventDefault();
    if (email === '') {
      setEmailError(true);
    } else {
      const res = await fetch('http://localhost:8080/api/email/sendPasswordConfirmation', {
        method: 'POST',
        body: JSON.stringify({
        email,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      const resJSON = await res.json();
      const isSent = resJSON.ok;

      if (isSent) {
        setAlert({
          isOpen: true,
          message: 'Email sent successfully',
          severity: 'success',
        });
      } else {
        setAlert({
          isOpen: true,
          message: 'Email not sent successfully',
          severity: 'error',
        });
      }
    }
  };

  return (
    <div>
      <UserMenu />
      <Grid>
        <Card style={{ maxWidth: 650, padding: '20px 5px', margin: '0 auto' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" align="center" sx={{ fontWeight: '500' }}>
              Change Password
            </Typography>
            <form onSubmit={handleClick}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="email">Email address*</InputLabel>
                  <TextField fullWidth id="email" type="email" placeholder="Enter your email" variant="outlined" name="email" onChange={handleInputChange} error={emailError} required />
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Button fullWidth type="submit" variant="defaultButton">Reset password</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </div>
  );
}
