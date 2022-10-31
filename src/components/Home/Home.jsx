/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import './Home.css';
import homeImg from '../../img/home.png';
import Menu from '../Utilities/Menu/Menu';

export function Home() {
  return (
    <div className="home-container">
      <Menu />
      <div className="home-body-container">
        <div className="left-home">
          <div className="big-title-home">
            <h1>Reminder for your life,</h1>
            <h1>Reminder for your habits.</h1>
          </div>
          <p className="text-home">
            Take care of your health while you work!
          </p>
          <a href="#" className="btn-getstarted">Get started</a>
        </div>
        <div className="right-home">
          <img src={homeImg} alt="Home" className="homeImage" />
        </div>
      </div>
    </div>
  );
}
