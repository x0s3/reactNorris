import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Home from '../components/home';
import Joke from '../components/joke'
import User from '../components/user';
import {Drawer} from '../components/drawer';

const DrawerStack = createDrawerNavigator({
    Home: {
        screen: Home
    },
    User: {
        screen: User
    }
}, {contentComponent: Drawer});


export default createStackNavigator({
        DrawerStack: {screen: DrawerStack},
        Joke: {screen: Joke}
    },
    {
        initialRoute: 'Home',
        headerMode: 'none',
    }
);