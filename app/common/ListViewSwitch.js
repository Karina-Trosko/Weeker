import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Button from './Button';
import { listViewSwitchStyle, switchButtonStyle } from '../styles';

const ListViewSwitch = ({ onPressAll, onPressImportant, onPressOther }) => (
  <View style={listViewSwitchStyle.switch}>
    <Button
      text="all"
      styles={switchButtonStyle}
      onPress={onPressAll}
    />
    <View style={listViewSwitchStyle.separator} />
    <Button
      text="important"
      styles={switchButtonStyle}
      onPress={onPressImportant}
    />
    <View style={listViewSwitchStyle.separator} />
    <Button
      text="Other"
      styles={switchButtonStyle}
      onPress={onPressOther}
    />
  </View>
);

ListViewSwitch.propTypes = {
    onPressAll: PropTypes.func,
    onPressImportant: PropTypes.func,
    onPressOther: PropTypes.func,
};

export default ListViewSwitch;
