import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    View,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {
    ListOfTasks,
    BottomMenu,
    Title,
    Button,
} from '../common';
import { setupCurrentData } from '../actions/data';
import { setupCheckedData } from '../actions/checkedData';
import { setupElectData } from '../actions/ElectData';
import { containerStyle, colors, indents } from '../styles';

class ListOfElect extends Component {
    constructor(props) {
        super(props);
        if (!props.electData) props.setElectData([]);
    }

handelBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
};

addCheckedTasks = () => {
    const { setupData, data, checkedData } = this.props;
    let id = data.length ? String(Number(data[data.length - 1].id) + 1) : '0';
    checkedData.forEach((item) => {
        item.id = id;
        id++;
        id = String(id);
        data.push(item);
    });
    setupData(data.map((item) => item));
    this.resetCheckedTasks();
};

handleAddPress = () => {
    this.addCheckedTasks();
};

deleteCheckedTasks = () => {
    const { setElectData, electData, checkedData } = this.props;
    setElectData(electData.filter((item) => (
        !checkedData.some((val) => (val.id === item.id))
    )));
};

resetCheckedTasks = () => {
    const { setCheckedData } = this.props;
    setCheckedData([]);
};

handleDeletePress = () => {
    const { checkedData } = this.props;
    if (checkedData.length) {
        Alert.alert('Delete', 'Are you sure you want to delet this?', [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: this.resetCheckedTasks,
            },
            {
                text: 'OK',
                onPress: () => {
                    this.deleteCheckedTasks();
                    this.resetCheckedTasks();
                },
            },
        ]);
    }
};

render() {
    const { electData } = this.props;
    return (
      <View style={containerStyle.container}>
        <Title title="Select tasks to add: " />
        <ListOfTasks
          data={electData}
          styles={{ marginBottom: indents.marginBottomList }}
          selectMode
        />
        <BottomMenu otherStyle={{ justifyContent: 'space-around' }}>
          <Button
            icon={
              <Icon name="arrow-left" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                  }
            onPress={this.handelBackPress}
          />
          <Button
            icon={
              <EntypoIcon name="add-to-list" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                }
            onPress={this.handleAddPress}
          />
          <Button
            icon={
              <Icon name="trash-o" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                }
            onPress={this.handleDeletePress}
          />
        </BottomMenu>
      </View>
    );
}
}

ListOfElect.propTypes = {
    setupData: PropTypes.func,
    setElectData: PropTypes.func,
    data: PropTypes.array,
    electData: PropTypes.array,
    checkedData: PropTypes.array,
    setCheckedData: PropTypes.func,
    navigation: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
    setupData: (data) => {
        dispatch(setupCurrentData(data));
    },
    setCheckedData: (data) => {
        dispatch(setupCheckedData(data));
    },
    setElectData: (data) => {
        dispatch(setupElectData(data));
    },
});

const mapStateToProps = (state) => {
    const { data, checkedData, electData } = state.data;
    return {
        data,
        checkedData,
        electData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfElect);
