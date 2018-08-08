import { createAction } from 'redux-actions'
import {
    FETCH_CHART_DATA_REQUEST,
} from './consts'

export const getData = createAction(FETCH_CHART_DATA_REQUEST)
