import * as c from '../constants/rates';

export const getCurrencyRate = () => ({
    type: c.GET_CURRENCY_RATE,
});
export const getCurrencyRateSuccess = payload => ({
    type: c.GET_CURRENCY_RATE_SUCCESS,
    payload
});
export const getCurrencyRateFailure = error => ({
    type: c.GET_CURRENCY_RATE_FAILURE,
    error
});

export const getHistoricalCurrencyRate = (startAt, endAt) => ({
    type: c.GET_HISTORICAL_CURRENCY_RATE,
    startAt,
    endAt
});
export const getHistoricalCurrencyRateSuccess = payload => ({
    type: c.GET_HISTORICAL_CURRENCY_RATE_SUCCESS,
    payload
});
export const getHistoricalCurrencyRateFailure = error => ({
    type: c.GET_HISTORICAL_CURRENCY_RATE_FAILURE,
    error
});