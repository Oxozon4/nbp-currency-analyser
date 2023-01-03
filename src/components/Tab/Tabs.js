import { useState } from 'react';
import './Tabs.scss';

const Tabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

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
        Tab 1 content
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
