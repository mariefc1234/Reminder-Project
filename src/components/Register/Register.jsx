/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Register.css';
// eslint-disable-next-line import/prefer-default-export
export function Register() {
  return (
    <div className="container">
      <div className="title">Create Account</div>
      <form action="#">
        <div className="user-details">
          <div className="input-box-one">
            <span className="details">Email</span>
            <input type="text" placeholder="Email" required />
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input type="password" placeholder="Password" required />
          </div>
          <div className="input-box">
            <span className="details">Confirm password</span>
            <input type="password" placeholder="Confirm password" required />
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Create Account" />
        </div>
      </form>
    </div>
  );
}
