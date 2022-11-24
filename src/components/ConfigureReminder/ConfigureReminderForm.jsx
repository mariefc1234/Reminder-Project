/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */

// falta agregar el navigate cuando esten bien los datos
import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  Button, Card, CardContent, FormControlLabel, FormLabel, Grid,
  InputLabel, Radio, RadioGroup, TextField, Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { context } from '../../context/authContext';
import { useFetchGet } from '../../hooks/useFetchGet';

import UserMenu from '../Utilities/Menu/UserMenu';
import { useForm } from '../../hooks/useForm';

const images = [
  { id: 1, title: 'Water', ref: 'https://cdn-icons-png.flaticon.com/512/983/983544.png' },
  { id: 2, title: 'Stretch', ref: 'https://cdn-icons-png.flaticon.com/512/3248/3248369.png' },
  { id: 3, title: 'Clock', ref: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
];

export function ConfigureReminderForm(props) {
  // const navigate = useNavigate();
  const [startHour, setStartHour] = React.useState(dayjs('2022-11-22'));
  const [endHour, setEndHour] = React.useState(dayjs('2022-11-22'));
  const [image, setImage] = useState('');

  const authContext = useContext(context);
  const idReminder = props;
  const urlReminder = `http://localhost:8080/api/reminder/${idReminder[Object.keys(idReminder)[0]]}`;
  const { data, loading, error } = useFetchGet(urlReminder, authContext.token);

  const lapse = image;
  const id = image;
  const initialForm = {
    title: '',
  };
  const [formValues, handleInputChange] = useForm(initialForm);
  const {
    title,
  } = formValues;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const sh = startHour.format('HH:mm');
    const eh = endHour.format('HH:mm');
    const { name } = data.data;
    // console.log(shour);
    console.log(name);
  };

 // fldkfklsdhlkghsldjkghjlkdshgjkfhdsljk
  return (
    <form>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputLabel htmlFor="title">Title*</InputLabel>
          <TextField fullWidth id="title" type="text" placeholder="Enter the title" variant="outlined" name="title" onChange={handleInputChange} size="small" required />
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
          <Button fullWidth type="submit" onClick={handleSubmit}>Continue</Button>
        </Grid>
      </Grid>
    </form>
  );
}
