import * as actions from '../actions';

export function calendarReducer(state = {}, action) {
    switch (action.type) {
        case actions.EVENTS_FETCHING:
            return {
                ...state,
                events: 'fetching'
            };
        case actions.EVENTS_OK:
            return {
                ...state,
                events: action.events
            };
        case actions.EVENTS_FAILED:
            return {
                ...state,
                events: 'failed'
            };
    }

    return state;
}