import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { buttonStyle } from '../styles';

const Button = ({
    text,
    onPress,
    styles = buttonStyle,
    icon,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    {icon}
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    styles: PropTypes.object,
    icon: PropTypes.object,
};

export default Button;
