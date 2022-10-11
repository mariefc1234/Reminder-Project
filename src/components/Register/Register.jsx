/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Register.css';
// eslint-disable-next-line import/prefer-default-export
export function Register() {
  return (
    <div className="container">
      <div className="title">Crear cuenta</div>
      <form action="#">
        <div className="user-details">
          <div className="input-box-one">
            <span className="details">Correo Electrónico</span>
            <input type="text" placeholder="Ingresa tu correo electrónico" required />
          </div>
          <div className="input-box">
            <span className="details">Contraseña</span>
            <input type="password" placeholder="Contraseña" required />
          </div>
          <div className="input-box">
            <span className="details">Confirma la contraseña</span>
            <input type="password" placeholder="Confirma la contraseña" required />
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Crear Cuenta" />
        </div>
      </form>
    </div>
  );
}
