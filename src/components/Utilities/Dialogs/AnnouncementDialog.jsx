/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button, Dialog, DialogActions, DialogContent, Stack, Typography,
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
        <Stack style={{ width: '100%' }} display="flex" justifyContent="center">
          <Button
            variant="menuButton"
            onClick={announcementDialog.onConfirm}
          >
            Accept
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
