/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export default function BarChart(props) {
  const { todayStats } = props;
  const [accepted, setAccepted] = useState(todayStats.accepted);
  console.log(todayStats);

  useEffect(() => {
    console.log(todayStats);
    if (todayStats !== undefined) {
      console.log(todayStats);
      setAccepted(todayStats.accepted);
      console.log(accepted);
    }
  }, []);

  return (
    <div className="container-fluid mb-3">
      <h2>Stacked bar chart in react using apexcharts</h2>
      <Chart
        type="bar"
        width={1000}
        height={560}
        series={[
                {
                    name: 'Hydro-Electric',
                    data: [345, 578, 898, 532, 465],
                    // color: '#f90000'
                },
                {
                    name: 'Oil',
                    data: [125, 178, 338, 587, 276],
                    // color: '#000000'
                },
                {
                    name: 'Gas',
                    data: [355, 458, 218, 587, 229],
                    // color: '#000000'
                },
                {
                    name: 'Coal',
                    data: [190, 321, 112, 537, 333],
                    // color: '#000000'
                },
                {
                    name: 'Nuclear',
                    data: [560, 121, 675, 907, 233],
                    // color: '#000000'
                },
            ]}
        options={{
                    title: {
                        text: 'Enegry Consumption in Years',
                    },
                    chart: {
                        stacked: true,
                    },
                    stroke: {
                        width: 1,
                    },
                    xaxis: {
                        title: {
                            text: "Energy Consumption in Year's",
                        },
                        categories: ['2017', '2018', '2019', '2020', '2021'],
                    },
                    yaxis: {
                        title: {
                            text: 'Data in (K)',
                        },
                    },
                    legend: {
                        position: 'bottom',
                    },
                    dataLabels: {
                        enabled: true,
                    },
                    grid: {
                        show: true,
                        xaxis: {
                            lines: {
                                show: false,
                            },
                        },
                        yaxis: {
                            lines: {
                                show: false,
                            },
                        },

                    },

                }}
      />
    </div>
  );
}
