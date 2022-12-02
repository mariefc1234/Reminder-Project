/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
 Box, Button, Grid, IconButton, Paper, Typography,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LoopIcon from '@mui/icons-material/Loop';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { EditReminder } from '../ConfigureReminder/EditReminder';
import Popup from '../Utilities/Popup';
import { context } from '../../context/authContext';
import { useFetchGet } from '../../hooks/useFetchGet';
import { Loading } from '../Utilities/Loading/Loading';
// import imgfd from '../../img/logo.png';

export default function TabReminder(props) {
  const authContext = useContext(context);
  const { value, index } = props;
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [reminderParam, setReminderParam] = useState(null);
  const [reminderObject, setReminderObject] = useState(null);

  const urlReminder = 'http://localhost:8080/api/reminder';
  const { data, loading } = useFetchGet(urlReminder, authContext.token);

  const openInPopup = (item, rem) => {
      setReminderParam(item);
      setReminderObject(rem);
      setOpenPopup(true);
  };
  const deleteItem = (item) => {
    // DELETE http://localhost:8080/api/reminder/item
    Swal.fire({
      title: `Are you sure?${item}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
        );
      }
    });
  };

  return (
    <div>
      {
      value === index && (
        <Grid container style={{ maxWidth: '90%', padding: '5px 5px', margin: '0 auto' }} spacing={1}>
          <Grid item xs={12} display="flex" flexDirection="row-reverse">
            <Button onClick={() => navigate('/configurereminder')} variant="defaultButton">Create Reminder</Button>
          </Grid>
          {
            (loading)
            ? <Loading />
            : data.data.reminders.map((reminder) => (

              <Grid item xs={12} sm={12} md={4} key={reminder.id}>
                <Paper style={{ padding: '20px' }}>
                  <Grid item display="flex" justifyContent="space-between">
                    <Box display="flex">
                      <img alt="complex" width="100px" src={reminder.url} />
                    </Box>
                    <Grid item>
                      <IconButton onClick={() => { openInPopup(reminder.id, reminder); }} aria-label="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => { deleteItem(reminder.id); }} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="h6" component="div">
                      {reminder.name}
                    </Typography>
                    <Box display="flex" flexdirection="row">
                      <ScheduleIcon />
                      <Typography sx={{ mr: 3 }}>{reminder.hourBegin}</Typography>
                      <ScheduleIcon />
                      <Typography sx={{ mr: 3 }}>{reminder.hourEnd}</Typography>
                      <LoopIcon />
                      <Typography>{reminder.minutesLapse}</Typography>
                    </Box>
                  </Grid>
                </Paper>
              </Grid>
            ))
          }
        </Grid>
      )
    }
      <Popup
        title="Employee Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EditReminder
          id={reminderParam}
          reminder={reminderObject}
        />
      </Popup>
    </div>
  );
}
