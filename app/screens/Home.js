import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Alert } from 'react-native';
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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectMode: false,
            showAll: true,
            showImp: false,
            showOther: false,
        };
    }

    async componentDidMount() {
        const { setupData } = this.props;

        const date = new Date(await getStoredData(EXPIRATION_DATE));
        const today = new Date();
        if (date) {
            if (date.getFullYear() < today.getFullYear()
            || date.getMonth() < today.getMonth()
            || ((date.getMonth() === today.getMonth()) && (date.getDate() <= today.getDate()))) {
                Alert.alert('New week started!', 'Do you want to save or delete previose tasks?', [
                    {
                        text: 'Delete',
                        onPress: () => {
                            setupData([]);
                            storeData([], GENERAL_DATA);
                        },
                    },
                    {
                        text: 'Save',
                        onPress: () => { storeData(this.getNextMonday(), EXPIRATION_DATE); },
                    },
                ]);
            }
        }
    }

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

handelCreatePress = () => {
    const { navigation } = this.props;
    Alert.alert('Create new list', 'Do you want to create list of tasks for this week or next?', [
        {
            text: 'Next',
            onPress: () => {
                const date = new Date();
                date.setDate(this.getNextMonday().getDate() + 7);
                storeData(date, EXPIRATION_DATE);
            },
        },
        {
            text: 'This',
            onPress: () => { storeData(this.getNextMonday(), EXPIRATION_DATE); },
        },
    ]);
    navigation.navigate('EditList');
};

handleDonePress = () => {
    const { selectMode } = this.state;
    const { checkedData } = this.props;
    if (selectMode && checkedData.length) {
        Alert.alert('Done', 'Are you sure you done this?', [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: this.turnOffSelectMode,
            },
            {
                text: 'OK',
                onPress: () => {
                    this.doneTasks();
                    this.turnOffSelectMode();
                },
            },
        ]);
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
        selectMode, showAll, showImp, showOther,
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
          {!(data.length)
            ? (
              <Button
                text="Create list"
                icon={
                  <Icon name="pencil" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                }
                onPress={this.handelCreatePress}
              />
)
        : (
          <Button
            text="Edit list"
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
