export default {
    path: '/',
    component: require('../../components/common/Layout').default,
    childRoutes: [
        {
            path: 'jnj-training',
            getComponent(nextState, cb){
                System.import('./components/JnJTraining').then((m)=> {
                    cb(null, m.default)
                })
            }
        }
    ]
};