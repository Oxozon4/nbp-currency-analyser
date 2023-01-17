import { useState, useMemo, useEffect } from 'react';
import { useApi } from '../../../hooks/useApi';
import { useDistributionChartData } from '../../../hooks/useDistributionChartData';
import PropTypes from 'prop-types';
import CurrencyBarChart from '../../CurrencyBarChart/CurrencyBarChart';
import DatePicker from 'react-datepicker';
import { availableCurrencies } from '../../../helpers/constants';
import { registerLocale } from 'react-datepicker';
import './Tab2.scss';
import 'react-datepicker/dist/react-datepicker.css';
import pl from 'date-fns/locale/pl';

registerLocale('pl', pl);

const Tab2 = ({ setIsLoading }) => {
  const [timeInterval, setTimeInterval] = useState(90);
  const [firstSelectedCurrency, setFirstSelectedCurrency] = useState('USD');
  const [secondSelectedCurrency, setSecondSelectedCurrency] = useState('EUR');
  const maxDate = useMemo(() => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - timeInterval);
    return maxDate;
  }, [timeInterval]);
  const [startDate, setStartDate] = useState(maxDate);
  const {
    responseData: firstCurrencyApiResponseData,
    callApi: callFirstCurrencyApi,
  } = useApi(firstSelectedCurrency, timeInterval, setIsLoading, startDate);
  const {
    responseData: secondCurrencyApiResponseData,
    callApi: callSecondCurrencyApi,
  } = useApi(secondSelectedCurrency, timeInterval, setIsLoading, startDate);
  const chartData = useDistributionChartData(
    firstCurrencyApiResponseData,
    secondCurrencyApiResponseData
  );
  const chartLabel = useMemo(
    () => `Rozkład zmian ${firstSelectedCurrency} i ${secondSelectedCurrency}`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [firstCurrencyApiResponseData, secondCurrencyApiResponseData]
  );

  useEffect(() => {
    const onRefreshDataClickEvent = () => {
      callFirstCurrencyApi(firstSelectedCurrency, timeInterval, startDate);
      callSecondCurrencyApi(secondSelectedCurrency, timeInterval, startDate);
    };

    document.addEventListener('refreshAction', onRefreshDataClickEvent);

    return () => {
      document.removeEventListener('refreshAction', onRefreshDataClickEvent);
    };
  }, [
    firstSelectedCurrency,
    timeInterval,
    startDate,
    callFirstCurrencyApi,
    callSecondCurrencyApi,
    secondSelectedCurrency,
  ]);

  const onSearchButtonClickHandler = () => {
    callFirstCurrencyApi(firstSelectedCurrency, timeInterval, startDate);
    callSecondCurrencyApi(secondSelectedCurrency, timeInterval, startDate);
  };

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
          onClick={onSearchButtonClickHandler}
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
