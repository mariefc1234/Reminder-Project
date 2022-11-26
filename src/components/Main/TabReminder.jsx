/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
 Box, Button, Grid, IconButton, Typography,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LoopIcon from '@mui/icons-material/Loop';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { ConfigureReminderForm } from '../ConfigureReminder/ConfigureReminderForm';
import Popup from '../Utilities/Popup';
import { context } from '../../context/authContext';
import { useFetchGet } from '../../hooks/useFetchGet';
import { Loading } from '../Utilities/Loading/Loading';

export default function TabReminder(props) {
  const authContext = useContext(context);
  const { value, index } = props;
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [reminderParam, setReminderParam] = useState(null);

  const urlReminder = 'http://localhost:8080/api/reminder';
  const { data, loading } = useFetchGet(urlReminder, authContext.token);

  const openInPopup = (item) => {
      setReminderParam(item);
      setOpenPopup(true);
  };
  const deleteItem = (item) => {
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
        <Box style={{ maxWidth: 650, padding: '20px 5px', margin: '0 auto' }}>
          <Button sx={{ mb: 3 }} onClick={() => navigate('/configurereminder')}>Create Reminder</Button>
          {
            (loading)
            ? <Loading />
            : data.data.reminders.map((reminder) => (
              <Grid container spacing={2} key={reminder.id} sx={{ mb: 3 }}>
                <Grid item>
                  <Box>
                    <img alt="complex" width="100px" src={reminder.url} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
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
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => { openInPopup(reminder.id); }} aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => { deleteItem(reminder.id); }} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ))
          }
        </Box>
      )
    }
      <Popup
        title="Employee Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ConfigureReminderForm
          object={reminderParam}
        />
      </Popup>
    </div>
  );
}
