import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './CurrencyBarChart.scss';

const CurrencyBarChart = ({ data, variant }) => {
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
          <XAxis dataKey="name" tick={{ fontSize: 15 }} />
          <YAxis />
          <Tooltip />
          {variant === 'primary' ? (
            <>
              <Bar dataKey="Wzrosty" fill="#1ED760" />
              <Bar dataKey="Bez zmian" fill="#8b919d" />
              <Bar dataKey="Spadki" fill="#cb0029" />
            </>
          ) : (
            <>
              <Bar name="" dataKey="data" fill="#1ED760" />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrencyBarChart;
