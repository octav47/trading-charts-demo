export default {
    path: '/',
    component: require('../../components/common/Layout').default,
    childRoutes: [
        {
            path: 'clubs',
            getComponent(nextState, cb){
                System.import('./components/Clubs').then((m)=> {
                    cb(null, m.default)
                })
            },
            childRoutes: [
                {
                    path: ':name',
                    getComponent(nextState, cb){
                        System.import('./components/SingleClub').then((m)=> {
                            cb(null, m.default)
                        })
                    },
                }
            ]
        }
    ]
};