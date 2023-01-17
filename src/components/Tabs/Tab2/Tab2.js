import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import CurrencyBarChart from '../../CurrencyBarChart/CurrencyBarChart';
import DatePicker from 'react-datepicker';
import { availableCurrencies } from '../../../helpers/constants';
import { toast } from 'react-toastify';
import { registerLocale } from 'react-datepicker';
import './Tab2.scss';
import 'react-datepicker/dist/react-datepicker.css';
import pl from 'date-fns/locale/pl';

const Tab2 = ({ setIsLoading }) => {
  const [timeInterval, setTimeInterval] = useState(90);
  const [firstSelectedCurrency, setFirstSelectedCurrency] = useState('USD');
  const [secondSelectedCurrency, setSecondSelectedCurrency] = useState('EUR');
  const [firstCurrencyApiResponseData, setFirstCurrencyApiResponseData] =
    useState(null);
  const [secondCurrencyApiResponseData, setSecondCurrencyApiResponseData] =
    useState(null);
  const [chartData, setChartData] = useState(null);
  const maxDate = useMemo(() => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - timeInterval);
    return maxDate;
  }, [timeInterval]);
  const [startDate, setStartDate] = useState(maxDate);
  const chartLabel = useMemo(
    () => `Rozkład zmian ${firstSelectedCurrency} i ${secondSelectedCurrency}`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [firstCurrencyApiResponseData, secondCurrencyApiResponseData]
  );
  registerLocale('pl', pl);

  const getUrl = (currencyCode) => {
    let startDateClone = new Date(startDate.getTime());

    const previousDate = new Date(
      startDateClone.setDate(startDateClone.getDate())
    );
    const previousDateString = `${previousDate.getFullYear()}-${String(
      previousDate.getMonth() + 1
    ).padStart(2, '0')}-${String(previousDate.getDate()).padStart(2, '0')}`;
    startDateClone = new Date(startDate.getTime());
    const toDate = new Date(
      startDateClone.setDate(startDateClone.getDate() + Number(timeInterval))
    );
    const toDateString = `${toDate.getFullYear()}-${String(
      toDate.getMonth() + 1
    ).padStart(2, '0')}-${String(toDate.getDate()).padStart(2, '0')}`;
    const url = `//api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/${previousDateString}/${toDateString}/`;
    return url;
  };

  const getCurrencyData = async (currencyCode) => {
    const url = getUrl(currencyCode);
    const response = await fetch(url);
    if (!response.ok) {
      toast.error(
        'Wystąpił problem przy pobieraniu danych! Spróbuj ponownie później!',
        { toastId: 'data-fail' }
      );
    }
    const data = await response.json();
    toast.success('Dane pobrane pomyślnie!', { toastId: 'data-success' });
    if (currencyCode === firstSelectedCurrency) {
      setFirstCurrencyApiResponseData(data);
    } else if (currencyCode === secondSelectedCurrency) {
      setSecondCurrencyApiResponseData(data);
      setIsLoading(false);
    }
  };

  const getAllCurrencyData = () => {
    setIsLoading(true);
    getCurrencyData(firstSelectedCurrency);
    getCurrencyData(secondSelectedCurrency);
  };

  useEffect(() => {
    getAllCurrencyData();

    document.addEventListener('refreshAction', getAllCurrencyData);

    return () => {
      document.removeEventListener('refreshAction', getAllCurrencyData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!firstCurrencyApiResponseData || !secondCurrencyApiResponseData) {
      return;
    }

    const firstRatesArray = [];
    const secondRatesArray = [];
    // fill arrays with each currency values
    firstCurrencyApiResponseData.rates.forEach(({ mid }) => {
      firstRatesArray.push(mid);
    });
    secondCurrencyApiResponseData.rates.forEach(({ mid }) => {
      secondRatesArray.push(mid);
    });

    const dividedValuesArray = [];
    firstRatesArray.forEach((firstRate, index) => {
      dividedValuesArray.push(firstRate / secondRatesArray[index]);
    });

    const result = [];
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
  }, [
    firstCurrencyApiResponseData,
    secondCurrencyApiResponseData,
    timeInterval,
  ]);

  return (
    <div className="tab2">
      <div className="search-bar">
        <div className="select-currency select-currency_0">
          <label htmlFor="date-picker-selector">Wybierz dzień</label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            locale="pl"
            maxDate={maxDate}
            id="date-picker-selector"
          />
        </div>
        <div className="time-interval-div">
          <label htmlFor="time-interval-selector">Przedział czasowy:</label>
          <select
            id="time-interval-selector"
            onChange={(e) => setTimeInterval(e.target.value)}
            value={timeInterval}
          >
            <option value="30">1 miesiąc</option>
            <option value="90">1 kwartał</option>
          </select>
        </div>
        <div className="select-currency select-currency_1">
          <label htmlFor="select-currency-selector">Waluta 1:</label>
          <select
            id="select-currency-selector"
            onChange={(e) => setFirstSelectedCurrency(e.target.value)}
            value={firstSelectedCurrency}
          >
            {availableCurrencies
              .filter((value) => value !== secondSelectedCurrency)
              .map((value) => (
                <option key={`option-${value}`} value={value}>
                  {value}
                </option>
              ))}
          </select>
        </div>
        <div className="select-currency select-currency_2">
          <label htmlFor="select-currency-selector">Waluta 2:</label>
          <select
            id="select-currency-selector"
            onChange={(e) => setSecondSelectedCurrency(e.target.value)}
            value={secondSelectedCurrency}
          >
            {availableCurrencies
              .filter((value) => value !== firstSelectedCurrency)
              .map((value) => (
                <option key={`option-${value}-2`} value={value}>
                  {value}
                </option>
              ))}
          </select>
        </div>
        <button
          onClick={(e) => getAllCurrencyData(e)}
          className="tab-content1-button"
        >
          Szukaj
        </button>
      </div>
      <CurrencyBarChart
        data={chartData}
        variant="secondary"
        title={chartLabel}
      />
    </div>
  );
};

Tab2.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default Tab2;
