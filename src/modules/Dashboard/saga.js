import fetch from 'isomorphic-fetch'
import moment from 'moment'
import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import {
    FETCH_CHART_DATA_REQUEST,
    FETCH_CHART_DATA_SUCCESS,
    FETCH_CHART_DATA_FAILED,
} from './consts'

import config from 'Config'

const apiGetData = () =>
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GOOG&apikey=${config.apiKey}`)
        .then(r => {
            if (r.status !== 200) {
                throw {
                    code: r.status,
                }
            }

            return r.json()
        })

function* fetchData () {
    try {
        const data = yield call(apiGetData)
        const series = data['Time Series (Daily)']

        yield put({
            type: FETCH_CHART_DATA_SUCCESS, payload: Object.keys(series).map(key => {
                const value = series[key]

                return [
                    +moment(key, 'YYYY-MM-DD').format('x'),
                    +value['1. open'],
                    +value['2. high'],
                    +value['3. low'],
                    +value['4. close'],
                ]
            })
                .reverse(),
        })
    } catch (e) {
        yield put({ type: FETCH_CHART_DATA_FAILED, payload: e })
    }
}

function* mySaga () {
    yield all([
        fork(function* () {
            yield takeLatest(FETCH_CHART_DATA_REQUEST, fetchData)
        }),
    ])
}

export default mySaga
