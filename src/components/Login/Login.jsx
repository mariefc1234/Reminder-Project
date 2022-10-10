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
        const isLogged = json.data.logged;
        // eslint-disable-next-line no-console
        console.log(json);
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
      <h1>¡Bienvenido!</h1>
      <form method="post">
        <div className="txt_field">
          <input type="text" name="email" id="email" required />
          <label> Correo Electrónico</label>
        </div>
        <div className="txt_field">
          <input type="password" name="password" id="password" required />
          <label>Contraseña</label>
        </div>
        <div className="pass">¿Olvidaste la contraseña?</div>
        <input type="submit" value="Login" />
        <div className="signup_link">
          Aún no eres miembro?
          <a href="#"> Regístrate</a>
        </div>
      </form>
    </div>
  );
}
