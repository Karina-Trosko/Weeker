import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    ListOfTasks,
    BottomMenu,
    ListViewSwitch,
    Button,
} from '../common';
import { setupCurrentData } from '../actions/data';
import { setupCurrentTask } from '../actions/currentTask';
import { NewTask } from '../combo';
import { containerStyle, colors, indents } from '../styles';

class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addPress: false,
        };
    }

handelBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
};

handleAllPress = () => {

};

handleAddPress = () => {
    const { addPress } = this.state;
    this.setState({ addPress: !addPress });
    const { setupTask } = this.props;
    setupTask({
        repeat: '1',
        task: '',
        important: false,
        addToElected: false,
    });
};

handleTaskPress = () => {
    const { addPress } = this.state;
    this.setState({ addPress: !addPress });
};

deleteTasks = () => {
    const { setupData, data, deleteData } = this.props;
    setupData(data.filter((item) => (
        !deleteData.some((val) => (val.id === item.id))
    )));
};

handleDeletePress = () => {
    Alert.alert('Delete', 'Are you sure you want to delet this?', [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        { text: 'OK', onPress: this.deleteTasks },
    ]);
};

handleTaskLongPress = () => {
    console.log('got it');
};

//  <ListOfTasks data={data} />
render() {
    const { data } = this.props;
    const { addPress } = this.state;
    return (
      <View style={containerStyle.container}>
        <ListViewSwitch />
        <ListOfTasks
          data={data}
          styles={addPress ? { marginBottom: 10 } : { marginBottom: indents.marginBottomList }}
          OnPressTask={this.handleTaskPress}
          OnLongPressTask={this.handleTaskLongPress}

        />
        {addPress ? <NewTask close={this.handleTaskPress} /> : null}
        <BottomMenu otherStyle={{ justifyContent: 'space-around' }}>
          <Button
            icon={
              <Icon name="arrow-left" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                  }
            onPress={this.handelBackPress}
          />
          <Button
            icon={
              <Icon name="plus" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                }
            onPress={this.handleAddPress}
          />
          <Button
            icon={
              <Icon name="trash-o" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                }
            onPress={this.handleDeletePress}
          />
          <Button icon={
            <Icon name="star" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                }
          />
        </BottomMenu>
      </View>
    );
}
}

EditList.propTypes = {
    setupData: PropTypes.func,
    data: PropTypes.array,
    deleteData: PropTypes.array,
    setupTask: PropTypes.func,
    navigation: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
    setupData: (data) => {
        dispatch(setupCurrentData(data));
    },
    setupTask: (task) => {
        dispatch(setupCurrentTask(task));
    },
});

const mapStateToProps = (state) => {
    const { data, deleteData } = state.data;
    return {
        data,
        deleteData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditList);
