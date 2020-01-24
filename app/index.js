import React from 'react';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Home from './screens/Home';
import store from './config/store';

EStyleSheet.build({

});

export default () => (
  <Provider store={store}>
    <Home />
  </Provider>
);
