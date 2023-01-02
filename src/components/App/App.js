import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import Tabs from '../Tab/Tabs';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currency] = useState('usd');
  const [days] = useState(7);
  const [currencyValue, setCurrencyValue] = useState(0);
  const [apiResponseData, setApiResponseData] = useState(null);

  const url = `//api.nbp.pl/api/exchangerates/rates/a/${currency}/last/${days}`;

  // onload
  useEffect(() => {
    const getCurrencyData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setApiResponseData(data);
      setCurrencyValue(data.rates[days - 1].mid);
      setIsLoading(false);
    };
    setIsLoading(true);
    getCurrencyData();
  }, [days, url]);

  useEffect(() => {
    if (apiResponseData) {
      console.log(apiResponseData);
    }
  }, [apiResponseData]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="app">
        <a
          className="app-link"
          href="http://api.nbp.pl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          API NBP
        </a>
        <div>
          Uwaga! Aktualny kurs {currency}: {currencyValue} zł
        </div>
        <Tabs />
      </div>
    </>
  );
};

export default App;
