/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */

// falta agregar el navigation cuando esten bien los datos
import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  Button, Card, CardContent, FormControlLabel, FormLabel, Grid,
  InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

import { context } from '../../context/authContext';
import UserMenu from '../Utilities/Menu/UserMenu';
import { useForm } from '../../hooks/useForm';
import { forceLogout } from '../../helpers/unauthorized';

const images = [
  { id: 1, title: 'Clock', ref: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
  { id: 2, title: 'Water', ref: 'https://cdn-icons-png.flaticon.com/512/3248/3248369.png' },
  { id: 3, title: 'Stretch', ref: 'https://cdn-icons-png.flaticon.com/512/983/983544.png' },
];

const minutes = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'];

export function ConfigureReminder() {
  // const navigate = useNavigate();
  const [startHour, setStartHour] = React.useState(dayjs('2022-11-22'));
  const [endHour, setEndHour] = React.useState(dayjs('2022-11-22'));
  const [minutesLapse, setMinutesLapse] = React.useState('0');
  const [image, setImage] = useState('');
  const authContext = useContext(context);
  const initialForm = {
    name: '',
  };
  const [formValues, handleInputChange] = useForm(initialForm);
  const {
    name,
  } = formValues;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hourBegin = startHour.format('HH:mm');
    const hourEnd = endHour.format('HH:mm');

    const res = await fetch('http://localhost:8080/api/reminder', {
      method: 'POST',
      body: JSON.stringify({
        name,
        hourBegin,
        hourEnd,
        minutesLapse,
        image,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8', authtoken: authContext.token },
    });
    const resJSON = await res.json();
    const isRegistered = resJSON.ok;
    if (isRegistered) {
      Swal.fire({
        title: 'Reminder Created',
        confirmButtonText: 'Okay',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/main';
        }
      });
    } else {
      Swal.fire({
        title: 'Session expired',
        confirmButtonText: 'Okay',
      });
      localStorage.clear();
      authContext.setToken(false);
      authContext.setLogged(false);
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
                  <InputLabel htmlFor="minutes-lapse-label">Minutes Lapse*</InputLabel>
                  <Select
                    labelId="minutes-lapse-label"
                    id="demo-simple-select"
                    value={minutesLapse}
                    label="Loop minutes"
                    onChange={(e) => setMinutesLapse(e.target.value)}
                  >
                    {minutes.map((minute) => <MenuItem key={minute} value={minute}>{minute}</MenuItem>)}
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
                        control={<Radio icon={<img src={imageArray.ref} width="120" />} checkedIcon={<Box component="img" width="120px" backgroundColor="rgba(207, 204, 206, 0.3)" src={imageArray.ref} />} />}
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
    </div>
  );
}
