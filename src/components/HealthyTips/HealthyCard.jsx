/* eslint-disable react/prop-types */
import {
  Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import React from 'react';
import img from '../../img/404Error.jpg';

export default function HealthyCard(props) {
  const {
    name,
  } = props;
  return (
    <Card>
      <CardMedia src={img} />
      <CardContent>
        <Typography component="p" variant="body2">{name}</Typography>
      </CardContent>
    </Card>
  );
}
