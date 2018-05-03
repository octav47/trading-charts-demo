export const INIT_DATASOURCE_FETCHING = 'INIT_DATASOURCE_FETCHING';
export const INIT_DATASOURCE_OK = 'INIT_DATASOURCE_OK';
export const INIT_DATASOURCE_FAILED = 'INIT_DATASOURCE_FAILED';

export const CHECK_DATASOURCE_FETCHING = 'CHECK_DATASOURCE_FETCHING';
export const CHECK_DATASOURCE_OK = 'CHECK_DATASOURCE_OK';
export const CHECK_DATASOURCE_FAILED = 'CHECK_DATASOURCE_FAILED';

const Type = {
    INIT_DATASOURCE_FETCHING: () => ({type: INIT_DATASOURCE_FETCHING}),
    INIT_DATASOURCE_OK: (json) => ({
        type: INIT_DATASOURCE_OK,
        list: json
    }),
    INIT_DATASOURCE_FAILED: () => ({type: INIT_DATASOURCE_FAILED}),

    CHECK_DATASOURCE_FETCHING: () => ({type: CHECK_DATASOURCE_FETCHING}),
    CHECK_DATASOURCE_OK: (json) => ({
        type: CHECK_DATASOURCE_OK,
        check: json
    }),
    CHECK_DATASOURCE_FAILED: () => ({type: CHECK_DATASOURCE_FAILED})
};

function getDataSources() {
    return (dispatch) => {
        dispatch(Type.INIT_DATASOURCE_FETCHING());
        return fetch('http://192.168.245.78:9001/ds/init/')
            .then(r => r.json())
            .then(json => dispatch(Type.INIT_DATASOURCE_OK(json)))
            .catch(e => dispatch(Type.INIT_DATASOURCE_FAILED()))
    }
}

export function fetchDataSources() {
    return dispatch => dispatch(getDataSources());
}

function checkSources() {
    return (dispatch) => {
        dispatch(Type.CHECK_DATASOURCE_FETCHING());
        return fetch('http://192.168.245.78:9001/ds/check/')
            .then(r => r.json())
            .then(json => dispatch(Type.CHECK_DATASOURCE_OK(json)))
            .catch(e => dispatch(Type.CHECK_DATASOURCE_FAILED()))
    }
}

export function fetchCheckSources() {
    return dispatch => dispatch(checkSources());
}