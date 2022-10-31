/* eslint-disable no-useless-return */
/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { context } from '../../context/authContext';
import { useFetchGet } from '../../hooks/useFetchGet';
import { Loading } from '../Utilities/Loading/Loading';

export function Main() {
    const authContext = useContext(context);
    const navigate = useNavigate();

    const { data, loading, error } = useFetchGet('http://localhost:8080/api/user', authContext.token);

    useState(() => {
      if (data == null)
        return;

      if (data.userData.isregistered === 0) {
        navigate('/userinforegister');
      }
    }, [data]);

    return (
      <div>
        {
          (loading)
          ? <Loading />
          : `bienvenido: ${data.userData.username}`
        }
      </div>
    );
}
