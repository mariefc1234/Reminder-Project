/* eslint-disable no-loop-func */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';
import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { context } from '../context/authContext';
import { getSeconds } from '../helpers/getSeconds';
import { useFetchGet } from '../hooks/useFetchGet';

export function ProtectedRoutes({ children }) {
    const authContext = useContext(context);
    const [activeHours, setActiveHours] = useState([]);
    const { data, loading } = useFetchGet('http://localhost:8080/api/hours', authContext.token);

    const notify = () => {
        const houract = dayjs().format('HH:mm:ss');
        const second = getSeconds(houract);
        // eslint-disable-next-line prefer-const
        let b = 0;
        let i = 0;
        while (b === 0) {
            if (activeHours.length === 0) {
                b = 1;
            }
            console.log(activeHours);
            if (activeHours[i].seconds > second) {
                setTimeout(() => {
                    console.log(activeHours[i]);
                    setActiveHours(activeHours.shift());
                    if (activeHours.length > 0) {
                        notify();
                    }
                }, second - activeHours[i].seconds);
            } else {
                // eslint-disable-next-line no-plusplus
                i++;
                setActiveHours(activeHours.shift());
            }
        }
    };

    useEffect(() => {
        if (!loading) {
            setActiveHours(541);
            console.log(data.data.reminders);
            console.log(activeHours);
            notify();
        }
    }, [loading]);

    return (authContext.logged)
    ? children
    : <Navigate to="/signin" />;
}
