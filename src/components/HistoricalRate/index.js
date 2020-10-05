import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";

import { getHistoricalCurrencyRate } from '../../redux/actions';
import { currencies } from '../../utils';

const options = {
    responsive: true,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false,
        lineTension: 0
      }
    },
    scales: {
      yAxes: [
        {
            scaleLabel: {
              display: true,
              labelString: 'Ratio to base currency'
            },
        }
      ],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }],
    },
    legend: {
      display: true,
      position: 'bottom',
      reverse: true,
      onClick: null
    }
};
const datasetOptions = {
    fill: false,
    lineTension: 0.1,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
}

const mapStylesToDateset = {
    USD: {
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
    },
    GBP: {
        backgroundColor: 'rgba(237, 197, 36,0.4)',
        borderColor: 'rgba(237, 197, 36,1)',
        pointBorderColor: 'rgba(237, 197, 36,1)',
        pointHoverBackgroundColor: 'rgba(237, 197, 36,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
    },
    SGD: {
        backgroundColor: 'rgba(66, 135, 245,0.4)',
        borderColor: 'rgba(66, 135, 245)',
        pointBorderColor: 'rgba(66, 135, 245)',
        pointHoverBackgroundColor: 'rgba(66, 135, 245)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
    }
}
export const HistoricalRate = () => {
    const dispatch = useDispatch();
    const historicalRate = useSelector(state => state.rates.historicalRate.rates)
    const baseCurrency = useSelector(state => state.rates.baseCurrency);

    const [startAt, setStartAt] = useState(null);
    const [endAt, setEndAt] = useState(null);

    const dateRangeKey = `${moment(startAt).format('YYYY-MM-DD')}__${moment(endAt).format('YYYY-MM-DD')}`

    const handleSubmit = () => {
        if(startAt && endAt && !historicalRate[dateRangeKey]) {
            dispatch(getHistoricalCurrencyRate(moment(startAt).format('YYYY-MM-DD'), moment(endAt).format('YYYY-MM-DD')))
        }
    }

    const datasets = currencies
        .filter(currency => currency !== baseCurrency)
        .map(currency => {
            const sorted = {};
            if(!historicalRate[dateRangeKey] || !Object.keys(historicalRate[dateRangeKey]).length ) {
                return {
                    ...datasetOptions,
                    ...mapStylesToDateset[currency],
                    label: `${currency} to ${baseCurrency} ratio`,
                    data: [],
                }
            }
            Object.keys(historicalRate[dateRangeKey])
                .sort((a,b) => moment(a).diff(b))
                .forEach(key => {
                    sorted[key] = historicalRate[dateRangeKey][key]
                })
            return {
                ...datasetOptions,
                ...mapStylesToDateset[currency],
                label: `${currency} to ${baseCurrency} ratio`,
                data: historicalRate[dateRangeKey] ? Object.values(sorted).map(item => item[currency]) : []
            }
        })
    const data = {
        labels: historicalRate[dateRangeKey] ? Object.keys(historicalRate[dateRangeKey]).sort((a,b) => moment(a).diff(b)) : [],
        datasets
    }
    return (
        <div className="historical-wrap">
            <div className="date-wrap">
                <h1>Historical Currency Ratio</h1>
                <DatePicker 
                    selected={startAt} 
                    onChange={setStartAt}
                    maxDate={endAt ? endAt : Date.now()}
                    placeholderText={'Start date'}
                    popperPlacement="left"
                />
                <DatePicker 
                    selected={endAt} 
                    onChange={setEndAt}
                    minDate={startAt ? startAt : Date.now()}
                    maxDate={Date.now()}
                    placeholderText={'End date'}
                    popperPlacement={'right'}
                />
                {historicalRate[dateRangeKey] && (datasets.every(dataset => dataset.data.length === 0)) && <span className='error'>No data for these period</span>}
                <button onClick={handleSubmit} className='submit'>Get historical rate</button>
            </div>
            
            { datasets.every(dataset => dataset.data.length) && (
                <>
                    <Line
                        data={data}
                        options={options}
                    />
                </>
            )}
        </div>
    )
}