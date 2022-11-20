/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Button,
  Card, CardContent, Grid, InputLabel, TextField, Typography,
} from '@mui/material';
import Swal from 'sweetalert2';
import React, { useContext } from 'react';
import { context } from '../../context/authContext';
import { useForm } from '../../hooks/useForm';
import GeneralMenu from '../Utilities/Menu/GeneralMenu';

export function ForgotPassword() {
  const authContext = useContext(context);

  const initialForm = {
    email: '',
  };
  // eslint-disable-next-line no-unused-vars
  const [formValues, handleInputChange, Reset] = useForm(initialForm);
  const {
    email,
  } = formValues;

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/email/sendPasswordConfirmation', {
      method: 'POST',
      body: JSON.stringify({
      email,
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
              Forgot your password?
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="email">Email address*</InputLabel>
                  <TextField fullWidth id="email" type="email" placeholder="Enter your email" variant="outlined" name="email" onChange={handleInputChange} required />
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Button fullWidth type="submit" onClick={handleClick}>Reset password</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
