/* eslint-disable react/react-in-jsx-scope */
import { TfiFaceSad } from 'react-icons/tfi';
import notfoundImg from '../../../img/404Error.jpg';
import './NotFound.css';

export function NotFound() {
    return (
      <div className="not-found-container">
        <img src={notfoundImg} alt="Yellow and funny face" className="not-found-image" />
        <TfiFaceSad className="not-found-icon" />
        <p className="not-found-text">404</p>
        <p className="not-found-text">Page not found</p>
      </div>
    );
}
