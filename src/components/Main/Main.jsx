/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { context } from '../../context/authContext';
import { useFetchGet } from '../../hooks/useFetchGet';
import UserMenu from '../Utilities/Menu/UserMenu';
import TabReminder from '../ConfigureReminder/TabReminder';
import TabStats from '../Stats/TabStats';
import TabToDo from '../ToDos/TabToDo';

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
        <Tabs value={tabValue} onChange={handleTabs} centered>
          <Tab label="Reminder" />
          <Tab label="Stats" />
          <Tab label="To Do" />
        </Tabs>
        <TabReminder value={tabValue} index={0}>Item detail 1</TabReminder>
        <TabStats value={tabValue} index={1}>Item detail 2 </TabStats>
        <TabToDo value={tabValue} index={2}>tab To dos </TabToDo>
      </div>
    );
}
