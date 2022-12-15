/* eslint-disable react/prop-types */
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
import AnnouncementDialog from '../Utilities/Dialogs/AnnouncementDialog';

const images = [
  { id: 1, title: 'Clock', ref: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
  { id: 2, title: 'Water', ref: 'https://cdn-icons-png.flaticon.com/512/3248/3248369.png' },
  { id: 3, title: 'Stretch', ref: 'https://cdn-icons-png.flaticon.com/512/983/983544.png' },
];

const minutes = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'];

export function ReminderForm(param) {
  const {
    reminder, isEdited, isCompleted, reminders, setReminders,
  } = param;

  const authContext = useContext(context);
  const [title, setTitle] = useState('');
  const [startHour, setStartHour] = React.useState(dayjs('2022-11-22'));
  const [endHour, setEndHour] = React.useState(dayjs('2022-11-22'));
  const [image, setImage] = useState(0);
  const [minutesLapse, setMinutesLapse] = React.useState('0');
  const [announcementDialog, setAnnouncementDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  const validateForm = () => {
    if (endHour.isBefore(startHour) || endHour.isSame(startHour)) {
      isCompleted(false, 'Invalid Hour.', 'error');
      return false;
    }
    if (minutesLapse.valueOf() === '0') {
      isCompleted(false, 'Invalid minutes lapse.', 'error');
      return false;
    }
    if (image === 0) {
      isCompleted(false, 'Please select an image.', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hourBegin = startHour.format('HH:mm');
    const hourEnd = endHour.format('HH:mm');
    if (validateForm()) {
      if (isEdited) {
        // Edit reminder
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
        const respEdited = resJSON.msg;
        if (respEdited) {
          setReminders(reminders.map((rem) => ((rem.id === reminder.id) ? {
            ...rem,
            name: title,
            hourBegin,
            hourEnd,
            minutesLapse,
            image,
            url: images[image - 1].ref,
          } : rem)));
          isCompleted(true, 'Reminder saved successfully.', 'success');
        }
      } else {
        // Create reminder
        const res = await fetch('http://localhost:8080/api/reminder', {
          method: 'POST',
          body: JSON.stringify({
            name: title,
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
          isCompleted(true, 'Reminder saved successfully.', 'success');
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
    }
  };

  useEffect(() => {
    if (reminder !== undefined) {
      setTitle(reminder.name);
      setStartHour(dayjs(`2022-11-22 ${reminder.hourBegin}`));
      setEndHour(dayjs(`2022-11-22 ${reminder.hourEnd}`));
      setImage(reminder.image);
      setMinutesLapse(reminder.minutesLapse);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputLabel htmlFor="title">Title*</InputLabel>
          <TextField
            fullWidth
            id="title"
            type="text"
            placeholder="Enter the title"
            variant="outlined"
            name="description"
            value={title}
            onChange={(newValue) => {
              setTitle(newValue.target.value);
            }}
            size="small"
            required
          />
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
                control={<Radio icon={<img src={imageArray.ref} width="120" />} checkedIcon={<Box component="img" width="120px" backgroundColor="lightgray" sx={{ p: 1 }} src={imageArray.ref} />} />}
              />
            ))}
          </RadioGroup>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Button fullWidth type="submit" variant="defaultButton">Continue</Button>
        </Grid>
      </Grid>
      <AnnouncementDialog
        announcementDialog={announcementDialog}
        setAnnouncementDialog={setAnnouncementDialog}
      />
    </form>
  );
}
