import { useState, useEffect, useRef } from 'react';
import { useApi } from '../../../hooks/useApi';
import { useCurrencyChartData } from '../../../hooks/useCurrencyChartData';
import PropTypes from 'prop-types';
import CurrencyBarChart from '../../CurrencyBarChart/CurrencyBarChart';
import {
  getMedian,
  getDominant,
  getStandardDeviation,
  getCoefficientOfVariation,
} from '../../../helpers/statisticParameters';
import './Tab1.scss';
import { availableCurrencies } from '../../../helpers/constants';

const Tab1 = ({ setIsLoading }) => {
  const [timeInterval, setTimeInterval] = useState(7);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const { responseData, callApi } = useApi(
    selectedCurrency,
    timeInterval,
    setIsLoading,
    null
  );
  const { chartData, ratesArray } = useCurrencyChartData(responseData);
  const daysTableCell = useRef(null);
  const ratesArrayleCell = useRef(null);
  const dominantTableCell = useRef(null);
  const standardDeviationTableCell = useRef(null);
  const coefficientVariationTableCell = useRef(null);

  useEffect(() => {
    const onRefreshDataClickEvent = () => {
      callApi(selectedCurrency, timeInterval, null);
    };
    document.addEventListener('refreshAction', onRefreshDataClickEvent);

    return () => {
      document.removeEventListener('refreshAction', onRefreshDataClickEvent);
    };
  }, [callApi, selectedCurrency, timeInterval]);

  useEffect(() => {
    if (!ratesArray) {
      return;
    }
    daysTableCell.current.textContent = timeInterval;
    ratesArrayleCell.current.textContent = getMedian(ratesArray);
    dominantTableCell.current.textContent = getDominant(ratesArray);
    standardDeviationTableCell.current.textContent =
      getStandardDeviation(ratesArray);
    coefficientVariationTableCell.current.textContent =
      getCoefficientOfVariation(ratesArray);
  }, [ratesArray, timeInterval]);

  const onClickHandler = () => {
    callApi(selectedCurrency, timeInterval, null);
  };

  return (
    <div className="tab1">
      <div className="search-bar">
        <div className="time-interval-div">
          <label htmlFor="time-interval-selector">Przedział czasowy:</label>
          <select
            id="time-interval-selector"
            onChange={(e) => setTimeInterval(e.target.value)}
          >
            <option value="7">1 tydzień</option>
            <option value="14">2 tygodnie</option>
            <option value="30">1 miesiąc</option>
            <option value="90">1 kwartał</option>
            <option value="180">pół roku</option>
            <option value="365">1 rok</option>
          </select>
        </div>
        <div className="select-currency select-currency_1">
          <label htmlFor="select-currency-selector">Waluta:</label>
          <select
            id="select-currency-selector"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            {availableCurrencies.map((value) => (
              <option key={`option-${value}`} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <button onClick={onClickHandler} className="tab-content1-button">
          Szukaj
        </button>
      </div>
      <CurrencyBarChart data={chartData} variant="primary" />
      <span className="table-title">Parametry statystyczne</span>
      <table>
        <thead>
          <tr className="table-headers">
            <td>Ilość dni</td>
            <td>Mediana</td>
            <td>Dominanta</td>
            <td>Odchylenie standardowe</td>
            <td>Współczynnik zmienności</td>
          </tr>
        </thead>
        <tbody>
          <tr className="table-values">
            <td ref={daysTableCell} id="days">
              Fetching data...
            </td>
            <td ref={ratesArrayleCell} id="median">
              Fetching data...
            </td>
            <td ref={dominantTableCell} id="dominant">
              Fetching data...
            </td>
            <td ref={standardDeviationTableCell} id="standard-deviation">
              Fetching data...
            </td>
            <td
              ref={coefficientVariationTableCell}
              id="coefficient-of-variation"
            >
              Fetching data...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Tab1.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default Tab1;
