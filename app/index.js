import React from 'react';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import store from './config/store';
import Navigator from './config/routes';

EStyleSheet.build({
    $primaryColor: '#20B2AA',
    $primaryDark: '#008B8B',
    $primaryWhite: '#FFFFFF',
    $primaryAccentColor: '#FA8072',
});

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);
