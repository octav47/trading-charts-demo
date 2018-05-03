import * as actions from './actions';

export function svgReducer(state = {}, action) {
    switch (action.type) {
        case actions.FETCHING:
            return {
                ...state,
                list: 'fetching'
            };
        case actions.OK:
            return {
                ...state,
                list: action.list
            };
        case actions.FAILED:
            return {
                ...state,
                list: 'failed'
            };
    }

    return state;
}