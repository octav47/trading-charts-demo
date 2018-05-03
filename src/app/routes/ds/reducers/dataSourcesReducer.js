import * as actions from '../actions';

export function dataSourcesReducer(state = {}, action) {
    switch (action.type) {
        case actions.INIT_DATASOURCE_FETCHING:
            return {
                ...state,
                list: 'fetching'
            };
        case actions.INIT_DATASOURCE_OK:
            return {
                ...state,
                list: action.list
            };
        case actions.INIT_DATASOURCE_FAILED:
            return {
                ...state,
                list: 'failed'
            };

        case actions.CHECK_DATASOURCE_FETCHING:
            return {
                ...state,
                check: 'fetching'
            };
        case actions.CHECK_DATASOURCE_OK:
            return {
                ...state,
                check: action.check
            };
        case actions.CHECK_DATASOURCE_FAILED:
            return {
                ...state,
                check: 'failed'
            };
    }

    return state;
}