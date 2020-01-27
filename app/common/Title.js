import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import { titleStyle } from '../styles';

const Title = ({ title }) => (
  <View style={titleStyle.container}>
    <Text style={titleStyle.title}>{title}</Text>
  </View>
);

Title.propTypes = {
    title: PropTypes.string,
};

export default Title;
