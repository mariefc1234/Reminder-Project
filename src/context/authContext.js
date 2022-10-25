/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const context = createContext();

export function AuthProvider({ children }) {
    const [logged, setLogged] = useState(false);
    return (
      <context.Provider value={{ logged, setLogged }}>
        {children}
      </context.Provider>
    );
}
