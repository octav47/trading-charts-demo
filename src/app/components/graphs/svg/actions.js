import fetch from 'isomorphic-fetch';

export const FETCHING = 'FETCHING';
export const OK = 'OK';
export const FAILED = 'FAILED';
export const SAVING = 'SAVING';
export const SAVE_OK = 'SAVE_OK';

const Type = {
    FETCHING: () => ({type: FETCHING}),
    OK: (json) => ({
        type: OK,
        list: json
    }),
    FAILED: () => ({type: FAILED}),
    SAVING: () => ({type: SAVING}),
    SAVING_OK: () => ({type: SAVE_OK})
};

function getSVGList() {
    return (dispatch) => {
        dispatch(Type.FETCHING());
        return fetch('http://192.168.245.78:9001/getSVGList/')
            .then(r => r.json())
            .then(json => dispatch(Type.OK(json)))
            .catch(e => dispatch(Type.FAILED()))
    }
}

function saveSVG(index, svg) {
    return (dispatch) => {
        let svgData = $(`#svg_container_${index}`).html();
        console.log(svgData);
        svg.data = svgData;
        dispatch(Type.SAVING());
        return fetch(`http://192.168.245.78:9001/saveSVGByID/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(svg)
        })
            .then(r => r.json())
            .then(json => dispatch(Type.SAVING_OK(json)))
    }
}

export function fetchSVGList() {
    return dispatch => dispatch(getSVGList())
}

export function fetchSaveSVG(index, svg) {
    return dispatch => dispatch(saveSVG(index, svg));
}