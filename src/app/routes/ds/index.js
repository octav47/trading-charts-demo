export default {
    path: '/',
    component: require('../../components/common/Layout').default,
    childRoutes: [
        {
            path: 'ds',
            getComponent(nextState, cb){
                System.import('./components/DataSources').then((m)=> {
                    cb(null, m.default)
                })
            }
        }
    ]
};