/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, InputLabel, Radio, RadioGroup, TextField, Typography,
} from '@mui/material';
import UserMenu from '../Utilities/Menu/UserMenu';

export function UserInfoRegister() {
//   const initialForm = {
//     weight: '',
//     Heights: '',
// };
const navigate = useNavigate();

const [gender, setGender] = React.useState('');
const [activity, setActivity] = React.useState('');
const handleGenderChange = (event) => {
  setGender(event.target.value);
};
const handleActivityChange = (event) => {
  setActivity(event.target.value);
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
                    helperText="Please select your weight"
                    type="number"
                    InputProps={{
                      inputProps: { max: 200, min: 0 },
                      startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor="height">Height*</InputLabel>
                  <TextField
                    fullWidth
                    id="weight"
                    helperText="Please select your height"
                    type="number"
                    InputProps={{
                      inputProps: { max: 200, min: 0 },
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
                      onChange={handleGenderChange}
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
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
                      <FormControlLabel value="not" control={<Radio />} label="I don't exercise" />
                      <FormControlLabel value="twice" control={<Radio />} label="Twice a week" />
                      <FormControlLabel value="three" control={<Radio />} label="Three or more times per week" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Button fullWidth type="submit" onClick={() => navigate('/main')}>Continue</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
