import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerReducer } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './rootSaga'

export const rootReducer = combineReducers(
    {
        routing: routerReducer,
    }
)

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(
        sagaMiddleware,
    )))

sagaMiddleware.run(rootSaga)

window._store = store

export default store
