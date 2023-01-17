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
  return (
    <div className="bar-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 15 }}>
            {variant !== 'primary' && (
              <Label value={title} position="insideBottom" offset={-15} />
            )}
          </XAxis>
          <YAxis
            tickFormatter={variant !== 'primary' ? (value) => `${value}%` : ''}
          >
            {variant === 'primary' && (
              <Label
                value="Ilość sesji zmian walutowych"
                position="outside"
                angle="-90"
              />
            )}
          </YAxis>
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
