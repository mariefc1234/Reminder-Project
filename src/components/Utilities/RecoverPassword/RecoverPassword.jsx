/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PasswordChecklist from 'react-password-checklist';
import Menu from '../Menu/Menu';
import './RecoverPassword.css';

export function RecoverPassword() {
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);
  return (
    <div className="recover-password-container">
      <Menu />
      <div className="recover-password-center">
        <h3 className="recover-password-title">Recover Password</h3>
        <div className="recover-password-input-box">
          <label htmlFor="password" className="recover-password-label">Enter your new password</label>
          <input type="password" placeholder="Confirm password" id="password" name="password" className="signup-input" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="recover-password-input-box">
          <label htmlFor="confPassword" className="recover-password-label">Confirm password</label>
          <input type="password" placeholder="Confirm password" id="confPassword" name="confPassword" className="signup-input" onChange={(e) => setPasswordAgain(e.target.value)} required />
        </div>
        <PasswordChecklist
          className="pw-list"
          rules={['minLength', 'lowercase', 'specialChar',
                        'number', 'capital', 'match']}
          minLength={8}
          value={password}
          valueAgain={passwordAgain}
          onChange={(isValid) => {
              if (isValid) {
                setDisableBtn(false);
              } else {
                setDisableBtn(true);
              }
            }}
        />
        <input type="submit" value="Change Password" className="recover-password-btn" disabled={disableBtn} />
      </div>
    </div>
  );
}
