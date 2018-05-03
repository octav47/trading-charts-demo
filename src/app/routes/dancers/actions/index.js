import fetch from 'isomorphic-fetch'

import Listeners from '../../../utils/Listeners'

export const CONFIG_FETCHING = 'CONFIG_FETCHING'
export const CONFIG_OK = 'CONFIG_OK'
export const CONFIG_FAILED = 'CONFIG_FAILED'

export const INIT_DATA_FETCHING = 'INIT_DATA_FETCHING'
export const INIT_DATA_OK = 'INIT_DATA_OK'
export const INIT_DATA_FAILED = 'INIT_DATA_FAILED'

export const DANCER_DATA_FETCHING = 'DANCER_DATA_FETCHING'
export const DANCER_DATA_OK = 'DANCER_DATA_OK'
export const DANCER_DATA_FAILED = 'DANCER_DATA_FAILED'

export const FOLLOWED_DANCER_DATA_FETCHING = 'FOLLOWED_DANCER_DATA_FETCHING'
export const FOLLOWED_DANCER_DATA_OK = 'FOLLOWED_DANCER_DATA_OK'
export const FOLLOWED_DANCER_DATA_FAILED = 'FOLLOWED_DANCER_DATA_FAILED'
export const UNFOLLOW_DANCER = 'UNFOLLOW_DANCER'

const Type = {
    CONFIG_FETCHING: () => ({ type: CONFIG_FETCHING }),
    CONFIG_OK: json => ({
        type: CONFIG_OK,
        config: json,
    }),
    CONFIG_FAILED: e => {
        Listeners.fetchFailed('Не удалось получить файл конфигураций', e, CONFIG_FAILED)

        return { type: CONFIG_FAILED }
    },

    INIT_DATA_FETCHING: () => ({ type: INIT_DATA_FETCHING }),
    INIT_DATA_OK: json => ({
        type: INIT_DATA_OK,
        data: json,
    }),
    INIT_DATA_FAILED: e => {
        Listeners.fetchFailed('Не удалось получить список танцоров', e, INIT_DATA_FAILED)

        return { type: INIT_DATA_FAILED }
    },

    DANCER_DATA_FETCHING: () => ({ type: DANCER_DATA_FETCHING }),
    DANCER_DATA_OK: json => ({
        type: DANCER_DATA_OK,
        dancerData: json,
    }),
    DANCER_DATA_FAILED: e => {
        Listeners.fetchFailed('Не удалось получить информацию по танцору', e, DANCER_DATA_FAILED)

        return { type: DANCER_DATA_FAILED }
    },

    FOLLOWED_DANCER_DATA_FETCHING: () => ({ type: FOLLOWED_DANCER_DATA_FETCHING }),
    FOLLOWED_DANCER_DATA_OK: json => {
        return {
            type: FOLLOWED_DANCER_DATA_OK,
            followedDancerData: json,
        }
    },
    FOLLOWED_DANCER_DATA_FAILED: e => {
        Listeners.fetchFailed('Не удалось получить информацию по сохранённому танцору', e, FOLLOWED_DANCER_DATA_FAILED)

        return { type: FOLLOWED_DANCER_DATA_FAILED }
    },
    UNFOLLOW_DANCER: () => ({ type: UNFOLLOW_DANCER, followedDancerData: null }),
}

// =====

function getConfig () {
    return dispatch => {
        dispatch(Type.CONFIG_FETCHING())

        return fetch('http://data.radio-hustle.com/db/dancers_config/')
            .then(r => r.text())
            .then(json => dispatch(Type.CONFIG_OK(json)))
            .catch(e => dispatch(Type.CONFIG_FAILED(e)))
    }
}

export function fetchConfig (...args) {
    return dispatch => dispatch(getConfig(...args))
}

function getData () {
    return dispatch => {
        dispatch(Type.INIT_DATA_FETCHING())

        return fetch('http://radio-hustle.com/api/dancers/getList/')
            .then(r => r.json())
            .then(json => dispatch(Type.INIT_DATA_OK(json)))
            .catch(e => dispatch(Type.INIT_DATA_FAILED(e)))
    }
}

export function fetchGetData (...args) {
    return dispatch => dispatch(getData(...args))
}

function getDancerData (id) {
    return dispatch => {
        dispatch(Type.DANCER_DATA_FETCHING())

        return fetch(`http://data.radio-hustle.com/db/getDancerInfo/${id}`)
            .then(r => {
                return r.json()
            })
            .then(json => {
                dispatch(Type.DANCER_DATA_OK(json))
            })
            .catch(e => {
                console.log(e)

                dispatch(Type.DANCER_DATA_FAILED(e))
            })
    }
}

export function fetchGetDancerData (...args) {
    return dispatch => dispatch(getDancerData(...args))
}

function getFollowedDancerData (id) {
    return dispatch => {
        dispatch(Type.FOLLOWED_DANCER_DATA_FETCHING())

        return fetch(`http://data.radio-hustle.com/db/getDancerInfo/${id}`)
            .then(r => r.json())
            .then(json => {
                // console.log(json)
                dispatch(Type.FOLLOWED_DANCER_DATA_OK(json))
            })
            .catch(e => {
                console.log(e)

                dispatch(Type.FOLLOWED_DANCER_DATA_FAILED(e))
            })
    }
}

export function fetchFollowedDancer (id) {
    return dispatch => dispatch(getFollowedDancerData(id))
}

// =====
