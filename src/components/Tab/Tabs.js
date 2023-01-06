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
  let medianTab = [];
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
      })
      apiResponseData.rates.forEach(({ mid }) => {
        medianTab.push(mid);
        
      });
      function median(numbers) {
        // Posortuj tablicę rosnąco
        numbers.sort(function(a, b) {
          return a - b;
        });
      
        // Oblicz indeks środkowego elementu
        var middleIndex = Math.floor(numbers.length / 2);
      
        // Jeśli długość tablicy jest nieparzysta, zwróć element pośrodku tablicy
        if (numbers.length % 2 !== 0) {
          return numbers[middleIndex];
        }
        // W przeciwnym razie oblicz średnią arytmetyczną elementów pośrodku tablicy
        else {
          return (numbers[middleIndex - 1] + numbers[middleIndex]) / 2;
        }
      }
      var medianValue = median(medianTab);
      var cell = document.getElementById('mediana');
      var value = medianValue;
      cell.textContent = value;
      var cell = document.getElementById('days');
      var value = timeInterval;
      cell.textContent = value;

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
            <td>ilość dni</td>
            <td>Mediana</td>
            <td>Dominata</td>
            <td>Odchylenie standardowe</td>
            <td>Współczynnik zmienności</td>
          </tr>
          <tr>
            <td id = "days"></td>
            <td id = "mediana">Column 2, Row 2</td>
            <td>Column 3, Row 2</td>
            <td>Column 4, Row 2</td>
            <td>Column 5, Row 2</td>
          </tr>
        </table>
        
      </div >
      
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
