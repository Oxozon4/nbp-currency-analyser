import { useState, useEffect } from "react";
import "./Tabs.scss";

const Tabs = ({ setIsLoading }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [timeInterval, setTimeInterval] = useState(7);
  const [currencyCode] = useState("USD");
  const [currencyValue, setCurrencyValue] = useState(0);
  const [apiResponseData, setApiResponseData] = useState(null);
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
    }
  }, [apiResponseData]);

  useEffect(() => {
    console.log(timeInterval);
  }, [timeInterval]);

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
        
  <table>
    <tr>
      <td>Column 1, Row 1</td>
      <td>Column 2, Row 1</td>
      <td>Column 3, Row 1</td>
      <td>Column 4, Row 1</td>
    </tr>
    <tr>
      <td>Column 1, Row 2</td>
      <td>Column 2, Row 2</td>
      <td>Column 3, Row 2</td>
      <td>Column 4, Row 2</td>
    </tr>
    <tr>
      <td>Column 1, Row 3</td>
      <td>Column 2, Row 3</td>
      <td>Column 3, Row 3</td>
      <td>Column 4, Row 3</td>
    </tr>
    <tr>
      <td>Column 1, Row 4</td>
      <td>Column 2, Row 4</td>
      <td>Column 3, Row 4</td>
      <td>Column 4, Row 4</td>
    </tr>
    <tr>
      <td>Column 1, Row 5</td>
      <td>Column 2, Row 5</td>
      <td>Column 3, Row 5</td>
      <td>Column 4, Row 5</td>
    </tr>
    <tr>
      <td>Column 1, Row 6</td>
      <td>Column 2, Row 6</td>
      <td>Column 3, Row 6</td>
      <td>Column 4, Row 6</td>
    </tr>
  </table>


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
