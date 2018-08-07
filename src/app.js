import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, hashHistory } from 'react-router'

import store from './store/configureStore'
import routes from './routes'

const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render((
    <Provider store={store}>
        <Router
            routes={routes}
            history={history}
            onUpdate={() => window.scrollTo(0, 0)}
        />
    </Provider>
), document.getElementById('root'))
