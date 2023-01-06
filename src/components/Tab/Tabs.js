import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SelectCurrency from '../SelectCurrency/SelectCurrency';
import CurrencyBarChart from '../CurrencyBarChart/CurrencyBarChart';
import './Tabs.scss';

const Tabs = ({ setIsLoading }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [timeInterval, setTimeInterval] = useState(7);
  const [currencyCode] = useState('USD');
  const [currencyValue, setCurrencyValue] = useState(0);
  const [apiResponseData, setApiResponseData] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [chartData, setChartData] = useState(null);

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
        'Wystąpił problem przy pobieraniu danych! Spróbuj ponownie później!'
      );
    }
    const data = await response.json();
    setApiResponseData(data);
    setCurrencyValue(data.rates[data.rates.length - 1].mid.toFixed(2));
    toast.success('Dane pobrane pomyślnie!', { id: 'test' });
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
      let decreases = 0;
      let increases = 0;
      let unchanged = 0;
      apiResponseData.rates.forEach(({ mid }) => {
        if (defaultValue === mid) {
          unchanged += 1;
        } else if (defaultValue > mid) {
          decreases += 1;
        } else if (defaultValue < mid) {
          increases += 1;
        }
      });
      decreases = 500;
      increases = 2000;
      unchanged = 100;
      const newChartsData = {
        name: 'Ilość sesji zmian walutowych',
        Wzrosty: increases,
        'Bez zmian': unchanged,
        Spadki: decreases,
      };
      setChartData(newChartsData);
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
            tabIndex === 0 ? 'tabs-list-header_active' : ''
          }`}
          onClick={() => setTabIndex(0)}
        >
          Analiza waluty
        </div>
        <div
          className={`tabs-list-header ${
            tabIndex === 1 ? 'tabs-list-header_active' : ''
          }`}
          onClick={() => setTabIndex(1)}
        >
          Rozkład zmian par walutowych
        </div>
      </div>
      <div
        data-testid="tab-content1"
        className={`tabs-content ${
          tabIndex === 0 ? 'tabs-content_active' : ''
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
        <SelectCurrency
          name="select-currency"
          value={selectedCurrency}
          onChange={setSelectedCurrency}
        />
        <button
          onClick={(e) => getCurrencyData(e)}
          className="tab-content1-button"
        >
          Oblicz
        </button>
        <CurrencyBarChart data={chartData} />
        tabela wyników
        <table>
          <tr>
            <td>/</td>
            <td>Mediana</td>
            <td>Dominata</td>
            <td>Odchylenie standardowe</td>
            <td>Współczynnik zmienności</td>
          </tr>
          <tr>
            <td>1 tydzień</td>
            <td>Column 2, Row 2</td>
            <td>Column 3, Row 2</td>
            <td>Column 4, Row 2</td>
            <td>Column 5, Row 2</td>
          </tr>
          <tr>
            <td>2 tygodnie</td>
            <td>Column 2, Row 3</td>
            <td>Column 3, Row 3</td>
            <td>Column 4, Row 3</td>
            <td>Column 5, Row 3</td>
          </tr>
          <tr>
            <td>1 miesiąc</td>
            <td>Column 2, Row 4</td>
            <td>Column 3, Row 4</td>
            <td>Column 4, Row 4</td>
            <td>Column 5, Row 4</td>
          </tr>
          <tr>
            <td>1 kwartał</td>
            <td>Column 2, Row 5</td>
            <td>Column 3, Row 5</td>
            <td>Column 4, Row 5</td>
            <td>Column 5, Row 5</td>
          </tr>
          <tr>
            <td>Pół roku</td>
            <td>Column 2, Row 6</td>
            <td>Column 3, Row 6</td>
            <td>Column 4, Row 6</td>
            <td>Column 5, Row 6</td>
          </tr>
          <tr>
            <td>Rok</td>
            <td>Column 2, Row 7</td>
            <td>Column 3, Row 7</td>
            <td>Column 4, Row 7</td>
            <td>Column 5, Row 7</td>
          </tr>
        </table>
      </div>
      <div
        data-testid="tab-content2"
        className={`tabs-content ${
          tabIndex === 1 ? 'tabs-content_active' : ''
        }`}
      >
        Tab 2 content
      </div>
    </div>
  );
};

export default Tabs;
