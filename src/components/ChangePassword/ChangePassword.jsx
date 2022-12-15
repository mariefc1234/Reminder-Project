import {
  Button,
  Card, CardContent, Checkbox, FormControlLabel, Grid, InputLabel, TextField, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import PasswordChecklist from 'react-password-checklist';
import GeneralMenu from '../Utilities/Menu/GeneralMenu';
import AnnouncementDialog from '../Utilities/Dialogs/AnnouncementDialog';

export default function ChangePassword() {
  const queryParameters = new URLSearchParams(window.location.search);
  const pin = queryParameters.get('pin');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [announcementDialog, setAnnouncementDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  const changePassword = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://reminder.herokuapp.com/api/email/changePassword/${pin}`, {
      method: 'POST',
      body: JSON.stringify({
      password,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    const resJSON = await res.json();
    if (resJSON.ok) {
      setAnnouncementDialog({
        isOpen: true,
        title: 'Password changed',
        onConfirm: () => { window.location = '/main'; },
      });
    }
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div>
      <GeneralMenu />
      <Grid>
        <Card style={{ maxWidth: 650, padding: '20px 5px', margin: '0 auto' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" align="center" mb={2} sx={{ fontWeight: '500' }}>
              Change Password
            </Typography>
            <form onSubmit={changePassword}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="password">Enter your new password*</InputLabel>
                  <TextField type={passwordShown ? 'text' : 'password'} fullWidth placeholder="Enter your password" variant="outlined" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="confPassword">Confirm Password*</InputLabel>
                  <TextField type={passwordShown ? 'text' : 'password'} fullWidth placeholder="Confirm password" variant="outlined" id="confPassword" name="confPassword" onChange={(e) => setPasswordAgain(e.target.value)} required />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox onChange={togglePassword} />} label="Show Password" />
                </Grid>
                <Grid item xs={12} md={6} style={{ fontFamily: '"Poppins", sans-serif', fontSize: '14px' }}>
                  <PasswordChecklist
                    rules={['minLength', 'lowercase', 'specialChar']}
                    minLength={8}
                    value={password}
                    valueAgain={passwordAgain}
                    onChange={(isValid) => {
                      if (isValid) {
                        setDisableBtn(false);
                      } else {
                        setDisableBtn(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ fontFamily: '"Poppins", sans-serif', fontSize: '14px' }}>
                  <PasswordChecklist
                    rules={['number', 'capital', 'match']}
                    minLength={8}
                    value={password}
                    valueAgain={passwordAgain}
                    onChange={(isValid) => {
                      if (isValid) {
                        setDisableBtn(false);
                      } else {
                        setDisableBtn(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} mt={2} mb={1}>
                  <Button type="submit" color="primary" variant="defaultButton" disabled={disableBtn} fullWidth>Change Password</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <AnnouncementDialog
        announcementDialog={announcementDialog}
        setAnnouncementDialog={setAnnouncementDialog}
      />
    </div>
  );
}
