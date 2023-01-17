import { useEffect, useState } from 'react';

export const useCurrencyChartData = (dataSet) => {
  const [chartData, setChartData] = useState(null);
  const [ratesArray, setRatesArray] = useState(null);

  useEffect(() => {
    if (!dataSet) {
      return;
    }
    let ratesArray = [];
    let decreases = 0;
    let increases = 0;
    let unchanged = 0;
    dataSet.rates.forEach(({ mid }, index) => {
      ratesArray.push(mid);
      if (
        index > 0 &&
        dataSet.rates[index].mid === dataSet.rates[index - 1].mid
      ) {
        unchanged += 1;
      } else if (index > 0 && dataSet.rates[index - 1].mid > mid) {
        decreases += 1;
      } else if (index > 0 && dataSet.rates[index - 1].mid < mid) {
        increases += 1;
      }
    });

    const newChartsData = [
      {
        Wzrosty: increases,
        'Bez zmian': unchanged,
        Spadki: decreases,
      },
    ];
    setRatesArray(ratesArray);
    setChartData(newChartsData);
  }, [dataSet]);

  return { chartData, ratesArray };
};
