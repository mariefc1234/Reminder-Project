import React from 'react';
import Menu from '../Menu/Menu';
import emailConfirmedImg from '../../../img/emailConf.jpg';
import './EmailConfirmed.css';

export function EmailConfirmed() {
  return (
    <div className="email-confirmed-container">
      <Menu />
      <div className="email-confirmed-center">
        <img src={emailConfirmedImg} alt="Yellow and funny face" className="email-confirmed-image" />
        <p className="email-confirmed-text">Email Confirmed</p>
        <button className="email-confirmed-button" type="button">Go back</button>
      </div>
    </div>
  );
}
