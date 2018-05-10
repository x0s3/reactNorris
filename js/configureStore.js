import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';
import reducer from './reducers';
import promise from './promise';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

export default function configureStore() {
    const enhancer = compose(
        applyMiddleware(thunk, promise),
    );

    const persistedReducer = persistReducer(persistConfig, reducer);

    const store = createStore(persistedReducer, enhancer);

    const persistor = persistStore(store);

    return {store, persistor};
}