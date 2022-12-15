/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useContext, useState } from 'react';
import {
  Button, Card, CardContent, FormControlLabel, FormLabel, Grid,
  InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { Box } from '@mui/system';
import dayjs from 'dayjs';

import { context } from '../../context/authContext';
import UserMenu from '../Utilities/Menu/UserMenu';
import { useForm } from '../../hooks/useForm';
import CustomAlert from '../Utilities/Dialogs/CustomAlert';
import AnnouncementDialog from '../Utilities/Dialogs/AnnouncementDialog';

const images = [
  { id: 1, altText: 'Clock', ref: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
  { id: 2, altText: 'Water', ref: 'https://cdn-icons-png.flaticon.com/512/3248/3248369.png' },
  { id: 3, altText: 'Stretch', ref: 'https://cdn-icons-png.flaticon.com/512/983/983544.png' },
];

const minutes = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'];

export function ConfigureReminder() {
  const [startHour, setStartHour] = React.useState(dayjs('2022-11-22'));
  const [endHour, setEndHour] = React.useState(dayjs('2022-11-22'));
  const [minutesLapse, setMinutesLapse] = React.useState('0');
  const [image, setImage] = useState(0);
  const authContext = useContext(context);
  const [alert, setAlert] = useState({ isOpen: false, message: '', severity: 'warning' });
  const [announcementDialog, setAnnouncementDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  const initialForm = {
    name: '',
  };
  const [formValues, handleInputChange] = useForm(initialForm);
  const {
    name,
  } = formValues;

  const validateForm = () => {
    if (endHour.isBefore(startHour) || endHour.isSame(startHour)) {
      setAlert({
        isOpen: true,
        message: 'Invalid hour',
        severity: 'error',
      });
      return false;
    }
    if (minutesLapse.valueOf() === '0') {
      setAlert({
        isOpen: true,
        message: 'Invalid minutes',
        severity: 'error',
      });
      return false;
    }
    if (image === 0) {
      setAlert({
        isOpen: true,
        message: 'Invalid image',
        severity: 'error',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const res = await fetch('https://reminder.herokuapp.com/api/reminder', {
        method: 'POST',
        body: JSON.stringify({
          name,
          hourBegin: startHour.format('HH:mm'),
          hourEnd: endHour.format('HH:mm'),
          minutesLapse,
          image,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8', authtoken: authContext.token },
      });
      const resJSON = await res.json();
      const isRegistered = resJSON.ok;
      if (isRegistered) {
        setAnnouncementDialog({
          isOpen: true,
          title: 'Reminder Created',
          onConfirm: () => { window.location.href = '/main'; },
        });
      } else {
        setAnnouncementDialog({
          isOpen: true,
          title: 'Session expired',
          onConfirm: () => { window.location.href = '/main'; },
        });
        localStorage.clear();
        authContext.setToken(false);
        authContext.setLogged(false);
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
              Configure Reminder
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="title">Title*</InputLabel>
                  <TextField fullWidth id="title" type="text" placeholder="Enter the title" variant="outlined" name="name" onChange={handleInputChange} size="small" required />
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
                      renderInput={(params) => <TextField fullWidth size="small" {...params} />}
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
                      renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="minutes-lapse-label">Minutes Lapse*</InputLabel>
                  <Select
                    labelId="minutes-lapse-label"
                    value={minutesLapse}
                    label="Loop minutes"
                    onChange={(e) => setMinutesLapse(e.target.value)}
                  >
                    {minutes.map((minute) => (
                      <MenuItem
                        key={minute}
                        value={minute}
                      >
                        {minute}
                      </MenuItem>
                  ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <FormLabel id="demo-radio-buttons-group-label">Select an image</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  >
                    {images.map((imageArray) => (
                      <FormControlLabel
                        value={imageArray.id}
                        key={imageArray.id}
                        control={<Radio icon={<img alt={image.altText} src={imageArray.ref} width="120" />} checkedIcon={<Box component="img" width="120px" backgroundColor="rgba(207, 204, 206, 0.3)" src={imageArray.ref} />} />}
                      />
                    ))}
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Button fullWidth type="submit" variant="defaultButton">Continue</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <CustomAlert alert={alert} setAlert={setAlert} />
      <AnnouncementDialog
        announcementDialog={announcementDialog}
        setAnnouncementDialog={setAnnouncementDialog}
      />
    </div>
  );
}
