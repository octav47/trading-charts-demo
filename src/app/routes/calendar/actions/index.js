import fetch from 'isomorphic-fetch'

export const EVENTS_FETCHING = 'EVENTS_FETCHING'
export const EVENTS_OK = 'EVENTS_OK'
export const EVENTS_FAILED = 'EVENTS_FAILED'

const Type = {
    EVENTS_FETCHING: () => ({ type: EVENTS_FETCHING }),
    EVENTS_OK: (r) => ({ type: EVENTS_OK, events: r }),
    EVENTS_FAILED: (e) => {
        console.log(e)
        return {
            type: EVENTS_FAILED
        }
    }
}

// =====

function getEvents() {
    return (dispatch) => {
        dispatch(Type.EVENTS_FETCHING())
        fetch('http://new.radio-hustle.com/data/calendar/contests.json')
            .then(r => r.json())
            .then(r => dispatch(Type.EVENTS_OK(r)))
            .catch(e => dispatch(Type.EVENTS_FAILED(e)))
    }
}

export function fetchEvents(...args) {
    return dispatch => dispatch(getEvents(...args))
}
