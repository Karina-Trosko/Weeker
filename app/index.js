import React, { Component } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import store from './config/store';
import Application from './combo/Application';


export default class App extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <Provider store={store}>
                <Application />
            </Provider>
        );
    }
}

// export default () => (
//   <Provider store={store}>
//     <Application />
//   </Provider>
// );
