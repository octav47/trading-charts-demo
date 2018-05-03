import store from '../../store/configureStore'

export default {
    path: '/',
    component: require('../../components/common/Layout').default,

    indexRoute: { onEnter: (nextState, replace) => replace('/board') },

    childRoutes: [
        {
            path: 'board',
            getComponent(nextState, cb){
                store.dispatch({
                    type: 'TOGGLE_LOADING',
                    loading: true
                })
                System.import('./containers/Board').then((m)=> {
                    store.dispatch({
                        type: 'TOGGLE_LOADING',
                        loading: false
                    })
                    cb(null, m.default)
                })
            }
        }
    ]

};
