import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AutoSuggest from 'react-autosuggest';
import LocaleCurrency from 'locale-currency';
import cc from 'country-code';
import _ from 'lodash';
import 'flag-icon-css/css/flag-icons.css';
import './SelectCurrency.scss';

const associateCurrencies = (countries) => {
  return _.map(countries, (country) => ({
    ...country,
    currencyCode: LocaleCurrency.getCurrency(country.alpha2),
  }));
};

const countriesWithCurrency = (countries) => {
  return _.filter(
    countries,
    (country) => !!LocaleCurrency.getCurrency(country.alpha2)
  );
};

const stringStartsWith = (s, fragment) => {
  return s.indexOf(fragment) === 0;
};

const stringContains = (s, fragment) => {
  return s.indexOf(fragment) !== -1;
};

const renderSuggestion = ({ name, alpha2: countryCode, currencyCode }) => {
  const iconClasses = classNames(
    'flag-icon',
    `flag-icon-${countryCode.toLowerCase()}`
  );
  return (
    <div className="inputContainer">
      <span className={iconClasses} />
      &nbsp;
      <span className="country-name">
        {name} ({currencyCode})
      </span>
    </div>
  );
};

const SelectCurrency = ({ onChange, value: selectValue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const countries = associateCurrencies(countriesWithCurrency(cc.countries));

  const getSuggestions = useCallback(
    (arg = '') => {
      const values = arg.trim().toUpperCase();
      return values === ''
        ? countries
        : _.filter(countries, (country) => {
            return (
              stringStartsWith(country.currencyCode, values) ||
              stringContains(country.name.toUpperCase(), values)
            );
          });
    },
    [countries]
  );

  const onSuggestionSelected = (ev, { suggestionValue }) => {
    onChange(suggestionValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
    onChange(value);
  };

  const handleOnChange = (event, { newValue, method }) => {
    onChange(newValue);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (country) => {
    return country.currencyCode;
  };

  return (
    <div className="select-currency">
      <label>Wybierz walutę</label>
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionSelected={getSuggestionValue}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          value: selectValue,
          placeholder: 'USD or United...',
          onChange: handleOnChange,
        }}
        shouldRenderSuggestions={() => true}
        onSuggestionSelected={onSuggestionSelected}
      />
    </div>
  );
};

SelectCurrency.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default SelectCurrency;
