/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import { context } from '../../context/authContext';
import './Login.css';
import { useForm } from '../../hooks/useForm';

export function Login() {
    const authContext = useContext(context);
    const initialForm = {
        email: '',
        password: '',
    };
    const [formValues, handleInputChange, reset] = useForm(initialForm);

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/auth', {
        method: 'POST',
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    .then((response) => response.json())
    .then((json) => {
        // eslint-disable-next-line no-console
        console.log(json);
        const isLogged = json.userData.logged;
        if (isLogged) {
            authContext.setLogged(true);
        } else {
             // eslint-disable-next-line no-alert
            alert('usuario no existe');
        }
    });
    };
  return (
    <div className="center">
      <h1>Sign In</h1>
      <form>
        <div className="txt_field">
          <input type="text" name="email" id="email" onChange={handleInputChange} required />
          <label>Email</label>
        </div>
        <div className="txt_field">
          <input type="password" name="password" id="password" onChange={handleInputChange} required />
          <label>Password</label>
        </div>
        <div className="pass">Forgot Password?</div>
        <input type="submit" value="Login" onClick={handleLogin} />
        <div className="signup_link">
          Not a member?
          <a href="#"> Sign up now</a>
        </div>
      </form>
    </div>
  );
}
