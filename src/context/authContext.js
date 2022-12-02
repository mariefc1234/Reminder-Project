/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from 'react';

export const context = createContext();

export function AuthProvider({ children }) {
    const [logged, setLogged] = useState(false);
    const [token, setToken] = useState(false);

    useEffect(() => {
      if (token) {
        localStorage.setItem('token', token);
      }
    }, [token]);
    return (
      <context.Provider value={{
 logged, setLogged, token, setToken,
}}
      >
        {children}
      </context.Provider>
    );
}
