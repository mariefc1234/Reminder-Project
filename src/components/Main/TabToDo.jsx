/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import {
  Alert,
  Button, Checkbox, Grid, IconButton, Snackbar, Stack, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { context } from '../../context/authContext';
import { useFetchGet } from '../../hooks/useFetchGet';
import Popup from '../Utilities/Popup';
import ToDoForm from '../ToDos/ToDoForm';
import { Loading } from '../Utilities/Loading/Loading';
// import { Loading } from '../Utilities/Loading/Loading';

export default function TabToDo(props) {
  const { value, index } = props;
  const authContext = useContext(context);
  const urlReminder = 'http://localhost:8080/api/todo';
  const { data, loading } = useFetchGet(urlReminder, authContext.token);
  const [activeTodos, setActiveTodos] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [toDoParam, setToDoParam] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  // const [rtodos, setTodos] = useState([]);
  // const [reminders, setReminders] = useState([]);

  const openInPopup = (rem) => {
    setToDoParam(rem);
    setOpenPopup(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const isCompleted = (isConfigured) => {
    if (isConfigured) {
      setOpenPopup(false);
      setOpenAlert(true);
    }
  };

  const deleteItem = async (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:8080/api/todo/${item}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json; charset=UTF-8', authtoken: authContext.token },
        });
        const resJSON = await res.json();
        const isDeleted = resJSON.ok;
        if (isDeleted) {
          setActiveTodos(activeTodos.filter((todo) => todo.id !== item));
          Swal.fire(
            'Deleted!',
            'Your reminder has been deleted.',
            'success',
          );
        }
      }
    });
  };

  useEffect(() => {
    if (!loading) {
      setActiveTodos(data.data.actives);
    }
  }, [loading]);

  return (
    <div>
      {
      value === index && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h3">To Do List</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} mb={1} style={{ width: '90%' }} display="flex" justifyContent="space-between">
            <Button variant="defaultButton" onClick={() => { openInPopup(); setIsEdited(false); }}>Create</Button>
            <Button variant="defaultButton">S or t</Button>
          </Stack>
          <Grid container width="90%" backgroundColor="#ecedf6" p={2} borderRadius="12px">
            {
            (loading)
            ? <Loading />
            : activeTodos.map((todo) => (
              <Grid container justifyContent="space-between" backgroundColor="white" p={0.5} m={1} key={todo.id}>
                <Grid item display="flex" justifyContent="flex-start">
                  <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                </Grid>
                <Grid item xs={10} md={10} display="flex" flexDirection="column">
                  <Typography variant="h6">{todo.description}</Typography>
                  <Typography variant="body1">{dayjs(todo.endDate).format('YYYY/MM/DD HH:mm')}</Typography>
                </Grid>
                <Grid item xs={1} md={1} display="flex" justifyContent="flex-end">
                  <IconButton onClick={() => { openInPopup(todo); setIsEdited(true); }} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={(e) => { e.preventDefault(); deleteItem(todo.id); }}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))
          }
          </Grid>
        </Box>
      )
    }
      <Popup
        title="Configure To Do"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ToDoForm
          toDo={toDoParam}
          isEdited={isEdited}
          isCompleted={isCompleted}
          activeTodos={activeTodos}
          setActiveTodos={setActiveTodos}
        />
      </Popup>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert
          action={(
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
          sx={{ mb: 2 }}
        >
          Task saved
        </Alert>
      </Snackbar>
    </div>
  );
}
