import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { repeatIconStyle } from '../../styles';

const RepeatIcon = ({
    color, size = 40, repeat,
}) => (
  <View style={[{ height: size, width: size }, repeatIconStyle.container]}>
    <Icon name="ccw" color={color} size={size} resizeMode="contain" />
    <Text style={[repeatIconStyle.repeatIconText, {
                color,
                fontSize: size / 3,
                top: size / 3 - 2,
                left: size / 2,
            },
            ]}
    >
      {repeat}
    </Text>
  </View>
);

RepeatIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    repeat: PropTypes.string,
};

export default RepeatIcon;
