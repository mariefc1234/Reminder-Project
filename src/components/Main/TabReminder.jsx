/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
 Box, Button, Grid, IconButton, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LoopIcon from '@mui/icons-material/Loop';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { ConfigureReminderForm } from '../ConfigureReminder/ConfigureReminderForm';
import Popup from '../Utilities/Popup';

const reminders = [
  {
    id: 1, name: 'Reminder 1', hourBegin: '10:20', hourEnd: '12:50', minutesLapse: 4, url: 'https://cdn-icons-png.flaticon.com/512/3248/3248369.png',
  },
  {
    id: 2, name: 'reminder 2', hourBegin: '08:50', hourEnd: '09:50', minutesLapse: 4, url: 'https://cdn-icons-png.flaticon.com/512/3248/3248369.png',
  },
  {
    id: 3, name: 'reminder 3', hourBegin: '05:40', hourEnd: '06:20', minutesLapse: 4, url: 'https://cdn-icons-png.flaticon.com/512/3248/3248369.png',
  },
  {
    id: 4, name: 'reminder 4', hourBegin: '07:30', hourEnd: '10:20', minutesLapse: 4, url: 'https://cdn-icons-png.flaticon.com/512/3248/3248369.png',
  },
];

export default function TabReminder(props) {
  const { value, index } = props;
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [reminderParam, setReminderParam] = useState(null);

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
            {reminders.map((reminder) => (
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
            ))}
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
