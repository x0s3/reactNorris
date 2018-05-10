import React from 'react';
import {View} from 'react-native';
import {H1} from 'native-base';

const Spinner = require('react-native-spinkit');

export const ChuckPreparingApp = () => (
    <View style={{flex: 1, justifyContent: 'center'}}>
        <H1>Chuck Norris is preparing your app, just wait a moment :)</H1>
        <Spinner style={{alignSelf: 'center'}} isVisible={true} type={'Pulse'} size={100}/>
    </View>
);