/* eslint-disable import/no-import-module-exports */
import { useContext } from 'react';
import { context } from '../context/authContext';

export const forceLogout = () => {
  const authContext = useContext(context);
  localStorage.clear();
  authContext.setToken(false);
  authContext.setLogged(false);
};
