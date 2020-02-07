import React, { Component } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import store from './config/store';
import Application from './combo/Application';


export default class App extends Component {
    componentDidMount() {
    // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
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
