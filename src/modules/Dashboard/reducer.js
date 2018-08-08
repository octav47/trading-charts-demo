import {
    FETCH_CHART_DATA_REQUEST,
    FETCH_CHART_DATA_SUCCESS,
    FETCH_CHART_DATA_FAILED,
} from './consts'

const initialState = {
    fetching: false,
    chart: {
        data: [],
    },
    error: null,
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action

    if (type === FETCH_CHART_DATA_REQUEST) {
        return {
            ...state,
            fetching: true,
            error: null,
        }
    }

    if (type === FETCH_CHART_DATA_SUCCESS) {
        return {
            ...state,
            fetching: false,
            chart: {
                data: payload,
            },
        }
    }

    if (type === FETCH_CHART_DATA_FAILED) {
        return {
            ...state,
            fetching: false,
            error: payload,
        }
    }

    return state
}

export default reducer
