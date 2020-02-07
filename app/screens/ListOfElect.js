import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {
    ListOfTasks,
    BottomMenu,
    Title,
    Button,
} from '../common';
import { CustomModal } from '../combo';
import { setupCurrentData } from '../actions/data';
import { setupCheckedData } from '../actions/checkedData';
import { setupElectData } from '../actions/ElectData';
import { containerStyle, colors, indents } from '../styles';
import { storeData, ELECT_DATA, GENERAL_DATA } from '../services/localstorage';

class ListOfElect extends Component {
    constructor(props) {
        super(props);
        if (!props.electData) props.setElectData([]);
        this.state = {
            showDeleteModal: false,
        };
    }

handelBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
};

addCheckedTasks = () => {
    const { setupData, data, checkedData } = this.props;
    let id = data.length ? String(Number(data[data.length - 1].id) + 1) : '0';

    checkedData.forEach((item) => {
        const newItem = item;
        newItem.id = id;
        id++;
        id = String(id);
        data.push({ ...newItem });
    });
    const newData = data.map((item) => item);
    setupData(newData);
    storeData(newData, GENERAL_DATA);
    this.resetCheckedTasks();
};

handleAddPress = () => {
    this.addCheckedTasks();
};

deleteCheckedTasks = () => {
    const { setElectData, electData, checkedData } = this.props;
    const newData = electData.filter((item) => (
        !checkedData.some((val) => (val.id === item.id))));

    setElectData(newData);
    storeData(newData, ELECT_DATA);
};

resetCheckedTasks = () => {
    const { setCheckedData } = this.props;
    setCheckedData([]);
};

handelDeleteModalOkPress = () => {
    this.deleteCheckedTasks();
    this.resetCheckedTasks();
    this.setState({ showDeleteModal: false });
};

handelDeleteModalCancelPress = () => {
    this.resetCheckedTasks();
    this.setState({ showDeleteModal: false });
};

handleDeletePress = () => {
    const { checkedData } = this.props;
    if (checkedData.length) {
        this.setState({ showDeleteModal: true });
    }
};

render() {
    const { electData } = this.props;
    const { showDeleteModal } = this.state;
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
        <CustomModal isVisible={showDeleteModal} title="Delete" text="Are you sure you want to delet this?">
          <Button text="Ok" onPress={this.handelDeleteModalOkPress} />
          <Button text="Cancel" onPress={this.handelDeleteModalCancelPress} />
        </CustomModal>
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
