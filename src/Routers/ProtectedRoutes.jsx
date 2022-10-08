import React from 'react'
import { useContext } from 'react'
import { context } from '../context/authContext'
import { Navigate} from 'react-router-dom'

export const ProtectedRoutes = ({children}) => {
    const authContext = useContext(context)
    return (authContext.logged)
    ?children
    :<Navigate to='/'></Navigate>
}
