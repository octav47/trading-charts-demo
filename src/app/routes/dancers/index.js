export default {
    path: '/',
    component: require('../../components/common/Layout').default,
    childRoutes: [
        {
            path: 'dancers',
            getComponent(nextState, cb){
                System.import('./components/Dancers').then((m)=> {
                    cb(null, m.default)
                })
            },
            childRoutes: [
                {
                    path: ':id',
                    getComponent(nextState, cb){
                        System.import('./components/SingleDancer').then((m)=> {
                            cb(null, m.default)
                        })
                    },
                }
            ]
        }
    ]
};