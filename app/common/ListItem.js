import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';

import { listStyle } from '../styles';
import RepeatIcon from '../assets/icons/Repeat';

const ListItem = ({ data, onPress }) => {
    const { task, important, repeat } = data;
    return (
      <TouchableOpacity onPress={onPress} style={listStyle.listItemStyle}>
        {repeat ? <RepeatIcon color="red" size={35} repeat={repeat} /> : null}
        <Text style={listStyle.task}>{`${task} ${important} ${repeat}`}</Text>
      </TouchableOpacity>
    );
};

ListItem.propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func,
};

export default ListItem;
