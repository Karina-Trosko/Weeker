import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { bottomMenuStyle } from '../styles';

const BottomMenu = ({ children }) => (
  <View style={bottomMenuStyle.bottomMenu}>
    {children}
  </View>
);

BottomMenu.propTypes = {
    children: PropTypes.any,
};

export default BottomMenu;
