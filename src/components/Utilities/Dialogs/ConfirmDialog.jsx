/* eslint-disable react/prop-types */
import {
  Button, Dialog, DialogActions, DialogContent, Typography,
} from '@mui/material';
import React from 'react';

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogContent>
        <Typography variant="h6">
          {confirmDialog.title}
        </Typography>
        <Typography variant="subtitle2">
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="defaultButton"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          No
        </Button>
        <Button
          onClick={confirmDialog.onConfirm}
          variant="menuButton"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
