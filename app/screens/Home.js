import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import {
    ListOfTasks,
    BottomMenu,
    ListViewSwitch,
    Title,
    Button,
} from '../common';
import { setupCurrentData } from '../actions/data';
import { setupElectData } from '../actions/ElectData';
import { containerStyle, colors } from '../styles';
import { setupCheckedData } from '../actions/checkedData';
import {
    GENERAL_DATA,
    EXPIRATION_DATE,
    storeData,
    getStoredData,
} from '../services/localstorage';
import { CustomModal } from '../combo';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectMode: false,
            showAll: true,
            showImp: false,
            showOther: false,
            showIsExpiredModal: false,
            showDoneModal: false,
            showCreateModal: false,
            showCreateNewModal: false,
        };
    }

    async componentWillMount() {
        this.setState({ showIsExpiredModal: await this.isExpire() });
    }

isExpire = async () => {
    const date = new Date(await getStoredData(EXPIRATION_DATE));
    const today = new Date();
    // today.setDate(date.getDate());
    if (date) {
        if (date.getFullYear() < today.getFullYear()
            || date.getMonth() < today.getMonth()
            || ((date.getMonth() === today.getMonth()) && (date.getDate() <= today.getDate()))) {
            return true;
        }
    }
    return false;
};

handleModalDelete = () => {
    const { setupData } = this.props;
    setupData([]);
    storeData([], GENERAL_DATA);
    this.setState({ showIsExpiredModal: false });
};

handleModalSave = () => {
    this.setState({ showIsExpiredModal: false });
};

    turnOffSelectMode = () => {
        const { setCheckedData } = this.props;
        this.setState({ selectMode: false });
        setCheckedData([]);
    };

    doneTasks= () => {
        const { setupData, data, checkedData } = this.props;
        const newData = (data.filter((item) => (
            !checkedData.some((val) => ((val.id === item.id) && (Number(val.repeat) < 2)))
        ))).map((val) => {
            if (checkedData.some((item) => ((val.id === item.id)))) {
                // eslint-disable-next-line no-param-reassign
                val.repeat = String(--val.repeat);
            }
            return val;
        });
        setupData(newData);
        storeData(newData, GENERAL_DATA);
    };

handelEditPress = () => {
    const { navigation } = this.props;
    navigation.navigate('EditList');
};

getNextMonday = () => {
    const date = new Date();
    const daysBetween = 8 - date.getDay();
    date.setDate(date.getDate() + daysBetween);
    return date;
};

handleNextPress = () => {
    const { navigation } = this.props;

    const date = new Date();
    date.setDate(this.getNextMonday().getDate() + 7);
    storeData(date, EXPIRATION_DATE);
    this.setState({ showCreateModal: false });
    navigation.navigate('EditList');
};

handleThisPress = () => {
    const { navigation } = this.props;

    storeData(this.getNextMonday(), EXPIRATION_DATE);
    this.setState({ showCreateModal: false });
    navigation.navigate('EditList');
};

handelCreatePress = () => {
    this.setState({ showCreateModal: true });
};

handelCreateNewModalCancelPress = () => {
    this.setState({ showCreateNewModal: false });
};

handelCreateNewModalOkPress = () => {
    setTimeout(() => {
        this.setState({ showCreateModal: true });
    }, 1000);
    const { setupData } = this.props;
    this.setState({ showCreateNewModal: false });
    setupData([]);
    storeData([], GENERAL_DATA);
};

handelCreateNewPress = () => {
    this.setState({ showCreateNewModal: true });
};

handleModalDoneOkPress = () => {
    this.doneTasks();
    this.turnOffSelectMode();
    this.setState({ showDoneModal: false });
};

handleModalDoneCancelPress = () => {
    this.turnOffSelectMode();
    this.setState({ showDoneModal: false });
};

handleDonePress = () => {
    const { selectMode } = this.state;
    const { checkedData } = this.props;
    if (selectMode && checkedData.length) {
        this.setState({ showDoneModal: true });
    } else if (!checkedData.length && selectMode) {
        this.setState({ selectMode: false });
    } else {
        this.setState({ selectMode: true });
    }
};

handleLongPress = () => {
    this.setState({ selectMode: true });
};

handleAllPress = () => {
    this.setState({
        showAll: true,
        showImp: false,
        showOther: false,
    });
};

handleImportantPress = () => {
    this.setState({
        showAll: false,
        showImp: true,
        showOther: false,
    });
};

handleOtherPress = () => {
    this.setState({
        showAll: false,
        showImp: false,
        showOther: true,
    });
};

render() {
    const { data } = this.props;
    const {
        selectMode,
        showAll,
        showImp,
        showOther,
        showIsExpiredModal,
        showCreateModal,
        showDoneModal,
        showCreateNewModal,
    } = this.state;
    return (
      <View style={containerStyle.container}>
        <Title title="Tasks for this week: " />
        <ListViewSwitch
          onPressAll={this.handleAllPress}
          onPressImportant={this.handleImportantPress}
          onPressOther={this.handleOtherPress}
        />
        <ListOfTasks
          data={data}
          OnLongPressTask={this.handleLongPress}
          selectMode={selectMode}
          showAll={showAll}
          showImp={showImp}
          showOther={showOther}

        />
        <BottomMenu>
          {data.length ? (
            <Button
              text="Create"
              icon={
                <Icon name="list-unordered" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
            }
              onPress={this.handelCreateNewPress}
            />
) : null}
          {!(data.length)
            ? (
              <Button
                text="Create list"
                icon={
                  <Icon name="list-unordered" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                }
                onPress={this.handelCreatePress}
              />
)
        : (
          <Button
            text="Edit"
            icon={
              <Icon name="pencil" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
            }
            onPress={this.handelEditPress}
          />
)}
          <Button
            text="Done"
            icon={
              <Icon name="checklist" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                }
            onPress={this.handleDonePress}
          />
        </BottomMenu>
        <CustomModal isVisible={showIsExpiredModal} title="New week started!" text="What do you want to do with previos tasks?">
          <Button text="Save" onPress={this.handleModalSave} />
          <Button text="Delete" onPress={this.handleModalDelete} />
        </CustomModal>
        <CustomModal isVisible={showCreateModal} title="Create new list" text="Do you want to create list of tasks for this week or next?">
          <Button text="This" onPress={this.handleThisPress} />
          <Button text="Next" onPress={this.handleNextPress} />
        </CustomModal>
        <CustomModal isVisible={showDoneModal} title="Done" text="Are you sure you done this?">
          <Button text="Ok" onPress={this.handleModalDoneOkPress} />
          <Button text="Cancel" onPress={this.handleModalDoneCancelPress} />
        </CustomModal>
        <CustomModal isVisible={showCreateNewModal} title="Create new list" text="Are you sure you want to create new list? All current tasks will be deleted!">
          <Button text="Ok" onPress={this.handelCreateNewModalOkPress} />
          <Button text="Cancel" onPress={this.handelCreateNewModalCancelPress} />
        </CustomModal>
      </View>
    );
}
}

Home.propTypes = {
    setupData: PropTypes.func,
    setCheckedData: PropTypes.func,
    data: PropTypes.array,
    checkedData: PropTypes.array,
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
    const { data, checkedData } = state.data;
    return {
        data,
        checkedData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
