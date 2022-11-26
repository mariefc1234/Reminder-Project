/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import {
  Button, Grid, InputLabel, TextField,
} from '@mui/material';
import { React, useState } from 'react';
import { useForm } from '../../hooks/useForm';

export function ForgotPassword(props) {
  const [emailError, setEmailError] = useState(false);
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
    console.log(resJSON);
    const isSent = resJSON.ok;

    if (isSent) {
      props.isEmailSent(true);
    } else {
      props.isEmailSent(false);
    }
    }
  };

  return (
    <form>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputLabel htmlFor="email">Email address*</InputLabel>
          <TextField fullWidth id="email" type="email" placeholder="Enter your email" variant="outlined" name="email" onChange={handleInputChange} error={emailError} required />
        </Grid>
        <Grid item xs={12} mt={2}>
          <Button fullWidth type="submit" onClick={handleClick}>Reset password</Button>
        </Grid>
      </Grid>
    </form>
  );
}
