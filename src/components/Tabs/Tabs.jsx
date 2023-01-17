import { useState } from "react";
import PropTypes from "prop-types";
import Tab1 from "./Tab1/Tab1";
import Tab2 from "./Tab2/Tab2";
import "./Tabs.scss";

const Tabs = ({ setIsLoading }) => {
  const [tabIndex, setTabIndex] = useState(0);

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
        <Tab1 setIsLoading={setIsLoading} />
      </div>
      <div
        data-testid="tab-content2"
        className={`tabs-content ${
          tabIndex === 1 ? "tabs-content_active" : ""
        }`}
      >
        <Tab2 setIsLoading={setIsLoading} />
      </div>
    </div>
  );
};

Tabs.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default Tabs;
