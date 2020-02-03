import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, ScrollView } from 'react-native';

import ListItem from './ListItem';
import { setupCurrentTask } from '../actions/currentTask';
import { indents } from '../styles';
import { setupCheckedData } from '../actions/checkedData';

class ListOfTasks extends Component {
    constructor(props) {
        super(props);
        props.setCheckedData([]);
    }

  handleOnPress = (task) => {
      const { setupTask } = this.props;
      setupTask(task);
  };

handleCheckboxPress = (item, selected) => {
    const { setCheckedData, checkedData } = this.props;
    if (selected) {
        checkedData.push(item);
        setCheckedData(checkedData);
    } else {
        setCheckedData(checkedData.filter((el) => (el.id !== item.id)));
    }
};

render() {
    const {
        data,
        styles = { marginBottom: indents.marginBottomList },
        OnPressTask = () => {},
        OnLongPressTask = () => {},
        selectMode,
        checkedData,
    } = this.props;
    // const { selectMode } = this.state;
    return (
      <ScrollView style={styles}>
        <FlatList
          data={data || []}
          renderItem={({ item }) => (
            <ListItem
              data={item}
              onLongPress={() => {
                OnLongPressTask();
}}
              selectMode={selectMode}
              noSelectedItems={!(checkedData.length)}
              onPress={() => {
  this.handleOnPress(item);
                OnPressTask();
}}
              OnCheckboxPress={this.handleCheckboxPress}
            />
)}
          keyExtractor={(item) => item.id}
          extraData={[selectMode, checkedData ? !(checkedData.length) : null]}
        />
      </ScrollView>
    );
}
}

ListOfTasks.propTypes = {
    data: PropTypes.array,
    checkedData: PropTypes.array,
    setupTask: PropTypes.func,
    setCheckedData: PropTypes.func,
    styles: PropTypes.object,
    OnPressTask: PropTypes.func,
    OnLongPressTask: PropTypes.func,
    selectMode: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => ({
    setupTask: (task) => {
        dispatch(setupCurrentTask(task));
    },
    setCheckedData: (data) => {
        dispatch(setupCheckedData(data));
    },
});

const mapStateToProps = (state) => {
    const { checkedData } = state.data;
    return {
        checkedData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfTasks);
