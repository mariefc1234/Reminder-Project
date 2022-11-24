/* eslint-disable react/prop-types */
import React from 'react';

export default function TabStats(props) {
  const { value, index } = props;

  return (
    <div>
      {
      value === index && (
        <h1>stats</h1>
      )
    }
    </div>
  );
}
