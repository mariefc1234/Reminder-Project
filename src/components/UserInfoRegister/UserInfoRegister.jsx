/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import './UserInfoRegister.css';
import Menu from '../Utilities/Menu/Menu';

export function UserInfoRegister() {
  return (
    <div className="userinfo-wrapper">
      <Menu />
      <div className="userinfo-body-container">
        <form action="#" className="userinfo-form">
          <div className="userinfo-title">
            <label>Tell us more about you</label>
            <div className="userinfo-title-divider" />
          </div>
          <div className="userinfo-input-box">
            <label htmlFor="weight">Weight</label>
            <input type="text" placeholder="Weight" id="weight" className="userinfo-input" required />
          </div>
          <div className="userinfo-input-box">
            <label htmlFor="height">Height</label>
            <input type="text" placeholder="Height" id="height" className="userinfo-input" required />
          </div>
          <div className="selection-details">
            <span className="selection-title">Gender</span>
            <input type="radio" name="selection" id="dot-l" />
            <input type="radio" name="selection" id="dot-2" />
            <input type="radio" name="selection" id="dot-3" />
            <div className="category">
              <label htmlFor="dot-l">
                <span className="dot one" />
                <span className="selection">Male</span>
              </label>
              <label htmlFor="dot-2">
                <span className="dot two" />
                <span className="selection">Female</span>
              </label>
              <label htmlFor="dot-3">
                <span className="dot three" />
                <span className="selection">Dont specify</span>
              </label>
            </div>
          </div>
          <div className="selection-details">
            <span className="selection-title">How often do you exercise?</span>
            <input type="radio" name="selection" id="dot-4" />
            <input type="radio" name="selection" id="dot-5" />
            <input type="radio" name="selection" id="dot-6" />
            <input type="radio" name="selection" id="dot-7" />
            <div className="category">
              <label htmlFor="dot-4">
                <span className="dot four" />
                <span className="selection">I do not exercise</span>
              </label>
              <label htmlFor="dot-6">
                <span className="dot six" />
                <span className="selection">Twice a week</span>
              </label>
              <label htmlFor="dot-7">
                <span className="dot seven" />
                <span className="selection">Three or more times per week</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
