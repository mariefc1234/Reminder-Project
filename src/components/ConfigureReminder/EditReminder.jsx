/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useContext, useEffect, useState } from 'react';
import {
  Button, FormControlLabel, FormLabel, Grid,
  InputLabel, MenuItem, Radio, RadioGroup, Select, TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { context } from '../../context/authContext';
import { useForm } from '../../hooks/useForm';

const images = [
  { id: 1, title: 'Clock', ref: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
  { id: 2, title: 'Water', ref: 'https://cdn-icons-png.flaticon.com/512/3248/3248369.png' },
  { id: 3, title: 'Stretch', ref: 'https://cdn-icons-png.flaticon.com/512/983/983544.png' },
];

const minutes = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'];

export function EditReminder(reminder1) {
  const {
    reminder, reminders, setReminders, isReminderEdited,
  } = reminder1;
  const authContext = useContext(context);
  const [startHour, setStartHour] = React.useState(dayjs(`2022-11-22 ${reminder.hourBegin}`));
  const [endHour, setEndHour] = React.useState(dayjs(`2022-11-22 ${reminder.hourEnd}`));
  const [image, setImage] = useState('');
  const [minutesLapse, setMinutesLapse] = React.useState(reminder.minutesLapse);
  const initialForm = {
    title: reminder.name,

  };

  const [formValues, handleInputChange] = useForm(initialForm);
  const {
    title,
  } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hourBegin = startHour.format('HH:mm');
    const hourEnd = endHour.format('HH:mm');
    const res = await fetch(`http://localhost:8080/api/reminder/${reminder.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: title,
        hourBegin,
        hourEnd,
        minutesLapse,
        image,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8', authtoken: authContext.token },
    });
    const resJSON = await res.json();
    const isEdited = resJSON.msg;
    if (isEdited) {
      setReminders(reminders.map((rem) => ((rem.id === reminder.id) ? {
        ...rem,
        name: title,
        hourBegin,
        hourEnd,
        minutesLapse,
        image,
        url: images[image - 1].ref,
      } : rem)));
      isReminderEdited(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputLabel htmlFor="title">Title*</InputLabel>
          <TextField fullWidth id="title" type="text" placeholder="Enter the title" variant="outlined" name="title" value={title} onChange={handleInputChange} size="small" required />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <InputLabel htmlFor="start-hour">Start hour*</InputLabel>
            <TimePicker
              id="start-hour"
              defaultValue={startHour}
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
              defaultValue={endHour}
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
  );
}
