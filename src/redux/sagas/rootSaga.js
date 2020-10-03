import { all, fork } from 'redux-saga/effects';
import rates from './rates';

export default function* rootSaga() {
  yield all([
    rates,
  ].map(fork));
}


