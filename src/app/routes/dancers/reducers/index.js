import * as actions from '../actions'

export function dancersReducer(state = {}, action) {
    switch (action.type) {
        case actions.CONFIG_FETCHING:
            return {
                ...state,
                config: 'fetching',
            }
        case actions.CONFIG_OK:
            return {
                ...state,
                config: JSON.parse(JSON.parse(action.config)),
            }
        case actions.CONFIG_FAILED:
            return {
                ...state,
                config: 'failed',
            }

        case actions.INIT_DATA_FETCHING:
            return {
                ...state,
                data: 'fetching',
            }
        case actions.INIT_DATA_OK:
            return {
                ...state,
                data: Object.keys(action.data).map((e) => ({ label: `${e} ${action.data[e]}` })),
            }
        case actions.INIT_DATA_FAILED:
            return {
                ...state,
                data: 'failed',
            }

        case actions.DANCER_DATA_FETCHING:
            return {
                ...state,
                dancerData: 'fetching',
            }
        case actions.DANCER_DATA_OK:
            return {
                ...state,
                dancerData: action.dancerData,
            }
        case actions.DANCER_DATA_FAILED:
            return {
                ...state,
                dancerData: 'failed',
            }

        case actions.FOLLOWED_DANCER_DATA_FETCHING:
            return {
                ...state,
                followedDancerData: 'fetching',
            }
        case actions.FOLLOWED_DANCER_DATA_OK:
            return {
                ...state,
                followedDancerData: action.followedDancerData,
            }
        case actions.FOLLOWED_DANCER_DATA_FAILED:
            return {
                ...state,
                followedDancerData: 'failed',
            }
        case actions.UNFOLLOW_DANCER:
            return {
                ...state,
                followedDancerData: null,
            }
        default:
            return state
    }
}
