/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Button, Grid, InputLabel, TextField,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {
  React, useContext, useEffect, useState,
} from 'react';
import Swal from 'sweetalert2';
import { context } from '../../context/authContext';

export default function ToDoForm(paramsToDo) {
  const {
 toDo, isEdited, isCompleted, activeTodos, setActiveTodos,
} = paramsToDo;
  const [date, setDate] = useState(dayjs());
  const [description, setDescription] = useState('');
  const authContext = useContext(context);

  const handleInput = (val) => {
    setDescription(val.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endDate = dayjs(date).valueOf();
    if (isEdited) {
      // Edit to do
      const res = await fetch(`http://localhost:8080/api/todo/${toDo.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          description,
          endDate,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8', authtoken: authContext.token },
      });
      const resJSON = await res.json();
      const respEdited = resJSON.msg;
      if (respEdited) {
        setActiveTodos(activeTodos.map((todo) => ((todo.id === toDo.id) ? {
          ...todo,
          description,
          endDate,
        } : todo)));
        isCompleted(true);
    }
    } else {
      // Create to do
      const res = await fetch('http://localhost:8080/api/todo', {
        method: 'POST',
        body: JSON.stringify({
          description,
          endDate,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8', authtoken: authContext.token },
      });
      const resJSON = await res.json();
      console.log(resJSON);
      const isRegistered = resJSON.ok;
      if (isRegistered) {
        isCompleted(true);
      } else {
        Swal.fire({
          title: 'Session expired',
          confirmButtonText: 'Okay',
        });
        localStorage.clear();
        authContext.setToken(false);
        authContext.setLogged(false);
      }
    }
  };

  useEffect(() => {
    if (toDo !== undefined) {
      setDate(dayjs(toDo.endDate).format('YYYY/MM/DD HH:mm:ss'));
      setDescription(toDo.description);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={6}>
          <InputLabel htmlFor="description">Description*</InputLabel>
          <TextField
            fullWidth
            id="description"
            type="text"
            placeholder="Enter the Description"
            name="description"
            size="small"
            value={description}
            onChange={handleInput}
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <InputLabel htmlFor="end-time-and-date">End date*</InputLabel>
            <DateTimePicker
              id="end-time-and-date"
              renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              minDateTime={dayjs()}
              minTime={dayjs()}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Button fullWidth type="submit" variant="defaultButton">Continue</Button>
        </Grid>
      </Grid>
    </form>
  );
}
