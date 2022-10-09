import React, { useContext } from 'react';
import { context } from '../../context/authContext';
import './Login.css'
import { useForm } from '../../hooks/useForm';

export const Login = () => {
    const authContext = useContext(context);
    const initialForm = {
        email: '',
        password: '',
    };
    const [ formValues, handleInputChange, reset ] = useForm( initialForm );

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/api/auth', {
        method: 'POST',
        body: JSON.stringify({
            email: formValues.email,
            password:  formValues.password
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(json => {
        let isLogged = json.ok;
        console.log(json)
        if(isLogged){
            authContext.setLogged(true);
        }
        else{
            alert("usuario no existe")
        }
    })
    }
  return (
    <>
        <div className="login">
            <h1>Login</h1>
            <form method="post">
                <input type="text" onChange={handleInputChange} name="email" placeholder="email" required="required" />
                <input type="password" onChange={handleInputChange} name="password" placeholder="Password" required="required" />
                <button type="submit" onClick={handleLogin} class="btn btn-primary btn-block btn-large">Let me in.</button>
            </form>
        </div>
    </>
  )
}
