import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { checkboxStyle } from '../styles';

const Checkbox = ({
    onPress,
    selected,
    backgroundColor,
    underlayColor,
}) => (
  <TouchableHighlight
    onPress={onPress}
    style={[checkboxStyle.container, { backgroundColor }]}
    underlayColor={underlayColor}
      >
    <View>
      {selected ? <Icon name="check" color="white" size={30} resizeMode="contain" style={checkboxStyle.mark} /> : null}
    </View>
  </TouchableHighlight>
);

Checkbox.propTypes = {
    onPress: PropTypes.func,
    selected: PropTypes.bool,
    backgroundColor: PropTypes.string,
    underlayColor: PropTypes.string,
};

export default Checkbox;
