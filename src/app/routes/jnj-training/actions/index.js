import fetch from 'isomorphic-fetch'

export const TRACKLIST_FETCHING = 'TRACKLIST_FETCHING';
export const TRACKLIST_OK = 'TRACKLIST_OK';
export const TACKLIST_FAILED = 'TACKLIST_FAILED';

const Type = {
    TRACKLIST_FETCHING: () => ({ type: TRACKLIST_FETCHING }),
    TRACKLIST_OK: (json) => ({
        type: TRACKLIST_OK,
        tracklist: json
    }),
    TACKLIST_FAILED: (e) => {
        // console.log(e);
        return { type: TACKLIST_FAILED }
    }
};

// =====

function getTrackList() {
    return (dispatch) => {
        dispatch(Type.TRACKLIST_FETCHING());
        return fetch(`http://radio-hustle.com/api/player/getTrackList/`)
            .then(r => r.json())
            .then(json => dispatch(Type.TRACKLIST_OK(json)))
            .catch(e => dispatch(Type.TACKLIST_FAILED(e)))
    }
}

export function fetchTrackList(...args) {
    return dispatch => dispatch(getTrackList(...args));
}

// =====
