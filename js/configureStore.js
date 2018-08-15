import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { createNetworkMiddleware } from 'react-native-offline';
import storage from 'redux-persist/lib/storage';
import reducer from './reducers';
import promise from './promise';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
};

export default function configureStore() {

    const networkMiddleware = createNetworkMiddleware();

    const enhancer = compose(
        applyMiddleware(networkMiddleware, thunk, promise),
    );

    const persistedReducer = persistReducer(persistConfig, reducer);

    const store = createStore(persistedReducer, enhancer);

    const persistor = persistStore(store);

    return { store, persistor };
}