/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import './Signup.css';
import Swal from 'sweetalert2';
import Menu from '../Utilities/Menu/Menu';
import { useForm } from '../../hooks/useForm';
import { context } from '../../context/authContext';

// eslint-disable-next-line import/prefer-default-export
export function Signup() {
  const authContext = useContext(context);
  const initialForm = {
    username: '',
    email: '',
    password: '',
    confPassword: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    const resJSON = await res.json();
    console.log(resJSON);
    const isRegistered = resJSON.token;
    if (isRegistered) {
      authContext.setLogged(true);
      authContext.setToken(resJSON.token);
    } else {
      // eslint-disable-next-line no-alert
      Swal.fire({
        title: 'Error',
        text: 'Incorrect Credentials',
        icon: 'error',
      });
    }
  };
  return (
    <div className="signup-wrapper">
      <Menu />
      <div className="signup-body-container">
        <form action="#" className="signup-form">
          <div className="signup-title">
            <label>Create Account</label>
            <div className="signup-title-divider" />
          </div>
          <div className="signup-input-box">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" id="username" name="username" className="signup-input" onChange={handleInputChange} required />
          </div>
          <div className="signup-input-box">
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="Email" id="email" name="email" className="signup-input" onChange={handleInputChange} required />
          </div>
          <div className="signup-input-box">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" name="password" className="signup-input" onChange={handleInputChange} required />
          </div>
          <div className="signup-input-box">
            <label htmlFor="confPass">Confirm password</label>
            <input type="password" placeholder="Confirm password" id="confPass" name="confPassword" className="signup-input" onChange={handleInputChange} required />
          </div>
          <div className="signup-button">
            <input type="submit" value="Create Account" onClick={handleRegister} />
          </div>
        </form>
      </div>
    </div>
  );
}
