/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-spacing */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { context } from '../context/authContext';

export const PublicRoutes = ({children}) => {
    const authContext = useContext(context);
    return (authContext.logged)
    ? <Navigate to="/main" />
    : children;
};
