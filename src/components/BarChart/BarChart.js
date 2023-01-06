import React from 'react';
import { Chart } from 'react-charts';
import './BarChart.scss';

const BarChart = (data) => {
  const newData = data || [
    {
      label: 'Series 1',
      data: [1, 2, 3, 4],
    },
    {
      label: 'Series 2',
      data: [5, 4, 3, 2, 1],
    },
  ];

  const series = {
    type: 'bar',
  };

  const axes = [
    { primary: true, type: 'ordinal', position: 'bottom' },
    { position: 'left', type: 'linear', stacked: false, show: false },
  ];

  return (
    <>
      <Chart data={newData} series={series} axes={axes} />
    </>
  );
};

export default BarChart;
