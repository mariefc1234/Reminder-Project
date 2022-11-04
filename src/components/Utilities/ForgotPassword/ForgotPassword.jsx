/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Menu from '../Menu/Menu';
import './ForgotPassword.css';

export function ForgotPassword() {
  return (
    <div className="forgot-password-container">
      <Menu />
      <div className="forgot-password-center">
        <h3 className="forgot-password-title">Forgot your password?</h3>
        <label htmlFor="recover-email" className="forgot-password-text">Enter your email</label>
        <input type="text" placeholder="Email" id="recover-email" className="forgot-password-input" name="email" required />
        <button className="forgot-password-btn" type="button">Reset Password</button>
      </div>
    </div>
  );
}
