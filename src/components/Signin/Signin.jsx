/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { context } from '../../context/authContext';
import './Signin.css';
import { useForm } from '../../hooks/useForm';
import Menu from '../Utilities/Menu/Menu';
import { useFetchPost } from '../../hooks/useFetchPost';

export function Signin() {
  const authContext = useContext(context);
  const initialForm = {
      email: '',
      password: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
      email: formValues.email,
      password: formValues.password,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    const resJSON = await res.json();
    const isLogged = resJSON.userData.logged;
    if (isLogged) {
      authContext.setLogged(true);
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
    <div className="signin-wrapper">
      <Menu />
      <div className="signin-body-container">
        <form action="#" className="signin-form">
          <div className="signin-title">
            <label>Welcome!</label>
            <div className="signin-title-divider" />
          </div>
          <div className="signin-input-box">
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="Email" id="email" className="signin-input" name="email" onChange={handleInputChange} required />
          </div>
          <div className="signin-input-box">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" className="signin-input" name="password" onChange={handleInputChange} required />
          </div>
          <div className="forgot-password">Forgot Password?</div>
          <div className="signup-button">
            <input type="submit" value="Login" onClick={handleLogin} />
          </div>
          <div className="signup_link">
            Not a member?
            <a href="#"> Sign up now</a>
          </div>
        </form>
      </div>
    </div>
  );
}
