/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../context/authContext';
import { getSeconds } from '../../helpers/getSeconds';
import { useFetchGet } from '../../hooks/useFetchGet';
import Notification from './Notification';

export function Notify() {
    const authContext = useContext(context);
    const [announcementDialog, setAnnouncementDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    const { data, loading } = useFetchGet('http://localhost:8080/api/hours', authContext.token);
    const [isOpen, setIsOpen] = useState(true);

    const acceptReminder = async (idReminder) => {
        await fetch(`http://localhost:8080/api/stat/${idReminder}`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8', authtoken: authContext.token },
        });
    };

    const alert = (reminder) => {
        setIsOpen(true);
        setAnnouncementDialog({
            isOpen,
            title: reminder.name,
            onConfirm: () => {
                setAnnouncementDialog({
                    ...announcementDialog,
                    isOpen: false,
                });
                acceptReminder(reminder.idReminder);
            },
        });
        setTimeout(() => {
            setAnnouncementDialog({
                        ...announcementDialog,
                        isOpen: false,
                    });
            }, 5000);
        };

    const alerts = (reminders = []) => {
        const houract = dayjs().format('HH:mm:ss');
        const seconds = getSeconds(houract);
        const secondsReminder = reminders[0].seconds;

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
      <Notification announcementDialog={announcementDialog} setAnnouncementDialog={setAnnouncementDialog} />
    );
}
