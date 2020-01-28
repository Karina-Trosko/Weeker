import React from 'react';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import store from './config/store';
import Navigator from './config/routes';

EStyleSheet.build({

});

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);
