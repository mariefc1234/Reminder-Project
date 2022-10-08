import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import { Login } from '../components/auth/Login'
//import { Home } from '../components/Home/Home'
import { AuthProvider, context } from '../context/authContext'
//import { ModalProvider } from '../context/modalContext'
import { ProtectedRoutes } from './ProtectedRoutes'
import { PublicRoutes } from './PublicRoutes'

export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path='/' element={
                            <ProtectedRoutes>
                                <Home />
                            </ProtectedRoutes>
                        } />
                        <Route path='/login' element={
                            <PublicRoutes>
                                <Login />
                            </PublicRoutes>
                        } />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}