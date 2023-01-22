import {
  getMedian,
  getDominant,
  getStandardDeviation,
  getCoefficientOfVariation,
  currencyVolatility,
} from './statisticParameters';

describe('calculateMedian', () => {
  test('should return the median of an odd-length array', () => {
    expect(getMedian([1, 2, 3])).toBe('2.000000');
  });
  test('should return the median of an even-length array', () => {
    expect(getMedian([1, 2, 3, 4])).toBe('2.500000');
  });
});

describe('getDominant', () => {
  test('should return the dominant number in an array', () => {
    expect(getDominant([1, 2, 2, 3, 3, 3])).toBe('3');
    expect(getDominant([1, 2, 3, 4, 4, 4, 5])).toBe('4');
  });
  test('should return null if the array is empty', () => {
    expect(getDominant([])).toBe(null);
  });
  test('should return the only number if there is only one element in the array', () => {
    expect(getDominant([5])).toBe('5');
  });
  test('should return the first dominant number if multiple numbers have the same count', () => {
    expect(getDominant([1, 2, 2, 3, 3, 3, 4, 4, 4, 4])).toBe('4');
  });
});

describe('getStandardDeviation', () => {
  test('should return the standard deviation of an array of numbers', () => {
    expect(getStandardDeviation([1, 2, 3, 4, 5])).toBe('1.414214');
    expect(getStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBe('2.000000');
  });
  test('should return 0 if the array has only one element', () => {
    expect(getStandardDeviation([5])).toBe('0.000000');
  });
});

describe('getCoefficientOfVariation', () => {
  test('should return the coefficient of variation of an array of numbers', () => {
    expect(getCoefficientOfVariation([1, 2, 3, 4, 5])).toBe('52.705%');
    expect(getCoefficientOfVariation([2, 4, 4, 4, 5, 5, 7, 9])).toBe('42.762%');
  });
  test('should return 0% if the array has only one element', () => {
    expect(getCoefficientOfVariation([5])).toBe('NaN%');
  });
  test('should return infinity if the mean is 0', () => {
    expect(getCoefficientOfVariation([0, 0, 0, 0, 0, 0])).toBe('NaN%');
  });
});

describe('currencyVolatility', () => {
  test('should return an empty array if the input array has only one element', () => {
    expect(currencyVolatility([100])).toEqual([]);
  });
  test('should return an empty array if the input array is empty', () => {
    expect(currencyVolatility([])).toEqual([]);
  });
});
