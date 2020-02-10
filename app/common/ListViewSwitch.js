import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import I18n from '../i18n/i18n';

import Button from './Button';
import { listViewSwitchStyle, switchButtonStyle } from '../styles';

const ListViewSwitch = ({ onPressAll, onPressImportant, onPressOther }) => (
    <View style={listViewSwitchStyle.switch}>
        <Button
            text={I18n.t('switchAll')}
            styles={switchButtonStyle}
            onPress={onPressAll}
        />
        <View style={listViewSwitchStyle.separator} />
        <Button
            text={I18n.t('switchImportant')}
            styles={switchButtonStyle}
            onPress={onPressImportant}
        />
        <View style={listViewSwitchStyle.separator} />
        <Button
            text={I18n.t('switchOther')}
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
