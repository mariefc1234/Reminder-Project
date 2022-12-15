/* eslint-disable no-loop-func */
/* eslint-disable arrow-body-style */
import dayjs from 'dayjs';
import React, { useContext, useEffect } from 'react';
import { context } from '../../context/authContext';
import { getSeconds } from '../../helpers/getSeconds';
import { useFetchGet } from '../../hooks/useFetchGet';

export function Notify() {
    const authContext = useContext(context);
    const { data, loading } = useFetchGet('http://localhost:8080/api/hours', authContext.token);

    const alert = (reminder) => {
        console.log(reminder);
    };

    const alerts = (reminders = []) => {
        const houract = dayjs().format('HH:mm:ss');
        const seconds = getSeconds(houract);
        const secondsReminder = reminders[0].seconds;

        // console.log(seconds, secondsReminder);

        if (seconds >= secondsReminder) {
            reminders.shift();
            if (reminders.length > 0) {
                alerts(reminders);
            }
        } else {
            const miliseconds = (secondsReminder - seconds) * 1000;
            setTimeout(() => {
                alert(reminders[0]);
                reminders.shift();
                if (reminders.length > 0) {
                    alerts(reminders);
                }
            }, miliseconds);
        }
    };

    useEffect(() => {
        if (!loading) {
            if (data.data.reminders.length > 0) { alerts(data.data.reminders); }
        }
    }, [loading]);

    return (
      <div />
    );
}
