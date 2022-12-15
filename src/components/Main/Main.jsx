/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { context } from '../../context/authContext';
import { useFetchGet } from '../../hooks/useFetchGet';
import UserMenu from '../Utilities/Menu/UserMenu';
import TabReminder from '../ConfigureReminder/TabReminder';
import TabToDo from '../ToDos/TabToDo';
import { Notify } from '../Notify/Notify';

export function Main() {
    const authContext = useContext(context);
    const navigate = useNavigate();

    const { data } = useFetchGet('http://localhost:8080/api/user', authContext.token);

    useEffect(() => {
      if (data) {
        if (data.data.emailconfirmed === 0) {
          navigate('/pleaseconfirmmail');
        } else if (data.data.isregistered === 0) {
          navigate('/userinforegister', { replace: true });
        }
      }
    }, [data]);

    const [tabValue, setTabValue] = useState(0);
    const handleTabs = (e, val) => {
      setTabValue(val);
    };
    return (
      <div>
        <UserMenu />
        <Notify />
        <Tabs value={tabValue} onChange={handleTabs} centered>
          <Tab label="Reminder" />
          <Tab label="To Do" />
        </Tabs>
        <TabReminder value={tabValue} index={0}>Item detail 1</TabReminder>
        <TabToDo value={tabValue} index={1}>tab To dos </TabToDo>
      </div>
    );
}
