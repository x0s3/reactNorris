import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import jokes from './jokes';
import user from './user';

const jokesPersistConfig = {
    key: 'jokes',
    storage: storage,
    blacklist: ['fetched_jokes', 'fetching']
};

export default combineReducers({
    jokes: persistReducer(jokesPersistConfig, jokes),
    user
});