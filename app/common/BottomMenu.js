import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { bottomMenuStyle } from '../styles';

const BottomMenu = ({ children, otherStyle }) => (
    <View style={[bottomMenuStyle.bottomMenu, otherStyle]}>
        {children}
    </View>
);

BottomMenu.propTypes = {
    children: PropTypes.any,
    otherStyle: PropTypes.object,
};

export default BottomMenu;
