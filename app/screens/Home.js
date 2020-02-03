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
import { containerStyle, colors } from '../styles';
import { setupCheckedData } from '../actions/checkedData';
import { getGeneralData, getElectData } from '../services/localstorage';
import { setupElectData } from '../actions/ElectData';

const InitData = [{
    id: '1',
    task: 'task',
    repeat: '',
    important: false,
}, {
    id: '2',
    task: 'task2',
    repeat: '3',
    important: true,
}, {
    id: '3',
    task: 'task3',
    repeat: '',
    important: false,
},
];

class Home extends Component {
    constructor(props) {
        super(props);
        const { setupData, setElectData } = this.props;
        this.state = {
            selectMode: false,
        };
        // setupData(InitData);
        const data = getGeneralData();
        setupData(Array.isArray(data) ? data : []);
        const electData = getElectData();
        console.log(electData);
        setElectData(Array.isArray(electData) ? electData : []);
    }

    turnOffSelectMode = () => {
        const { setCheckedData } = this.props;
        this.setState({ selectMode: false });
        setCheckedData([]);
    };

    doneTasks= () => {
        const { setupData, data, checkedData } = this.props;
        setupData((data.filter((item) => (
            !checkedData.some((val) => ((val.id === item.id) && (Number(val.repeat) < 2)))
        ))).map((val) => {
            if (checkedData.some((item) => ((val.id === item.id)))) {
                // eslint-disable-next-line no-param-reassign
                val.repeat = String(--val.repeat);
            }
            return val;
        }));
    };

handelEditPress = () => {
    const { navigation } = this.props;
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
    const { setupData } = this.props;
    setupData(InitData);
};

handleImportantPress = () => {
    const { setupData } = this.props;
    setupData(InitData.filter((item) => (item.important)));
};

handleOtherPress = () => {
    const { setupData } = this.props;
    setupData(InitData.filter((item) => (!item.important)));
};

render() {
    const { data } = this.props;
    const { selectMode } = this.state;
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
        />
        <BottomMenu>
          <Button
            text="Edit list"
            icon={
              <Icon name="pencil" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                }
            onPress={this.handelEditPress}
          />
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
    setElectData: PropTypes.func,
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
