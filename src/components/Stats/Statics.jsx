import { Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { context } from '../../context/authContext';
import { useFetchGet } from '../../hooks/useFetchGet';
import UserMenu from '../Utilities/Menu/UserMenu';

export function Statics() {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get('id');

  const authContext = useContext(context);
  const urlReminder = `https://reminder.herokuapp.com/api/stat/${id}`;
  const { data } = useFetchGet(urlReminder, authContext.token);

  const [todayStats, setTodayStats] = useState([]);
  const [weekStats, setWeekStats] = useState([]);
  const [monthStats, setMonthStats] = useState([0, 0]);

  useEffect(() => {
    if (data) {
      const auxToday = [data.data.today.accepted, data.data.today.goal - data.data.today.accepted];
      const auxWeek = [data.data.week.accepted, data.data.week.goal - data.data.week.accepted];
      const auxMonth = [data.data.week.accepted, data.data.week.goal - data.data.week.accepted];
      setTodayStats(auxToday);
      setWeekStats(auxWeek);
      setMonthStats(auxMonth);
      }
  }, [data]);
  return (
    <div>
      <UserMenu />
      <Grid container mt={5}>
        {
          (todayStats[0] === 0)
          ? <Typography>Sorry, you dont have statics</Typography>
          : (
            <Grid item xs={12} md={4}>
              <Chart
                type="pie"
                series={todayStats}
                options={{
                    title: {
                        text: 'Today Stats',
                    },
                    noData: { text: 'No data' },
                    labels: ['Accepted', 'No accepted'],
                  }}
              />
            </Grid>
          )
        }
        {
          (weekStats[0] === 0)
          ? <div />
          : (
            <Grid item xs={12} md={4}>
              <Chart
                type="pie"
                series={weekStats}
                options={{
                    title: {
                        text: 'Week Stats',
                    },
                    noData: { text: 'No data' },
                    labels: ['Accepted', 'No accepted'],
                  }}
              />
            </Grid>
          )
        }
        {
          (monthStats[0] === 0)
          ? <div />
          : (
            <Grid item xs={12} md={4}>
              <Chart
                type="pie"
                series={monthStats}
                options={{
                    title: {
                        text: 'Months Stats',
                    },
                    noData: { text: 'No data' },
                    labels: ['Accepted', 'No accepted'],
                  }}
              />
            </Grid>
          )
        }
      </Grid>
    </div>
  );
}
