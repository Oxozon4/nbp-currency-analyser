import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useApi = (currency, timeInterval, setIsLoading, startDate) => {
  const [responseData, setResponseData] = useState(null);

  const getUrl = (currency, timeInterval, startDate) => {
    let today = new Date();
    today.setDate(today.getDate() - timeInterval);

    const fromDate = startDate ? new Date(startDate.getTime()) : today;
    const fromDateString = `${fromDate.getFullYear()}-${String(
      fromDate.getMonth() + 1
    ).padStart(2, '0')}-${String(fromDate.getDate()).padStart(2, '0')}`;

    today = new Date();
    const startDateClone = startDate ? new Date(startDate.getTime()) : today;
    const toDate = startDate
      ? new Date(
          startDateClone.setDate(
            startDateClone.getDate() + Number(timeInterval)
          )
        )
      : today;
    const toDateString = `${toDate.getFullYear()}-${String(
      toDate.getMonth() + 1
    ).padStart(2, '0')}-${String(toDate.getDate()).padStart(2, '0')}`;
    const url = `//api.nbp.pl/api/exchangerates/rates/a/${currency}/${fromDateString}/${toDateString}/`;
    return url;
  };

  const getCurrencyData = async (currency, timeInterval, startDate) => {
    if (!currency || !timeInterval) {
      setIsLoading(false);
      return;
    }
    const url = getUrl(currency, timeInterval, startDate);
    const response = await fetch(url);
    if (!response.ok) {
      toast.error(
        'Wystąpił problem przy pobieraniu danych! Spróbuj ponownie później!',
        { toastId: 'data-fail' }
      );
    }
    const data = await response.json();
    setResponseData(data);
    setIsLoading(false);
    toast.success('Dane pobrane pomyślnie!', {
      toastId: 'data-success',
    });
  };

  const callApi = (currency, timeInterval, startDate) => {
    setIsLoading(true);
    getCurrencyData(currency, timeInterval, startDate);
  };

  useEffect(() => {
    callApi(currency, timeInterval, startDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { responseData, callApi };
};
