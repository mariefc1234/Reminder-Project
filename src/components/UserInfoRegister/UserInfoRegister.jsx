import React, { useContext, useState } from 'react';
import {
  Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid,
  InputAdornment, InputLabel, Radio, RadioGroup, TextField, Typography,
} from '@mui/material';
import UserMenu from '../Utilities/Menu/UserMenu';
import { useForm } from '../../hooks/useForm';
import { context } from '../../context/authContext';

export function UserInfoRegister() {
  const authContext = useContext(context);
  const [genre, setGender] = React.useState('');
  const [activity, setActivity] = React.useState('');
  const [weightError, setWeightError] = useState(false);
  const [heightError, setHeightError] = useState(false);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const initialForm = {
    weight: 0,
    height: 0,
  };
  const [formValues, handleInputChange] = useForm(initialForm);
  const {
    weight, height,
  } = formValues;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (weight === 0) {
      setWeightError(true);
    }
    if (height === 0) {
      setHeightError(true);
    }
    if (activity && weight && height && activity) {
      const res = await fetch('http://localhost:8080/api/auth/registerdata', {
        method: 'POST',
        body: JSON.stringify({
        weight,
        height,
        genre,
        activity,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8', authtoken: authContext.token },
      });
      const resJSON = await res.json();

      const isRegistered = resJSON.ok;

      if (isRegistered) {
        window.location.href = '/main';
      }
    }
  };

  return (
    <div>
      <UserMenu />
      <Grid>
        <Card style={{ maxWidth: 650, padding: '20px 5px', margin: '0 auto' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" align="center" sx={{ fontWeight: '500' }}> Tell us more about you </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor="weight">Weight*</InputLabel>
                  <TextField
                    fullWidth
                    id="weight"
                    name="weight"
                    helperText="Please select your weight"
                    type="number"
                    onChange={handleInputChange}
                    error={weightError}
                    InputProps={{
                      inputProps: { max: 200, min: 1 },
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
                    helperText="Please select your height"
                    type="number"
                    onChange={handleInputChange}
                    error={heightError}
                    InputProps={{
                      inputProps: { max: 200, min: 1 },
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
                      value={genre}
                      onChange={handleGenderChange}
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
                      onChange={handleActivityChange}
                    >
                      <FormControlLabel value="0" control={<Radio />} label="I don't exercise" />
                      <FormControlLabel value="2" control={<Radio />} label="Twice a week" />
                      <FormControlLabel value="3" control={<Radio />} label="Three or more times per week" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Button fullWidth type="submit" variant="defaultButton" onClick={handleSubmit}>Continue</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
