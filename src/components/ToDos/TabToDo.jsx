/* eslint-disable react/prop-types */
import {
  Button, Checkbox, Grid, IconButton, Stack, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { context } from '../../context/authContext';
import { useFetchGet } from '../../hooks/useFetchGet';
import Popup from '../Utilities/Dialogs/Popup';
import ToDoForm from './ToDoForm';
import { Loading } from '../Utilities/Loading/Loading';
import CustomAlert from '../Utilities/Dialogs/CustomAlert';
import ConfirmDialog from '../Utilities/Dialogs/ConfirmDialog';

export default function TabToDo(props) {
  const { value, index } = props;
  const authContext = useContext(context);
  const urlReminder = 'http://localhost:8080/api/todo';
  const { data, loading } = useFetchGet(urlReminder, authContext.token);
  const [activeTodos, setActiveTodos] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [toDoParam, setToDoParam] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, message: '', severity: 'warning' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  const openInPopup = (rem) => {
    setToDoParam(rem);
    setOpenPopup(true);
  };

  const isCompleted = (status, text, severity) => {
    if (status) {
      window.location.reload();
      setOpenPopup(false);
    }
    setAlert({
      isOpen: true,
      message: text,
      severity,
    });
  };

  const deleteItem = async (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    const res = await fetch(`http://localhost:8080/api/todo/${item}`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json; charset=UTF-8', authtoken: authContext.token },
    });
    const resJSON = await res.json();
    const isDeleted = resJSON.ok;
    if (isDeleted) {
      setActiveTodos(activeTodos.filter((todo) => todo.id !== item));
      setAlert({
        isOpen: true,
        message: 'To Do deleted successfully',
        severity: 'success',
      });
    }
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
          <Stack direction={{ xs: 'column', sm: 'row' }} mb={1} style={{ width: '90%' }} display="flex" justifyContent="end">
            <Button variant="defaultButton" onClick={() => { openInPopup(); setIsEdited(false); }}>Create To Do</Button>
          </Stack>
          <Grid container width="90%" backgroundColor="#ecedf6" p={2} borderRadius="12px">
            {
            (loading)
            ? <Loading />
            : activeTodos.map((todo) => (
              <Grid container justifyContent="space-between" backgroundColor="white" p={0.3} m={1} key={todo.id}>
                <Grid item display="flex" justifyContent="flex-start">
                  <Checkbox onChange={(e) => { e.preventDefault(); deleteItem(todo.id); }} sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                </Grid>
                <Grid item xs={10} md={10} display="flex" flexDirection="column">
                  <Typography variant="h6">{todo.description}</Typography>
                  <Typography variant="body1">{dayjs(todo.endDate).format('YYYY/MM/DD HH:mm')}</Typography>
                </Grid>
                <Grid item xs={1} md={1} display="flex" justifyContent="flex-end">
                  <IconButton onClick={() => { openInPopup(todo); setIsEdited(true); }} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                      e.preventDefault();
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => { deleteItem(todo.id); },
                      });
                    }}
                  >
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
      <CustomAlert alert={alert} setAlert={setAlert} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
