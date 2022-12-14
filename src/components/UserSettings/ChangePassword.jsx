import {
  Button, Card, CardContent,
  FormControl,
  Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import PasswordChecklist from 'react-password-checklist';
import UserMenu from '../Utilities/Menu/UserMenu';
import { useForm } from '../../hooks/useForm';
import CustomAlert from '../Utilities/Dialogs/CustomAlert';

export default function ChangePassword() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [alert, setAlert] = useState({ isOpen: false, message: '', severity: 'warning' });

  const initialForm = {
    oldPassword: '',
    newPassword: '',
    confNewPassword: '',
  };

  const [formValues, handleInputChange] = useForm(initialForm);
  const {
    oldPassword, newPassword, confNewPassword,
  } = formValues;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (newPassword !== confNewPassword) {
      setAlert({
        isOpen: true,
        message: "Passwords doesn't match",
        severity: 'error',
      });
    } else {
      window.location.href = '/main';
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <UserMenu />
      <Card style={{ maxWidth: 650, padding: '20px 5px', margin: '0 auto' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" align="center" sx={{ fontWeight: '500' }}>
            Change your password
          </Typography>
          <form onSubmit={handleRegister}>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={12}>
                <InputLabel htmlFor="oldPassword">Enter your old password*</InputLabel>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    id="ondPassword"
                    value={oldPassword}
                    type={passwordShown ? 'text' : 'password'}
                    name="oldPassword"
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your old password"
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePassword}
                          edge="end"
                        >
                          {passwordShown ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} mt={2}>
                <InputLabel htmlFor="newPassword">Enter your new password*</InputLabel>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    value={newPassword}
                    type={passwordShown ? 'text' : 'password'}
                    name="newPassword"
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your new password"
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePassword}
                          edge="end"
                        >
                          {passwordShown ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="confNewPassword">Confirm new password*</InputLabel>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    type={passwordShown ? 'text' : 'password'}
                    name="confNewPassword"
                    onChange={handleInputChange}
                    required
                    placeholder="Confirm your new password"
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePassword}
                          edge="end"
                        >
                          {passwordShown ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} style={{ fontFamily: '"Poppins", sans-serif', fontSize: '14px' }}>
                <PasswordChecklist
                  rules={['minLength', 'lowercase', 'specialChar']}
                  minLength={8}
                  value={newPassword}
                  valueAgain={confNewPassword}
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
                  value={newPassword}
                  valueAgain={confNewPassword}
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
                <Button type="submit" color="primary" variant="defaultButton" disabled={disableBtn} fullWidth>Continue</Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </>
  );
}
