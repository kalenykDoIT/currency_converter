import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { getCurrencyRate } from '../../redux/actions';
import { currencies } from '../../utils';

export const Converter = () => {
    const dispatch = useDispatch()

    const rates = useSelector(state => state.rates.currentRate.rates);
    const baseCurrency = useSelector(state => state.rates.currentRate.base);
    const lastUpdate = useSelector(state => state.rates.lastCurrentRateUpdate);

    const [eur, setEur] = useState('');
    const [gbp, setGbp] = useState('');
    const [usd, setUsd] = useState('');
    const [sgd, setSgd] = useState('');

    const mapCurrencyNameToHandler = {
        EUR: setEur,
        GBP: setGbp,
        USD: setUsd,
        SGD: setSgd,
    };

    useEffect(() => {
        let now = Date.now() / 1000;
        now = +now.toFixed();
        const isRateUpdatedToday = moment(now).isSame(lastUpdate, 'd')
        
        if(!lastUpdate || !isRateUpdatedToday) {
            dispatch(getCurrencyRate());
        }
    },[lastUpdate, dispatch])
    

    const handleRefresh = () => {
        dispatch(getCurrencyRate());
    }
    const parseToBaseCurrency = (currency, value) => {
        return value / rates[currency];
    }
    const roundFloatNumber = (num, symbolsAfterDot = 4) => {
        return num === 0 ? num : num.toFixed(symbolsAfterDot)
    }
    const handleChange = e => {
        const { name, value } = e.target;
        if(baseCurrency === name) {
            mapCurrencyNameToHandler[name](value);
            currencies.forEach(currency => {
                if(baseCurrency === currency) return;
                mapCurrencyNameToHandler[currency](roundFloatNumber(value * rates[currency]));
            })

            return;
        }

        mapCurrencyNameToHandler[name](value);
        const valueInBaseCurrency = parseToBaseCurrency(name, value)
        currencies.forEach(currency => {
            if(name === currency) return;
            if(currency === baseCurrency) return mapCurrencyNameToHandler[currency]( roundFloatNumber(valueInBaseCurrency));

            mapCurrencyNameToHandler[currency]( roundFloatNumber(valueInBaseCurrency * rates[currency]));
        })
    }

    const lastUpdateParsed = moment(lastUpdate * 1000).format('HH:mm');

    const currenciesList = [
        {
            name: 'EUR',
            value: eur,
            icon: <i>&euro;</i>
        },
        {
            name: 'GBP',
            value: gbp,
            icon: <i>&pound;</i>
        },
        {
            name: 'USD',
            value: usd,
            icon: <i>&#36;</i>
        },
        {
            name: 'SGD',
            value: sgd,
            icon: <i>S&#36;</i>
        },
    ];
    return (
        <div className="converter-wrap">
            <ul>
                {
                    currenciesList.map(currency => (
                        <li key={currency.name}>
                            <div className="currency">
                                {currency.name}
                                {currency.icon}
                            </div>
                            <input type='number' name={currency.name} value={currency.value} onChange={handleChange}/>
                        </li>
                    ))
                }
            </ul>
            <div className='converter-footer'>
                <button className='refresh' onClick={handleRefresh}>
                    <span className=''>&#x27f3;</span>
                </button>
                <div>
                    <h3>Last Rate Update:</h3>
                    {lastUpdateParsed}
                </div>
            </div>
        </div>
    )
}