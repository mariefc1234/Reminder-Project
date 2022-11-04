/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import Menu from '../Utilities/Menu/Menu';
import reminderImg from '../../img/glass.jpeg';
import './ConfigureReminder.css';

export function ConfigureReminder() {
  return (
    <div className="configure-reminder-container">
      <Menu />
      <div className="configure-reminder-center">
        <h1 className="configure-reminder-title">Configure reminder</h1>
        <div className="configure-reminder-input-box">
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Title" id="title" className="configure-reminder-input" required />
        </div>
        <div className="configure-reminder-input-box">
          <label htmlFor="start-hour">Start hour</label>
          <input type="text" placeholder="Start hour" id="start-hour" className="configure-reminder-input" required />
        </div>
        <div className="configure-reminder-input-box">
          <label htmlFor="end-hour">End hour</label>
          <input type="text" placeholder="End hour" id="end-hour" className="configure-reminder-input" required />
        </div>
        <div className="configure-reminder-input-box">
          <label htmlFor="loop">Loop</label>
          <input type="text" placeholder="Loop" id="loop" className="configure-reminder-input" required />
        </div>
        <div className="configure-reminder-image-box">
          <label htmlFor="configure-reminder-image">Configure image</label>
          <img src={reminderImg} alt="Graphic representation for the reminder" id="configure-reminder-image" className="configure-reminder-image" />
        </div>
        <button className="configure-reminder-btn" type="button">Reset Password</button>
      </div>
    </div>
  );
}
