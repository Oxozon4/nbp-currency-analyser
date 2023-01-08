import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './CurrencyBarChart.scss';

const CurrencyBarChart = ({ data }) => {
  const chartData = data || [
    {
      name: 'Ilość sesji zmian walutowych',
      Wzrosty: 4000,
      'Bez zmian': 2400,
      Spadki: 2400,
    },
  ];
  return (
    <div className="bar-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Wzrosty" fill="#1ED760" />
          <Bar dataKey="Bez zmian" fill="#8b919d" />
          <Bar dataKey="Spadki" fill="#cb0029" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrencyBarChart;
