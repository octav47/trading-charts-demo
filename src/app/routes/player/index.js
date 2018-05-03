export default {
    path: '/',
    component: require('../../components/common/Layout').default,
    childRoutes: [
        {
            path: 'player(/:hexEncode)',
            getComponent(nextState, cb){
                System.import('./components/Player').then((m)=> {
                    cb(null, m.default)
                })
            }
        },
    ]
}
