import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { reducer as network } from 'react-native-offline';
import storage from 'redux-persist/lib/storage';
import jokes from './jokes';
import user from './user';

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['jokes']
};

const jokesPersistConfig = {
    key: 'jokes',
    storage: storage,
    blacklist: ['fetched_jokes', 'first_fetch']
};

const rootReducer = combineReducers({
    jokes: persistReducer(jokesPersistConfig, jokes),
    user,
    network
});

export default persistReducer(rootPersistConfig, rootReducer);