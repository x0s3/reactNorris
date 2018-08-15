import React, { Component } from 'react';
import { withNetworkConnectivity } from 'react-native-offline';
import MainStackRouter from './routers/MainRouterStack';

class App extends Component {
    render() {
        return <MainStackRouter/>
    }
}

export default withNetworkConnectivity({
    withRedux: true // It won't inject isConnected as a prop in this case
})(App);