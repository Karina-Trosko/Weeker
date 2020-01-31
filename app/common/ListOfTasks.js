import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, ScrollView } from 'react-native';

import ListItem from './ListItem';
import { setupCurrentTask } from '../actions/currentTask';
import { indents } from '../styles';
import { setupDeleteData } from '../actions/deleteData';

class ListOfTasks extends Component {
    constructor(props) {
        super(props);
        props.setDeleteData([]);
    }

  handleOnPress = (task) => {
      const { setupTask } = this.props;
      setupTask(task);
  };

handleCheckboxPress = (item, selected) => {
    const { setDeleteData, deleteData } = this.props;
    if (selected) {
        deleteData.push(item);
        setDeleteData(deleteData);
    } else {
        setDeleteData(deleteData.filter((el) => (el.id !== item.id)));
    }
};

render() {
    const {
        data,
        styles = { marginBottom: indents.marginBottomList },
        OnPressTask = () => {},
        OnLongPressTask = () => {},
        selectMode,
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
              onPress={() => {
  this.handleOnPress(item);
                OnPressTask();
}}
              OnCheckboxPress={this.handleCheckboxPress}
            />
)}
          keyExtractor={(item) => item.id}
          extraData={selectMode}
        />
      </ScrollView>
    );
}
}

ListOfTasks.propTypes = {
    data: PropTypes.array,
    deleteData: PropTypes.array,
    setupTask: PropTypes.func,
    setDeleteData: PropTypes.func,
    styles: PropTypes.object,
    OnPressTask: PropTypes.func,
    OnLongPressTask: PropTypes.func,
    selectMode: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => ({
    setupTask: (task) => {
        dispatch(setupCurrentTask(task));
    },
    setDeleteData: (data) => {
        dispatch(setupDeleteData(data));
    },
});

const mapStateToProps = (state) => {
    const { data, deleteData } = state.data;
    return {
        data,
        deleteData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfTasks);
