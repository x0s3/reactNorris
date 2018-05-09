import {AsyncStorage} from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer as persistRed} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import reducer from './reducers';
import promise from './promise';

const persistConfig = {
    key: 'chuck',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
};

export default function configureStore() {
    const enhancer = compose(
        applyMiddleware(thunk, promise),
    );

    const persistReducer = persistRed(persistConfig, reducer);

    const store = createStore(persistReducer, enhancer);
    persistStore(store);

    const persistor = persistStore(store);

    return {store, persistor};
}