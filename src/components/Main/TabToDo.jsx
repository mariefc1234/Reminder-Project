/* eslint-disable react/prop-types */
import {
  Button, Paper, Stack, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

// const todos = [
//   { id: 1, title: 'Drink water', date: '2022-05-21 23:00', status: 'completed' },
//   { id: 2, title: 'gfdljghfdgg', date: '2022-03-25 07:50', status: 'incompleted' },
// ];

export default function TabToDo(props) {
  const { value, index } = props;

  return (
    <div>
      {
      value === index && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h3">To Do List</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} mb={1} style={{ width: '90%' }} display="flex" justifyContent="space-between">
            <Button variant="defaultButton">Create</Button>
            <Button variant="defaultButton">S or t</Button>
          </Stack>
          <Paper
            elevation={0}
            sx={{
            width: '90%', backgroundColor: '#ecedf6', borderRadius: '12px', p: 2,
            }}
          >
            <Paper elevation={0} style={{ width: '90%', backgroundColor: 'white', borderRadius: '10px' }}>
              <Typography>To Do List</Typography>
            </Paper>
          </Paper>
        </Box>
      )
    }
    </div>
  );
}
