/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Button,
 Card, CardContent, Grid, TextField, Typography,
} from '@mui/material';
import React from 'react';
import GeneralMenu from '../Utilities/Menu/GeneralMenu';

export function ContactUs() {
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
                  <TextField placeholder="Enter first name" label="First Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField placeholder="Enter last name" label="Last Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Message" multiline rows={4} placeholder="Type your message here" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" fullWidth>Submit</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
