import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import GeneralMenu from '../Utilities/Menu/GeneralMenu';
import img from '../../img/aboutUs.png';

export function AboutUs() {
  return (
    <div>
      <GeneralMenu />
      <Container>
        <Grid container mt={3}>
          <Grid item xs={12} sm={12} md={12} lg={5}>
            <Typography variant="h1" align="center" fontSize="5rem">About</Typography>
            <Typography variant="h1" align="center" fontSize="5rem">Us</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={7}>
            <Typography fontSize="1.5rem">
              We are a company worried about your health, our compromise is make your life
              healthier and make your work easier.
              We are a company worried about your health and posture, our compromise is make
              your life healthier and your work easier.
            </Typography>
          </Grid>
          <Grid item mt={3} xs={12} display="flex" justifyContent="center" alignItems="center">
            <img src={img} alt="" style={{ width: '30vh' }} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
