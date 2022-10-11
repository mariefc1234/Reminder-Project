/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import './UserInfoForm.css';

export function UserInfoForm() {
  return (
    <div className="container">
      <div className="title">Formulario</div>
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Nombre</span>
            <input type="text" placeholder="Ingresa tu nombre" required />
          </div>
          <div className="input-box">
            <span className="details">Apellido</span>
            <input type="text" placeholder="Ingresa tu apellido" required />
          </div>
          <div className="input-box">
            <span className="details">Peso</span>
            <input type="text" placeholder="Ingresa tu peso" required />
          </div>
          <div className="input-box">
            <span className="details">Estatura</span>
            <input type="text" placeholder="Ingresa tu estatura" required />
          </div>
        </div>
        <div className="selection-details">
          <span className="selection-title">Género</span>
          <input type="radio" name="selection" id="dot-l" />
          <input type="radio" name="selection" id="dot-2" />
          <input type="radio" name="selection" id="dot-3" />
          <div className="category">
            <label htmlFor="dot-l">
              <span className="dot one" />
              <span className="selection">Hombre</span>
            </label>
            <label htmlFor="dot-2">
              <span className="dot two" />
              <span className="selection">Mujer</span>
            </label>
            <label htmlFor="dot-3">
              <span className="dot three" />
              <span className="selection">No especificar</span>
            </label>
          </div>
        </div>
        <div className="selection-details">
          <span className="selection-title">¿Cuántas veces a la semana realiza actividad física?</span>
          <input type="radio" name="selection" id="dot-4" />
          <input type="radio" name="selection" id="dot-5" />
          <input type="radio" name="selection" id="dot-6" />
          <div className="category">
            <label htmlFor="dot-4">
              <span className="dot four" />
              <span className="selection">1 vez</span>
            </label>
            <label htmlFor="dot-5">
              <span className="dot five" />
              <span className="selection">2 veces</span>
            </label>
            <label htmlFor="dot-6">
              <span className="dot six" />
              <span className="selection">3 o más veces</span>
            </label>
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Crear Cuenta" />
        </div>
      </form>
    </div>
  );
}
