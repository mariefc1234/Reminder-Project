/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Menu.css';
import iconImg from '../../../img/logo.png';

function Menu() {
  const navigate = useNavigate();
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };
  return (
    <header>
      <div className="logo">
        <a href="/#" onClick={() => navigate('/')}><img src={iconImg} alt="Logo" /></a>
        <a href="/#" className="logo-text" onClick={() => navigate('/')}>Reminder for your life</a>
      </div>
      <button type="button" className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
      <nav ref={navRef}>
        <a href="/#">Healthy Tips</a>
        <a href="/#">About Us</a>
        <a href="/#">Contact Us</a>
        <a href="#" className="btn-signin" onClick={() => navigate('/signin')}>Sign In</a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar} type="button">
          <FaTimes />
        </button>
      </nav>
    </header>
  );
}
export default Menu;
