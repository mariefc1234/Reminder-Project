/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box, Button, Grid, IconButton, Paper, Typography,
} from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LoopIcon from '@mui/icons-material/Loop';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EditReminder } from './EditReminder';
import Popup from '../Utilities/Dialogs/Popup';
import { context } from '../../context/authContext';
import { useFetchGet } from '../../hooks/useFetchGet';
import { Loading } from '../Utilities/Loading/Loading';
import CustomAlert from '../Utilities/Dialogs/CustomAlert';
import ConfirmDialog from '../Utilities/Dialogs/ConfirmDialog';

export default function TabReminder(props) {
  const authContext = useContext(context);
  const { value, index } = props;
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, message: '', severity: 'warning' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const [reminderObject, setReminderObject] = useState(null);
  const [reminders, setReminders] = useState([]);

  const urlReminder = 'http://localhost:8080/api/reminder';
  const { data, loading } = useFetchGet(urlReminder, authContext.token);

  const openInPopup = (rem) => {
      setReminderObject(rem);
      setOpenPopup(true);
  };

  const isReminderEdited = (status, text, severity) => {
    if (status) {
      setOpenPopup(false);
    }
    setAlert({
      isOpen: true,
      message: text,
      severity,
    });
  };

  useEffect(() => {
    if (!loading) {
      setReminders(data.data.reminders);
    }
  }, [loading]);

  const deleteItem = async (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    const res = await fetch(`http://localhost:8080/api/reminder/${item}`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json; charset=UTF-8', authtoken: authContext.token },
    });
    const resJSON = await res.json();
    const isDeleted = resJSON.ok;
    if (isDeleted) {
      setReminders(reminders.filter((reminder) => reminder.id !== item));
      setAlert({
        isOpen: true,
        message: 'Reminder deleted successfully',
        severity: 'success',
      });
    }
  };

  return (
    <div>
      {
      value === index && (
        <Grid container style={{ maxWidth: '90%', padding: '5px 5px', margin: '0 auto' }} spacing={1}>
          <Grid item xs={12} display="flex" flexDirection="row-reverse">
            <Button width="150" onClick={() => navigate('/configurereminder')} variant="defaultButton">Create Reminder</Button>
          </Grid>
          {
            (loading)
            ? <Loading />
            : reminders.map((reminder) => (
              <Grid item xs={12} sm={12} md={4} key={reminder.id}>
                <Paper style={{ padding: '20px' }}>
                  <Grid item display="flex" justifyContent="space-between">
                    <Box display="flex">
                      <img alt="complex" width="100px" src={reminder.url} />
                    </Box>
                    <Grid item>
                      <IconButton onClick={() => { openInPopup(reminder); }} aria-label="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Are you sure to delete this record?',
                            subTitle: "You can't undo this operation",
                            onConfirm: () => { deleteItem(reminder.id); },
                          });
                        }}
                        aria-label="delete"
                      >
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
        title="Configure reminder"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EditReminder
          reminder={reminderObject}
          reminders={reminders}
          setReminders={setReminders}
          isReminderEdited={isReminderEdited}
        />
      </Popup>
      <CustomAlert alert={alert} setAlert={setAlert} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
