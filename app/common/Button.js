import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { buttonStyle, colors } from '../styles';

const Button = ({
    text,
    onPress,
    styles = buttonStyle,
    icon,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={
    [styles.button, icon
    ? { backgroundColor: null }
    : null]
}
      // eslint-disable-next-line indent
  >
    {icon}
    {text ? (
      <Text style={[styles.text, icon
    ? { color: colors.$primaryColorVar }
    : null]}
      >
        {text}
      </Text>
) : null}
  </TouchableOpacity>
);

Button.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    styles: PropTypes.object,
    icon: PropTypes.object,
};

export default Button;
