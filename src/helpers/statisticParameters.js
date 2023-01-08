export const getMedian = (numbersArray) => {
  numbersArray.sort(function (a, b) {
    return a - b;
  });

  const middleIndex = Math.floor(numbersArray.length / 2);
  let result = 0;
  if (numbersArray.length % 2 !== 0) {
    result = numbersArray[middleIndex];
  } else {
    result = (numbersArray[middleIndex - 1] + numbersArray[middleIndex]) / 2;
  }

  return result.toFixed(6);
};

export const getDominant = (numbersArray) => {
  let counts = {};
  let dominant = null;
  let maxCount = 0;

  for (let i = 0; i < numbersArray.length; i++) {
    const value = numbersArray[i];
    if (!counts[value]) {
      counts[value] = 1;
    } else {
      counts[value]++;
    }
  }

  for (const key in counts) {
    if (counts[key] > maxCount) {
      dominant = key;
      maxCount = counts[key];
    }
  }

  return dominant;
};

export const getStandardDeviation = (numbersArray) => {
  const mean = numbersArray.reduce((a, b) => a + b) / numbersArray.length;
  const squaredDifferences = numbersArray.map((x) => Math.pow(x - mean, 2));
  const squaredDifferencesSum = squaredDifferences.reduce((a, b) => a + b);
  return Math.sqrt(squaredDifferencesSum / numbersArray.length).toFixed(6);
};

export const getCoefficientOfVariation = (numbersArray) => {
  const mean = numbersArray.reduce((a, b) => a + b) / numbersArray.length;

  const standardDeviation = Math.sqrt(
    numbersArray.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) /
      (numbersArray.length - 1)
  );
  return ((standardDeviation / mean) * 100).toFixed(3) + "%";
};

export const currencyVolatility = (currencyPrices) => {

    const currencyChanges = [];
    for (let i = 0; i < currencyPrices.length - 1; i++) {
      const currentCurrencyPrice = currencyPrices[i];
      const currencyChange = (currentCurrencyPrice - currencyPrices[0]) / currencyPrices[0];
      currencyChanges.push(currencyChange);
    }

    return currencyChanges;
  }
  
export const calculateCurrencyChanges = (currencyPrices) => {
    const currencyChanges = [];
    for (let i = 0; i < currencyPrices.length - 1; i++) {
      const currentCurrencyPrice = currencyPrices[i];
  
      const currencyChange = (currentCurrencyPrice - currencyPrices[0]) / currencyPrices[0];
  
      currencyChanges.push(currencyChange);
    }
  
    return currencyChanges;
  }
  
  
  
  

