import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import './CurrencyBarChart.scss';

const CurrencyBarChart = ({ data, variant, title }) => {
  const chartData = data || [
    {
      Wzrosty: 4000,
      'Bez zmian': 2400,
      Spadki: 2400,
    },
  ];
  return (
    <div className="bar-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={chartData}>
          <XAxis dataKey="name" tick={{ fontSize: 15 }}>
            {variant !== 'primary' && (
              <Label value={title} position="insideBottom" offset={-15} />
            )}
          </XAxis>
          <YAxis
            tickFormatter={variant !== 'primary' ? (value) => `${value}%` : ''}
          />
          {variant === 'primary' ? (
            <>
              <Tooltip />
              <Bar dataKey="Wzrosty" fill="#1ED760" />
              <Bar dataKey="Bez zmian" fill="#8b919d" />
              <Bar dataKey="Spadki" fill="#cb0029" />
            </>
          ) : (
            <>
              <CartesianGrid />
              <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
              <Bar name="" dataKey="data" fill="#1ED760" />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrencyBarChart;
