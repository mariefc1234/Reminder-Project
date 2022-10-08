import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
export const context = createContext();

export function AuthProvider ({children}) {
    const [logged, setLogged] = useState(false)
    return (
        <context.Provider value={{logged, setLogged}}>
            {children}
        </context.Provider>
    )
}
