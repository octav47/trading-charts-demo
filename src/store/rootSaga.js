import { all, fork } from 'redux-saga/effects'
import dashboardSaga from 'Modules/Dashboard/saga'

export default function* rootSaga () {
    yield all([
        fork(dashboardSaga),
    ])
}
