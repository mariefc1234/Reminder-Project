/* eslint-disable react/react-in-jsx-scope */
import { Grid, Typography } from '@mui/material';
import notfoundImg from '../../../img/404Error.jpg';

export function NotFound() {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >
          <img src={notfoundImg} alt="Yellow and funny face" style={{ height: '40vh', width: '40vh' }} />
          <Typography variant="h4" mt={2} style={{ fontSize: '2rem' }}>404</Typography>
          <Typography variant="h4" style={{ fontSize: '2rem' }}>Page not found</Typography>
        </Grid>
      </div>
    );
}
