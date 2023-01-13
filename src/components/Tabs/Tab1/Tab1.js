import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
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
  const [apiResponseData, setApiResponseData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const daysTableCell = useRef(null);
  const ratesArrayleCell = useRef(null);
  const dominantTableCell = useRef(null);
  const standardDeviationTableCell = useRef(null);
  const coefficientVariationTableCell = useRef(null);

  const getUrl = () => {
    const today = new Date();
    const todayDateString = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const previousDate = new Date(
      today.setDate(today.getDate() - timeInterval)
    );
    const previousDateString = `${previousDate.getFullYear()}-${String(
      previousDate.getMonth() + 1
    ).padStart(2, '0')}-${String(previousDate.getDate()).padStart(2, '0')}`;
    const url = `//api.nbp.pl/api/exchangerates/rates/a/${selectedCurrency}/${previousDateString}/${todayDateString}/`;
    return url;
  };

  const getCurrencyData = async () => {
    const url = getUrl();
    const response = await fetch(url);
    if (!response.ok) {
      toast.error(
        'Wystąpił problem przy pobieraniu danych! Spróbuj ponownie później!',
        { toastId: 'data-fail' }
      );
    }
    const data = await response.json();
    setApiResponseData(data);
    toast.success('Dane pobrane pomyślnie!', { toastId: 'data-success' });
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getCurrencyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (apiResponseData) {
      console.log(apiResponseData);
      const defaultValue = apiResponseData.rates[0].mid;
      let ratesArray = [];
      let decreases = 0;
      let increases = 0;
      let unchanged = 0;
      apiResponseData.rates.forEach(({ mid }) => {
        ratesArray.push(mid);
        if (defaultValue === mid) {
          unchanged += 1;
        } else if (defaultValue > mid) {
          decreases += 1;
        } else if (defaultValue < mid) {
          increases += 1;
        }
      });

      daysTableCell.current.textContent = timeInterval;
      ratesArrayleCell.current.textContent = getMedian(ratesArray);
      dominantTableCell.current.textContent = getDominant(ratesArray);
      standardDeviationTableCell.current.textContent =
        getStandardDeviation(ratesArray);
      coefficientVariationTableCell.current.textContent =
        getCoefficientOfVariation(ratesArray);

      const newChartsData = [
        {
          name: 'Ilość sesji zmian walutowych',
          Wzrosty: increases,
          'Bez zmian': unchanged,
          Spadki: decreases,
        },
      ];
      setChartData(newChartsData);
    }
  }, [apiResponseData, timeInterval]);

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
              <option value={value}>{value}</option>
            ))}
          </select>
        </div>
        <button
          onClick={(e) => getCurrencyData(e)}
          className="tab-content1-button"
        >
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
