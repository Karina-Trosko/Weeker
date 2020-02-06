import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

filterData = () => {
    const {
        showAll, showImp, showOther, data,
    } = this.props;
    if (showAll) {
        return data;
    }
    if (showImp) {
        return data.filter((item) => (item.important));
    }
    if (showOther) {
        return data.filter((item) => (!item.important));
    }
    return data;
};

render() {
    const {
        styles = { marginBottom: indents.marginBottomList },
        OnPressTask = () => {},
        OnLongPressTask = () => {},
        selectMode,
        checkedData,
    } = this.props;
    // const { selectMode } = this.state;
    return (
      <KeyboardAwareScrollView style={styles}>
        <FlatList
          data={this.filterData() || []}
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
      </KeyboardAwareScrollView>
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
    showAll: PropTypes.bool,
    showImp: PropTypes.bool,
    showOther: PropTypes.bool,
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
