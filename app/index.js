import React from 'react';
import { Provider } from 'react-redux';
import store from './config/store';
import Application from './combo/Application';

export default () => (
  <Provider store={store}>
    <Application />
  </Provider>
);
