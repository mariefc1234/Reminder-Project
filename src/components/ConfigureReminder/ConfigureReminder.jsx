/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card, CardContent, Grid, InputAdornment, InputLabel, TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import UserMenu from '../Utilities/Menu/UserMenu';
import reminderImg from '../../img/glass.jpeg';

export function ConfigureReminder() {
  const navigate = useNavigate();
  const [startHour, setStartHour] = React.useState(null);
  const [endHour, setEndHour] = React.useState(null);
  return (
    <div>
      <UserMenu />
      <Grid>
        <Card style={{ maxWidth: 650, padding: '20px 5px', margin: '0 auto' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" align="center" sx={{ fontWeight: '500' }}>
              Configure Reminder
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="title">Title*</InputLabel>
                  <TextField fullWidth id="title" type="text" placeholder="Enter the title" variant="outlined" name="title" size="small" required />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <InputLabel htmlFor="start-hour">Start hour*</InputLabel>
                    <TimePicker
                      id="start-hour"
                      value={startHour}
                      onChange={(newValue) => {
                        setStartHour(newValue);
                      }}
                      // renderInput={(params) => <TextField size="small" {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <InputLabel htmlFor="end-hour">End hour*</InputLabel>
                    <TimePicker
                      id="end-hour"
                      value={endHour}
                      onChange={(newValue) => {
                        setEndHour(newValue);
                      }}
                      // renderInput={(params) => <TextField size="small" {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <InputLabel htmlFor="configure-reminder-image">Select an image*</InputLabel>
                    <TextField
                      fullWidth
                      id="configure-reminder-image"
                      helperText="Please select the loop time"
                      type="number"
                      size="small"
                      InputProps={{
                        inputProps: { max: 60, min: 1 },
                        startAdornment: <InputAdornment position="start">minutes</InputAdornment>,
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="loop-time">Start hour*</InputLabel>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Button fullWidth type="submit" onClick={() => navigate('/main')}>Continue</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <div className="configure-reminder-center">
        <div className="configure-reminder-image-box">
          <label htmlFor="configure-reminder-image">Configure image</label>
          <img src={reminderImg} alt="Graphic representation for the reminder" id="configure-reminder-image" className="configure-reminder-image" />
        </div>
        <button className="configure-reminder-btn" type="button">Reset Password</button>
      </div>
    </div>
  );
}
