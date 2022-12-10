/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button, Dialog, DialogActions, DialogContent, Typography,
} from '@mui/material';
import React from 'react';

export default function AnnouncemenDialog(props) {
  const { announcementDialog, setAnnouncementDialog } = props;
  return (
    <Dialog open={announcementDialog.isOpen}>
      <DialogContent>
        <Typography variant="h6">
          {announcementDialog.title}
        </Typography>
        <Typography variant="subtitle2">
          {announcementDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="menuButton"
          onClick={announcementDialog.onConfirm}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}
