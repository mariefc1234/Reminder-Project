import { Button } from '@mui/material';
import React from 'react';
import addNotification from 'react-push-notification';
import logo from '../../../img/logo.png';

export default function Notification() {
  const clickOnNotify = () => {
    addNotification({
      title: 'Success',
      message: 'This is a success notification',
      duration: 3000,
      icon: logo,
      native: true,
      // eslint-disable-next-line no-return-assign
      onClick: () => window.location = 'https://github.com/mariefc1234/GestorHorarios-Cliente/blob/main/Proyecto%20Cliente/Cliente/S-AdministrarGrupo.xaml',
    });
  };

  return (
    <Button onClick={clickOnNotify}> click to notify</Button>
  );
}
