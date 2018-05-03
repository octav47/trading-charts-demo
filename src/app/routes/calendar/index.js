import store from '../../store/configureStore'

export default {
    component: require('../../components/common/Layout').default,
    childRoutes: [{
        path: 'calendar',
        getComponent: (nextState, cb) => {
            store.dispatch({
                type: 'TOGGLE_LOADING',
                loading: true
            })
            System.import('./containers/CalendarPage').then(m => {
                store.dispatch({
                    type: 'TOGGLE_LOADING',
                    loading: false
                })
                cb(null, m.default)
            })
        }
    }]
}