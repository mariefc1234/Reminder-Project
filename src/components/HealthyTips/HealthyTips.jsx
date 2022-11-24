/* eslint-disable no-unused-vars */
import { Container } from '@mui/system';
import React from 'react';
import GeneralMenu from '../Utilities/Menu/GeneralMenu';
import HealthyCard from './HealthyCard';

const facts = [
  { id: 1, description: 'Drinking at least five glasses of water a day can reduce your chances of suffering from a heart attack by 40%.', ref: '/healthytips' },
  { id: 2, description: 'Dehydration can have a negative impact on your mood and energy levels. Drink enough water to ensure you’re always at your best.', ref: '/aboutus' },
  { id: 3, description: 'Consuming water helps the body maintain its natural pH balance.', ref: '/contactus' },
  { id: 4, description: 'Repeatedly using a plastic water bottle can release chemicals into your water. Why not try a reusable bottle instead? It’s good for you and the planet.', ref: '/signin' },
];

export function HealthyTips() {
  return (
    <div>
      <GeneralMenu />
      <Container>
        <HealthyCard
          key={1}
          name="fhkdsjfdslk"
        />
        <HealthyCard />
      </Container>
    </div>
  );
}
