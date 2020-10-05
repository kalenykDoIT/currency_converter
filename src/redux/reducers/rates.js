import { handleActions } from 'redux-actions';

import * as c from '../constants/rates';

const initialState = {
    baseCurrency: 'EUR',
    currentRate: {
        rates: {},
        base: ''
    },
    historicalRate: {
        rates: {},
        isRatesLoaded: false,
    },

    isCurrentRateLoading: false,
    lastCurrentRateUpdate: null,

    isHistoricalRateLoading: false,
};

const userData = handleActions(
    new Map([
        [
            c.GET_CURRENCY_RATE,
            (state) => ({
                ...state,
                isCurrentRateLoading: true
            })
        ],
        [
            c.GET_CURRENCY_RATE_SUCCESS,
            (state, { payload }) => ({
                ...state,
                isCurrentRateLoading: false,
                currentRate: payload,
                lastCurrentRateUpdate: new Date().getTime() / 1000
            })
        ],
        [
            c.GET_CURRENCY_RATE_FAILURE,
            (state, { error }) => ({
                ...state,
                isCurrentRateLoading: false
            })
        ],



        [
            c.GET_HISTORICAL_CURRENCY_RATE,
            (state) => ({
                ...state,
                isHistoricalRateLoading: true,
                historicalRate: {
                    ...state.historicalRate,
                    isRatesLoaded: false
                }
            })
        ],
        [
            c.GET_HISTORICAL_CURRENCY_RATE_SUCCESS,
            (state, { payload }) => ({
                ...state,
                isHistoricalRateLoading: false,
                historicalRate: {
                    ...payload,
                    isRatesLoaded: true,
                    rates: {
                        [`${payload.start_at}__${payload.end_at}`]: payload.rates
                    }
                },
            })
        ],
        [
            c.GET_HISTORICAL_CURRENCY_RATE_FAILURE,
            (state, { error }) => ({
                ...state,
                historicalRate: {
                    isRatesLoaded: false,
                },
                isHistoricalRateLoading: false,
            })
        ],
    ]),
    initialState
);

export default userData;
