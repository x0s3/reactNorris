import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import App from './App';
import configureStore from './configureStore';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class Main extends Component {
    render() {
        const {store, persistor} = configureStore();
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        )
    }
}

export default Main;