/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid,
  InputAdornment, InputLabel, Radio, RadioGroup, TextField, Typography,
} from '@mui/material';
import UserMenu from '../Utilities/Menu/UserMenu';
import { context } from '../../context/authContext';
import CustomAlert from '../Utilities/Dialogs/CustomAlert';
import AnnouncementDialog from '../Utilities/Dialogs/AnnouncementDialog';
import { useFetchGet } from '../../hooks/useFetchGet';

export default function ChangeUserInfo() {
  // const { userInfo } = params;
  const authContext = useContext(context);
  const { data } = useFetchGet('https://reminder.herokuapp.com/api/user/data', authContext.token);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = React.useState('');
  const [activity, setActivity] = React.useState('');
  const [alert, setAlert] = useState({ isOpen: false, message: '', severity: 'warning' });
  const [announcementDialog, setAnnouncementDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://reminder.herokuapp.com/api/user', {
      method: 'PATCH',
      body: JSON.stringify({
      weight,
      height,
      genre: gender,
      activity,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8', authtoken: authContext.token },
    });
    const resJSON = await res.json();

    const isUpdated = resJSON.ok;

    if (isUpdated) {
      setAnnouncementDialog({
        isOpen: true,
        title: 'Info Registered',
        onConfirm: () => { window.location.href = '/main'; },
      });
    }
  };

  useEffect(() => {
    if (data) {
      setWeight(data.data.weight);
      setHeight(data.data.height);
      setActivity(data.data.activity);
      setGender(data.data.genre);
      }
  }, [data]);

  return (
    <div>
      <UserMenu />
      <Grid>
        <Card style={{ maxWidth: 650, padding: '20px 5px', margin: '0 auto' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" align="center" sx={{ fontWeight: '500' }}> Tell us more about you </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor="weight">Weight*</InputLabel>
                  <TextField
                    fullWidth
                    id="weight"
                    value={weight}
                    name="weight"
                    helperText="Please select your weight"
                    type="number"
                    onChange={(newValue) => {
                      setWeight(newValue.target.value);
                    }}
                    InputProps={{
                      inputProps: { max: 200, min: 25 },
                      startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor="height">Height*</InputLabel>
                  <TextField
                    fullWidth
                    id="height"
                    name="height"
                    value={height}
                    helperText="Please select your height"
                    type="number"
                    onChange={(newValue) => {
                      setHeight(newValue.target.value);
                    }}
                    InputProps={{
                      inputProps: { max: 210, min: 130 },
                      startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="gender-radio-buttons-group">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="gender-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={gender}
                      onChange={(newValue) => {
                        setGender(newValue.target.value);
                      }}
                    >
                      <FormControlLabel value="F" control={<Radio />} label="Female" />
                      <FormControlLabel value="M" control={<Radio />} label="Male" />
                      <FormControlLabel value="O" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="activity-radio-buttons-group">How often do you exercise?</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="activity-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={activity}
                      onChange={(newValue) => {
                        setActivity(newValue.target.value);
                      }}
                    >
                      <FormControlLabel value="0" control={<Radio />} label="I don't exercise" />
                      <FormControlLabel value="2" control={<Radio />} label="Twice a week" />
                      <FormControlLabel value="3" control={<Radio />} label="Three or more times per week" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Button fullWidth type="submit" variant="defaultButton">Continue</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <CustomAlert alert={alert} setAlert={setAlert} />
      <AnnouncementDialog
        announcementDialog={announcementDialog}
        setAnnouncementDialog={setAnnouncementDialog}
      />
    </div>
  );
}
