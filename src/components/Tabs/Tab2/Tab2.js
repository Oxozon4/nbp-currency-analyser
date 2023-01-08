import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import SelectCurrency from '../../SelectCurrency/SelectCurrency';
import CurrencyBarChart from '../../CurrencyBarChart/CurrencyBarChart';
import './Tab2.scss';

const Tab2 = ({ setIsLoading }) => {
  const [timeInterval, setTimeInterval] = useState(7);
  const [firstSelectedCurrency, setFirstSelectedCurrency] = useState('USD');
  const [secondSelectedCurrency, setSecondSelectedCurrency] = useState('EUR');
  const [firstCurrencyApiResponseData, setFirstCurrencyApiResponseData] =
    useState(null);
  const [secondCurrencyApiResponseData, setSecondCurrencyApiResponseData] =
    useState(null);
  const [chartData, setChartData] = useState(null);

  const getUrl = (currencyCode) => {
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
    const url = `//api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/${previousDateString}/${todayDateString}/`;
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
    setIsLoading(false);
    return data;
  };

  const getAllCurrencyData = () => {
    setIsLoading(true);
    setFirstCurrencyApiResponseData(getCurrencyData(firstSelectedCurrency));
    setSecondCurrencyApiResponseData(getCurrencyData(secondSelectedCurrency));
  };

  useEffect(() => {
    getAllCurrencyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstCurrencyApiResponseData && secondCurrencyApiResponseData) {
      console.log(firstCurrencyApiResponseData);
      console.log(secondCurrencyApiResponseData);
    }
  }, [
    firstCurrencyApiResponseData,
    secondCurrencyApiResponseData,
    timeInterval,
  ]);

  return (
    <div className="tab2">
      <div className="search-bar">
        <div className="time-interval-div">
          <label htmlFor="time-interval-selector">Przedział czasowy:</label>
          <select
            id="time-interval-selector"
            onChange={(e) => setTimeInterval(e.target.value)}
          >
            <option value="30">1 miesiąc</option>
            <option value="90">1 kwartał</option>
          </select>
        </div>
        <SelectCurrency
          order="1"
          name="select-currency"
          value={firstSelectedCurrency}
          onChange={setFirstSelectedCurrency}
        />
        <SelectCurrency
          order="2"
          name="select-currency-2nd"
          value={secondSelectedCurrency}
          onChange={setSecondSelectedCurrency}
        />
        <button
          onClick={(e) => getAllCurrencyData(e)}
          className="tab-content1-button"
        >
          Szukaj
        </button>
      </div>
      <CurrencyBarChart data={chartData} />
    </div>
  );
};

Tab2.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default Tab2;
