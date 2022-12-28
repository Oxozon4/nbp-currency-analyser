import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [exchangeRate, setExchangeRate] = useState(0);

  async function getExchangeRate() {
    const response = await fetch(
      "https://api.nbp.pl/api/exchangerates/rates/a/usd/last/7"
    );
    const data = await response.json();
    setExchangeRate(data.rates[0].mid);
  }

  useEffect(() => {
    getExchangeRate();
  }, []);

  console.log(exchangeRate);

  return (
    <div className="App">
      <a
        className="link"
        href="http://api.nbp.pl/"
        target="_blank"
        rel="noopener noreferrer"
      >
        API NBP
      </a>
      <div>Aktualny kurs dolara: {exchangeRate} zł</div>
    </div>
  );
}

export default App;
