/**
 * Created by griga on 11/17/16.
 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import { handleBodyClasses, dumpLayoutToStorage, layoutReducer } from '../components/layout';
import navigationReducer from '../components/navigation/navigationReducer';
import { userReducer } from '../components/user';
import { chatReducer } from '../components/chat';
import outlookReducer from '../routes/outlook/outlookReducer';
import { voiceReducer } from '../components/voice-control';
import { dancersReducer } from '../routes/dancers/reducers';
import { playerReducer } from '../routes/player/reducers';
import { calendarReducer } from '../routes/calendar/reducers';
import { fetchConfig, fetchGetData, fetchFollowedDancer } from '../routes/dancers/actions';
import { fetchEvents } from '../routes/calendar/actions';
import { fetchTrackList } from '../routes/player/actions';
import { composeWithDevTools } from 'redux-devtools-extension';

export const rootReducer = combineReducers(
    {
        routing: routerReducer,
        layout: layoutReducer,
        navigation: navigationReducer,
        //outlook: outlookReducer,
        user: userReducer,
        chat: chatReducer,
        // events: eventsReducer,
        voice: voiceReducer,

        dancers: dancersReducer,
        player: playerReducer,
        calendar: calendarReducer
    }
);

const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(
        thunk,
        handleBodyClasses,
        dumpLayoutToStorage
    )));

// store.dispatch(requestUserInfo());
// store.dispatch(chatInit());
store.dispatch(fetchConfig())
store.dispatch(fetchEvents())
store.dispatch(fetchGetData())
store.dispatch(fetchTrackList())

if (localStorage['rh-app']) {
    let rhAppData = JSON.parse(localStorage['rh-app'])
    if (rhAppData['followedDancer']) {
        store.dispatch(fetchFollowedDancer(rhAppData['followedDancer']))
    }
}

//if (config.voice_command_auto) {
//    store.dispatch(voiceControlOn());
//}

// store.dispatch(requestUserInfo());

window.store = store

export default store;