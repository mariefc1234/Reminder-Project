/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signin } from '../components/Signin/Signin';
import { Home } from '../components/Home/Home';
import { AuthProvider, context } from '../context/authContext';
// import { ModalProvider } from '../context/modalContext';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';
import { Main } from '../components/Main/Main';
import { Signup } from '../components/Signup/Signup';
import { UserInfoRegister } from '../components/UserInfoRegister/UserInfoRegister';

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
              path="/signin"
              element={(
                <PublicRoutes>
                  <Signin />
                </PublicRoutes>
              )}
            />
            <Route
              path="/signup"
              element={(
                <PublicRoutes>
                  <Signup />
                </PublicRoutes>
                          )}
            />
            <Route
              path="/userinforegister"
              element={(
                <PublicRoutes>
                  <UserInfoRegister />
                </PublicRoutes>
                          )}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    );
}
