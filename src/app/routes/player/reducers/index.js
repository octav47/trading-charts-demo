import * as actions from '../actions';

export function playerReducer(state = {}, action) {
    switch (action.type) {
        case actions.TRACKLIST_FETCHING:
            return {
                ...state,
                tracklist: 'fetching'
            };
        case actions.TRACKLIST_OK:
            return {
                ...state,
                tracklist: action.tracklist
            };
        case actions.TACKLIST_FAILED:
            return {
                ...state,
                tracklist: 'failed'
            };
    }

    return state;
}