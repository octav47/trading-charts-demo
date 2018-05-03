export default {
    path: 'services',
    component: require('../../components/common/Layout').default,

    childRoutes: [
        {
            path: 'compare',
            getComponent(nextState, cb){
                System.import('./containers/Compare').then((m)=> {
                    cb(null, m.default)
                })
            }
        },
        {
            path: 'points',
            getComponent(nextState, cb){
                System.import('./containers/Points').then((m)=> {
                    cb(null, m.default)
                })
            }
        },
        {
            path: 'stats',
            getComponent(nextState, cb){
                System.import('./containers/Stats').then((m)=> {
                    cb(null, m.default)
                })
            }
        }
    ]

};
