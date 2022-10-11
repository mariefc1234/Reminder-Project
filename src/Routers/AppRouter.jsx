/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../components/Login/Login';
import { Home } from '../components/Home/Home';
import { AuthProvider, context } from '../context/authContext';
// import { ModalProvider } from '../context/modalContext';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';
import { Main } from '../components/Main/Main';
import { Register } from '../components/Register/Register';
import { UserInfoForm } from '../components/UserInfoForm/UserInfoForm';

export function AppRouter() {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/main"
              element={(
                <ProtectedRoutes>
                  <Main />
                </ProtectedRoutes>
                )}
            />
            <Route
              path="/"
              element={(
                <PublicRoutes>
                  <Home />
                </PublicRoutes>
              )}
            />
            <Route
              path="/login"
              element={(
                <PublicRoutes>
                  <Login />
                </PublicRoutes>
              )}
            />
            <Route
              path="/register"
              element={(
                <PublicRoutes>
                  <Register />
                </PublicRoutes>
                          )}
            />
            <Route
              path="/userinfoform"
              element={(
                <PublicRoutes>
                  <UserInfoForm />
                </PublicRoutes>
                          )}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    );
}
