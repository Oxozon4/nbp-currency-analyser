import { useState } from 'react';
import './Tabs.scss';

const Tabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  function handleChange(event) {
    console.log(event.target.value);
  }
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
        Tab 1 content1
        <div>
      <label htmlFor="time-period-selector">Wybierz przedział czasowy:</label>
      <select id="time-period-selector" onChange={handleChange}>
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
          tabIndex === 1 ? 'tabs-content_active' : ''
        }`}
      >
        Tab 2 content
      </div>
    </div>
  );
};

export default Tabs;
