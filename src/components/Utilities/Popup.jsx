/* eslint-disable react/prop-types */
import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, Typography, Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Popup(props) {
  const {
    title, children, openPopup, setOpenPopup,
  } = props;
  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>{title}</Typography>
          <Button
            variant="menuButton"
            onClick={() => { setOpenPopup(false); }}
          >
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
}
