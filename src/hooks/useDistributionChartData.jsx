import { useEffect, useState } from 'react';

export const useDistributionChartData = (firstDataSet, secondDataSet) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!firstDataSet || !secondDataSet) {
      return;
    }

    const firstRatesArray = [];
    const secondRatesArray = [];
    const dividedValuesArray = [];
    const result = [];

    // fill arrays with each currency values
    firstDataSet.rates.forEach(({ mid }) => {
      firstRatesArray.push(mid);
    });
    secondDataSet.rates.forEach(({ mid }) => {
      secondRatesArray.push(mid);
    });
    firstRatesArray.forEach((firstRate, index) => {
      dividedValuesArray.push(firstRate / secondRatesArray[index]);
    });

    // fill result array
    dividedValuesArray.forEach((value, index, array) => {
      const currentCurrencyPrice = array[index];
      const previousCurrencyPrice = array[index + 1];
      const currencyChange =
        (currentCurrencyPrice - previousCurrencyPrice) / previousCurrencyPrice;
      if (typeof currencyChange === 'number' && !Number.isNaN(currencyChange)) {
        result.push(currencyChange);
      }
    });
    const maxValue = Math.max(...result);
    const minValue = Math.min(...result);
    const numberOfBars = Math.round(Math.sqrt(result.length));
    const barLength = (maxValue - minValue) / numberOfBars;
    const ranges = [];
    const percentArray = [];

    // fill ranges array
    for (let i = 0; i < numberOfBars; i += 1) {
      if (i === 0) {
        ranges.push({
          firstValue: minValue,
          secondValue: minValue + barLength,
        });
      } else {
        ranges.push({
          firstValue: ranges[i - 1].secondValue,
          secondValue: ranges[i - 1].secondValue + barLength,
        });
      }
      percentArray[i] = 0;
    }

    // fill percentArray
    result.forEach((value, index, array) => {
      ranges.forEach((range, rIndex, rArray) => {
        if (value >= range.firstValue && value < range.secondValue) {
          percentArray[rIndex] += 1;
        }
      });
    });

    // let partialSum;
    const sum = percentArray.reduce((partialSum, a) => partialSum + a, 0);
    const newChartData = [];
    percentArray.forEach((element, index) => {
      newChartData.push({
        name: `(${ranges[index].firstValue.toFixed(4)}, ${ranges[
          index
        ].secondValue.toFixed(4)}) pip`,
        data: (element / sum) * 100,
      });
    });

    setChartData(newChartData);
  }, [firstDataSet, secondDataSet]);

  return chartData;
};
