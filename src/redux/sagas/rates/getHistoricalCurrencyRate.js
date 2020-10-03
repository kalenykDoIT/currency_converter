import { call, put, select } from 'redux-saga/effects';
import querystring from 'querystring';

import * as a from '../../actions/rates';
import { currencies } from '../../../utils';

export function* getHistoricalCurrencyRate ({startAt, endAt}) {

    try {
      const base = yield select(state => state.rates.baseCurrency)
      const symbols = currencies.filter(currency => currency !== base).join(',');

      const queryparams = querystring.stringify({
        start_at: startAt,
        end_at: endAt,
        base,
        symbols
      })
      const response = yield call(fetch, `${process.env.REACT_APP_API_URL}/history?${queryparams}`);
      const data = yield response.json();
      yield put(a.getHistoricalCurrencyRateSuccess(data));
      
    } catch (error) {
      console.log('error',error);
      yield put(a.getHistoricalCurrencyRateFailure(error));
    }
}
