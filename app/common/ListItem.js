import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';

import { listStyle, colors } from '../styles';
import RepeatIcon from '../assets/icons/Repeat';
import Checkbox from './Checkbox';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.selectMode || nextProps.noSelectedItems) {
            this.setState({
                selected: false,
            });
        }
    }

handleCheckboxPress = (data) => {
    const { selected } = this.state;
    const { OnCheckboxPress } = this.props;
    this.setState({ selected: !selected });
    OnCheckboxPress(data, !selected);
};

render() {
    const {
        data,
        onLongPress,
        onPress,
        selectMode,
    } = this.props;
    const { task, important, repeat } = data;
    const { selected } = this.state;
    return (
      <TouchableOpacity onLongPress={onLongPress} onPress={onPress} style={listStyle.listItemStyle}>
        {(repeat && (Number(repeat) > 1))
        ? <RepeatIcon color={colors.$primaryAccentColorVar} size={35} repeat={repeat} />
        : null}
        <Text style={[listStyle.task, (important
          ? { color: colors.$primaryAccentColorVar }
          : null)]}
        >
          {task}
        </Text>
        {selectMode ? (
          <Checkbox
            selected={selected}
            backgroundColor={colors.$primaryAccentColorVar}
            underlayColor={colors.$primaryColorVar}
            onPress={
              () => {
              this.handleCheckboxPress(data);
}
}
          />
) : null}

      </TouchableOpacity>
    );
}
}

ListItem.propTypes = {
    data: PropTypes.object,
    onLongPress: PropTypes.func,
    onPress: PropTypes.func,
    OnCheckboxPress: PropTypes.func,
    selectMode: PropTypes.bool,
    noSelectedItems: PropTypes.bool,
};

export default ListItem;
