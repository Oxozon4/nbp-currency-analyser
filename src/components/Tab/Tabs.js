import { useState, useEffect } from "react";
import "./Tabs.scss";

const Tabs = ({ setIsLoading }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [timeInterval, setTimeInterval] = useState(7);
  const [currencyCode] = useState("USD");
  const [currencyValue, setCurrencyValue] = useState(0);
  const [apiResponseData, setApiResponseData] = useState(null);
  // const url = `//api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/{today-timeInterval}/{today}/`;
  const url = `//api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/last/${timeInterval}`;

  useEffect(() => {
    const getCurrencyData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setApiResponseData(data);
      setCurrencyValue(data.rates[timeInterval - 1].mid);
      setIsLoading(false);
    };
    setIsLoading(true);
    getCurrencyData();
  }, [timeInterval, setIsLoading, url]);

  useEffect(() => {
    if (apiResponseData) {
      console.log(apiResponseData);
      getDate();
    }
  }, [apiResponseData]);

  useEffect(() => {
    console.log(timeInterval);
  }, [timeInterval]);

  const getDate = () => {
    let today = new Date();
    let dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    console.log(dateString);
  }

  return (
    <div className="tabs">
      <div className="tabs-list">
        <div
          className={`tabs-list-header ${
            tabIndex === 0 ? "tabs-list-header_active" : ""
          }`}
          onClick={() => setTabIndex(0)}
        >
          Analiza waluty
        </div>
        <div
          className={`tabs-list-header ${
            tabIndex === 1 ? "tabs-list-header_active" : ""
          }`}
          onClick={() => setTabIndex(1)}
        >
          Rozkład zmian par walutowych
        </div>
      </div>
      <div
        data-testid="tab-content1"
        className={`tabs-content ${
          tabIndex === 0 ? "tabs-content_active" : ""
        }`}
      >
        <div>
          Aktualny kurs {currencyCode}: {currencyValue} zł
        </div>
        <div>
          <label htmlFor="time-interval-selector">
            Wybierz przedział czasowy:
          </label>
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
      </div>
      <div
        data-testid="tab-content2"
        className={`tabs-content ${
          tabIndex === 1 ? "tabs-content_active" : ""
        }`}
      >
        Tab 2 content
      </div>
    </div>
  );
};

export default Tabs;
