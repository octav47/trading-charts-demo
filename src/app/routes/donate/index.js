export default {
    path: '/',
    component: require('../../components/common/Layout').default,

    childRoutes: [
        {
            path: 'donate',
            getComponent(nextState, cb){
                System.import('./containers/Donate').then((m)=> {
                    cb(null, m.default)
                })
            }
        }
    ]

};