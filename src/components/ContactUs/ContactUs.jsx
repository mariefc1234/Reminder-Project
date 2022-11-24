import {
  Button, Card, CardContent, Grid, TextField, Typography,
} from '@mui/material';
import { useState, React } from 'react';
import GeneralMenu from '../Utilities/Menu/GeneralMenu';
import Popup from '../Utilities/Popup';
import { useForm } from '../../hooks/useForm';

export function ContactUs() {
  const [openPopup, setOpenPopup] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const initialForm = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  };
  const [formValues, handleInputChange] = useForm(initialForm);
  const {
    firstName,
    lastName,
    email,
    message,
  } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstName === '') {
      setFirstNameError(true);
    }
    if (lastName === '') {
      setLastNameError(true);
    }
    if (email === '') {
      setEmailError(true);
    }
    if (message === '') {
      setMessageError(true);
    }
    if (firstName && lastName && email && message) {
      setOpenPopup(true);
    }
  };

  return (
    <div>
      <GeneralMenu />
      <Grid>
        <Card style={{ maxWidth: 450, padding: '20px 5px', margin: '0 auto' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" align="center" sx={{ fontWeight: '500' }}>
              Contact Us
            </Typography>
            <Typography gutterBottom variant="body2" color="textSecondary" component="p">
              Fill up the form and our team will get back to you within 24 hours.
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField placeholder="Enter first name" label="First Name" name="firstName" onChange={handleInputChange} error={firstNameError} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField placeholder="Enter last name" label="Last Name" name="lastName" onChange={handleInputChange} error={lastNameError} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="email" placeholder="Enter email" label="Email" name="email" onChange={handleInputChange} error={emailError} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Message" multiline rows={4} placeholder="Type your message here" name="message" onChange={handleInputChange} error={messageError} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" onClick={handleSubmit} fullWidth>Submit</Button>
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
        <Typography component="p" variant="body1">Thanks for contact us...</Typography>
      </Popup>
    </div>
  );
}
