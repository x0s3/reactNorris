import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {YellowBox} from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import App from './App';
import configureStore from './configureStore';
import {ChuckPreparingApp} from './const/LoadingChuck';

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader',
    'Module RCTSplashScreen',
    'Class RCTCxxModule'
]);

class Main extends Component {

    componentDidMount() {
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500,
        })
    }

    render() {
        const {store, persistor} = configureStore();
        return (
            <Provider store={store}>
                <PersistGate loading={<ChuckPreparingApp/>} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        )
    }
}

export default Main;