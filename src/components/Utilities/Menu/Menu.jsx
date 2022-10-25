/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Menu.css';
import iconImg from '../../../img/logo.png';

export function Menu() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };
  return (
    <header>
      <div className="logo">
        <a href="/#"><img src={iconImg} alt="Logo" /></a>
        <a href="/#" className="logo-text">Reminder for your life</a>
      </div>
      <button type="button" className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
      <nav ref={navRef}>
        <a href="/#">Healthy Tips</a>
        <a href="/#">About Us</a>
        <a href="/#">Contact Us</a>
        <a href="#" className="btn-signup">Sign up</a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar} type="button">
          <FaTimes />
        </button>
      </nav>
    </header>
    // <header>
    //   <div className="container">
    //     <nav ref={navRef}>
    //       <a href="/#">Healthy Tips</a>
    //       <a href="/#">About Us</a>
    //       <a href="/#">Contact Us</a>
    //       <a href="#" className="btn">Sign up</a>
    //       <button className="nav-btn nav-close-btn" onClick={showNavbar} type="button">
    //         <FaTimes />
    //       </button>
    //     </nav>
    //     <button className="nav-btn" onClick={showNavbar} type="button">
    //       <FaBars />
    //     </button>
    //   </div>
    // </header>
  );
}
