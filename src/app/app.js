import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, hashHistory } from 'react-router'

import store from './store/configureStore'

const history = syncHistoryWithStore(hashHistory, store)

if (!window.dev) {
    console.log('console.log has been disabled')

    console.log = () => {}
}

let childRoutes = []

if (window.dev) {
    childRoutes = childRoutes.concat([
        require('./routes/dashboard').default,
        require('./routes/smartadmin-intel').default,
        require('./routes/widgets').default,
        require('./routes/outlook').default,
        require('./routes/tables').default,
        require('./routes/ui').default,
        require('./routes/graphs').default,
        require('./routes/e-commerce').default,
        require('./routes/misc').default,
        require('./routes/auth').default,
        require('./routes/app-views').default,
        require('./routes/maps').default,
        require('./routes/forms').default,
    ])
}

const routes = {
    path: '/',
    indexRoute: { onEnter: (nextState, replace) => replace('/dashboard') },
    childRoutes,
}

ReactDOM.render((
    <Provider store={store}>
        <Router
            history={history}
            routes={routes}
            onUpdate={() => window.scrollTo(0, 0)}
        />
    </Provider>
), document.getElementById('root'))
