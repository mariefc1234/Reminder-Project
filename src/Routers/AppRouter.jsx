import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefaultTheme } from '../components/Utilities/Theme/DefaultTheme';
import { Signin } from '../components/Signin/Signin';
import { Home } from '../components/Home/Home';
import { AuthProvider } from '../context/authContext';
// import { ModalProvider } from '../context/modalContext';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';
import { Main } from '../components/Main/Main';
import { Signup } from '../components/Signup/Signup';
import { UserInfoRegister } from '../components/UserInfoRegister/UserInfoRegister';
import { ForgotPassword } from '../components/ForgotPassword/ForgotPassword';
import { ConfigureReminder } from '../components/ConfigureReminder/ConfigureReminder';
import { AboutUs } from '../components/AboutUs/AboutUs';
import { ContactUs } from '../components/ContactUs/ContactUs';
import { HealthyTips } from '../components/HealthyTips/HealthyTips';

export function AppRouter() {
    return (
      <ThemeProvider theme={DefaultTheme}>
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
                path="/userinforegister"
                element={(
                  <ProtectedRoutes>
                    <UserInfoRegister />
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
                path="/forgotpassword"
                element={(
                  <PublicRoutes>
                    <ForgotPassword />
                  </PublicRoutes>
                            )}
              />
              <Route
                path="/configurereminder"
                element={(
                  <PublicRoutes>
                    <ConfigureReminder />
                  </PublicRoutes>
                            )}
              />
              <Route
                path="/contactus"
                element={(
                  <PublicRoutes>
                    <ContactUs />
                  </PublicRoutes>
                            )}
              />
              <Route
                path="/aboutus"
                element={(
                  <PublicRoutes>
                    <AboutUs />
                  </PublicRoutes>
                            )}
              />
              <Route
                path="/healthytips"
                element={(
                  <PublicRoutes>
                    <HealthyTips />
                  </PublicRoutes>
                            )}
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    );
}
