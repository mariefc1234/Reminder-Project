/* eslint-disable no-unused-vars */
import {
 Box, Button, Grid, IconButton, Paper, Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import GeneralMenu from '../Utilities/Menu/GeneralMenu';
import HealthyCard from './HealthyCard';

const facts = [
  { id: 1, description: 'Drinking at least five glasses of water a day can reduce your chances of suffering from a heart attack by 40%.', img: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
  { id: 2, description: 'Dehydration can have a negative impact on your mood and energy levels. Drink enough water to ensure you’re always at your best.', img: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
  { id: 3, description: 'A lack of water can cause a range of problems, such as constipation, asthma, allergy and migraines.', img: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
  { id: 4, description: 'Repeatedly using a plastic water bottle can release chemicals into your water. Why not try a reusable bottle instead? It’s good for you and the planet.', img: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
  { id: 5, description: 'Water can aid in weight loss because it helps to remove the by-products of fat and if consumed before a meal can make you more satisfied and eat less.', img: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
  { id: 6, description: 'Breathing deeply in moments of stress, or anytime during the day, brings many benefits such as better circulation, decreased anxiety and reduced blood pressure.', img: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
  { id: 7, description: 'Maintaining good relationships with your friends and family, reduces harmful levels of stress and boosts your immune system.', img: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
  { id: 8, description: 'Although it only takes you a few minutes to eat a meal, it takes your body hours to completely digest the food.', img: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
  { id: 9, description: 'Sitting and sleeping are great in moderation, but too much can increase your chances of an early death.', img: 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png' },
];

export function HealthyTips() {
  return (
    <div>
      <GeneralMenu />
      <Grid container style={{ maxWidth: '90%', padding: '5px 5px', margin: '0 auto' }} spacing={1}>
        {facts.map((reminder) => (
          <Grid item xs={12} sm={12} md={4} key={reminder.id} display="flex">
            <Paper style={{ padding: '20px' }}>
              <Grid item>
                <Box>
                  <img alt="complex" width="100px" src={reminder.img} />
                </Box>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="body1" component="div">
                  {reminder.description}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
