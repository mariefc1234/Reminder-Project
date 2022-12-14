/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-loop-func */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */

import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { context } from '../context/authContext';

export function ProtectedRoutes({ children }) {
    const authContext = useContext(context);

    return (authContext.logged)
    ? children
    : <Navigate to="/signin" />;
}
