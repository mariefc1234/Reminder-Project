/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import './Home.css';
import { FaBars, FaTimes, FaSun } from 'react-icons/fa';
import iconImg from '../../img/logo.png';
import homeImg from '../../img/home.png';

export function Home() {
  const [isLight, setisLight] = useState(true);
  const hangleLightChange = (e) => {
    e.preventDefault();
    setisLight(!(isLight));
  };

  const navRef = useState();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };
  return (
    <div>
      <div className={(isLight) ? 'big-wrapper light' : 'big-wrapper dark'}>
        <header>
          <div className="container">
            <div className="logo">
              <img src={iconImg} alt="Logo" />
              <h3>Reminder for your life</h3>
            </div>
            <nav ref={navRef}>
              <a href="/#">Home</a>
              <a href="/#">About Us</a>
              <a href="/#">Contact Us</a>
              <a href="#" className="btn">Sign up</a>
              <button className="nav-btn nav-close-btn" onClick={showNavbar} type="button">
                <FaTimes />
              </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar} type="button">
              <FaBars />
            </button>
          </div>
        </header>
        <div className="showcase-area">
          <div className="container">
            <div className="left">
              <div className="big-title">
                <h1>Reminder for your life,</h1>
                <h1>Reminder for your habits.</h1>
              </div>
              <p className="text">
                Take care of your health while you work!
              </p>
              <div className="button_div">
                <a href="#" className="btn">Get started</a>
              </div>
            </div>
            <div className="right">
              <img src={homeImg} alt="Home" className="homeImage" />
            </div>
          </div>
        </div>

        <div className="bottom-area">
          <div className="container">
            <button className="toggle-btn" type="button" onClick={hangleLightChange}>
              <FaSun className="far fa-sun" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
