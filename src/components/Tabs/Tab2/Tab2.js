import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import SelectCurrency from "../../SelectCurrency/SelectCurrency";
import CurrencyBarChart from "../../CurrencyBarChart/CurrencyBarChart";
import "./Tab2.scss";

const Tab2 = ({ setIsLoading }) => {
  const [timeInterval, setTimeInterval] = useState(7);
  const [firstSelectedCurrency, setFirstSelectedCurrency] = useState("USD");
  const [secondSelectedCurrency, setSecondSelectedCurrency] = useState("PLN");
  const [apiResponseData, setApiResponseData] = useState(null);
  const [currencyValue, setCurrencyValue] = useState(0);
  const [chartData, setChartData] = useState(null);

  const getUrl = () => {
    const today = new Date();
    const todayDateString = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const previousDate = new Date(
      today.setDate(today.getDate() - timeInterval)
    );
    const previousDateString = `${previousDate.getFullYear()}-${String(
      previousDate.getMonth() + 1
    ).padStart(2, "0")}-${String(previousDate.getDate()).padStart(2, "0")}`;
    const url = `//api.nbp.pl/api/exchangerates/rates/a/${firstSelectedCurrency}/${previousDateString}/${todayDateString}/`;
    return url;
  };

  const getCurrencyData = async () => {
    const url = getUrl();
    const response = await fetch(url);
    if (!response.ok) {
      toast.error(
        "Wystąpił problem przy pobieraniu danych! Spróbuj ponownie później!",
        { toastId: "data-fail" }
      );
    }
    const data = await response.json();
    setApiResponseData(data);
    setCurrencyValue(data.rates[data.rates.length - 1].mid.toFixed(2));
    toast.success("Dane pobrane pomyślnie!", { toastId: "data-success" });
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

      const newChartsData = [
        {
          name: "Ilość sesji zmian walutowych",
          Wzrosty: increases,
          "Bez zmian": unchanged,
          Spadki: decreases,
        },
      ];
      setChartData(newChartsData);
    }
  }, [apiResponseData, timeInterval]);

  return (
    <>
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
        <SelectCurrency
          name="select-currency"
          value={firstSelectedCurrency}
          onChange={setFirstSelectedCurrency}
        />
        <SelectCurrency
          name="select-currency-2nd"
          value={secondSelectedCurrency}
          onChange={setSecondSelectedCurrency}
        />
        <button
          onClick={(e) => getCurrencyData(e)}
          className="tab-content1-button"
        >
          Szukaj
        </button>
      </div>
      <div style={{ marginBottom: "40px" }}>
        Aktualny kurs {firstSelectedCurrency}: {currencyValue} zł
      </div>
      <CurrencyBarChart data={chartData} />
    </>
  );
};

Tab2.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default Tab2;
