import {
  Button, Card, CardContent, Grid, TextField, Typography,
} from '@mui/material';
import { useState, React } from 'react';
import GeneralMenu from '../Utilities/Menu/GeneralMenu';
import { useForm } from '../../hooks/useForm';
import AnnouncementDialog from '../Utilities/Dialogs/AnnouncementDialog';

export function ContactUs() {
  const [announcementDialog, setAnnouncementDialog] = useState({ isOpen: false, title: '', subTitle: '' });

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
    const res = await fetch('https://reminder.herokuapp.com/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          message,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      const resJSON = await res.json();
      const isRegistered = resJSON.ok;
      if (isRegistered) {
        setAnnouncementDialog({
          isOpen: true,
          title: 'Thanks for contac us',
          onConfirm: () => { window.location.href = '/'; },
        });
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
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField placeholder="Enter first name" label="First Name" name="firstName" onChange={handleInputChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField placeholder="Enter last name" label="Last Name" name="lastName" onChange={handleInputChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="email" placeholder="Enter email" label="Email" name="email" onChange={handleInputChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Message" multiline rows={4} placeholder="Type your message here" name="message" onChange={handleInputChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="defaultButton" fullWidth>Submit</Button>
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
    </div>
  );
}
