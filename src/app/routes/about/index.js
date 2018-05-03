export default {
    path: '/',
    component: require('../../components/common/Layout').default,

    childRoutes: [
        {
            path: 'about',
            getComponent(nextState, cb){
                System.import('./containers/About').then((m)=> {
                    cb(null, m.default)
                })
            }
        }
    ]

};
