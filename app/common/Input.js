import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

import { newTaskStyle, colors } from '../styles';

const Input = ({ onChangeText, value, placeholder }) => (
    <TextInput
        onChangeText={onChangeText}
        value={value}
        style={newTaskStyle.input}
        placeholder={placeholder}
        placeholderTextColor={colors.$primaryColorVar}
    />
);

Input.propTypes = {
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Input;
