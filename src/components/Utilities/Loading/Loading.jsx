/* eslint-disable react/react-in-jsx-scope */
import loadingImg from '../../../img/loading.png';
import './Loading.css';

export function Loading() {
    return (
      <div className="loading-container">
        <img src={loadingImg} alt="Yellow and funny face" className="loading-image" />
        <p className="loading-text">Loading...</p>
      </div>
    );
}
