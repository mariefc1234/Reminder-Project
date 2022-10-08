import React from 'react'
import './../Home/Home.css'

import iconImg from './../../img/icon.png'
import menuImg from './../../img/menu.svg'
import homeImg from './../../img/HomeImg.png'

export const Home = () => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg">
                
                <a className="navbar-brand navbar__logo" href="#">
                    <img src={iconImg}/>
                    <p className="navbar__logo__text">  Lifestyle Reminder </p>
                </a>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link" href="#">Pestaña 1</a>
                        <a className="nav-link" href="#">Pestaña 2</a>
                    </div>
                </div>
            
            </nav>
            
            <div className="info">
                
                <div className="info__text">
                    <h1 className="info__text__title"> Reminder </h1>
                    <h2 className="info__text__sub"> Cuida tu salud mientras trabajas </h2>
                    <p className="info__text__p">  Tu salud es importante, por eso es indispensable este reminder :) </p>
                    <input className="info__btn" type="button" value="Iniciar Sesion" />
                </div>

                

                <div className="info__img">
                    <img src={homeImg}/>
                </div>

            </div>

            <div className="circle"></div>
        </div>
    )
}
