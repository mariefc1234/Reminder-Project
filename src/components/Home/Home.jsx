/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import homeImg from '../../img/home.png';
import Menu from '../Utilities/Menu/Menu';

export function Home() {
  const navigate = useNavigate();
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
          <a href="#" className="btn-getstarted" onClick={() => navigate('/signup')}>Get started</a>
        </div>
        <div className="right-home">
          <img src={homeImg} alt="Home" className="homeImage" />
        </div>
      </div>
    </div>
  );
}
