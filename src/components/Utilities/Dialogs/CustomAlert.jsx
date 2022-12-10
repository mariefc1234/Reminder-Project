/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Snackbar, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { React } from 'react';

export default function CustomAlert(props) {
  const { alert, setAlert } = props;

  const handleCloseAlert = (event, reason) => {
    setAlert({
      ...alert,
      isOpen: false,
    });
  };

  return (
    <Snackbar open={alert.isOpen} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleCloseAlert}>
      <Alert severity={alert.severity} onClose={handleCloseAlert}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
