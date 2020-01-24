import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';

import { listStyle } from '../styles';

const ListItem = ({ data, onPress }) => {
    const { task, important, repeat } = data;
    return (
      <View style={listStyle.listItemStyle}>
        <TouchableOpacity onPress={onPress}>
          <Text style={listStyle.task}>{`${task} ${important} ${repeat}`}</Text>
        </TouchableOpacity>
      </View>
    );
};

ListItem.propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func,
};

export default ListItem;
