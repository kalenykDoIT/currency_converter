import { takeLatest } from 'redux-saga/effects';
import * as c from '../../constants/rates';

import { getCurrencyRate } from './getCurrencyRate';
import { getHistoricalCurrencyRate } from './getHistoricalCurrencyRate';


export default function* () {
    yield takeLatest(c.GET_CURRENCY_RATE, getCurrencyRate);
    yield takeLatest(c.GET_HISTORICAL_CURRENCY_RATE, getHistoricalCurrencyRate);
}
