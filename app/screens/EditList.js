import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Animated,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    ListOfTasks,
    BottomMenu,
    ListViewSwitch,
    Button,
} from '../common';
import { setupCurrentData } from '../actions/data';
import { setupCurrentTask } from '../actions/currentTask';
import { setupCheckedData } from '../actions/checkedData';
import { NewTask, CustomModal } from '../combo';
import { containerStyle, colors, indents } from '../styles';
import { storeData, GENERAL_DATA } from '../services/localstorage';

const ANIMATION_DURATION = 400;

class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addPress: false,
            selectMode: false,
            menuShow: true,
            showAll: true,
            showImp: false,
            showOther: false,
            showDeleteModal: false,
        };
        this.menuMarginTop = new Animated.Value(0);
        this.menuMarginBottom = new Animated.Value(0);
    }

    componentDidMount() {
        const name = Platform.OS === 'ios' ? 'Will' : 'Did';
        this.keyboardShowListener = Keyboard.addListener(`keyboard${name}Show`, this.keyboardShow);
        this.keyboardHideListener = Keyboard.addListener(`keyboard${name}Hide`, this.keyboardHide);
    }

    keyboardShow = () => {
        Animated.parallel([
            Animated.timing(this.menuMarginTop, {
                toValue: -50,
                duration: ANIMATION_DURATION,
            }),
            Animated.timing(this.menuMarginBottom, {
                toValue: -50,
                duration: ANIMATION_DURATION,
            }),
        ]).start();
    };

    keyboardHide = () => {
        Animated.parallel([
            Animated.timing(this.menuMarginTop, {
                toValue: 0,
                duration: ANIMATION_DURATION,
            }),

            Animated.timing(this.menuMarginBottom, {
                toValue: 0,
                duration: ANIMATION_DURATION,
            }),
        ]).start();
    };

handelBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
};

handleAllPress = () => {
    this.setState({
        showAll: true,
        showImp: false,
        showOther: false,
    });
    const { setCheckedData } = this.props;
    setCheckedData([]);
};

handleImportantPress = () => {
    this.setState({
        showAll: false,
        showImp: true,
        showOther: false,
    });
    const { setCheckedData } = this.props;
    setCheckedData([]);
};

handleOtherPress = () => {
    this.setState({
        showAll: false,
        showImp: false,
        showOther: true,
    });
    const { setCheckedData } = this.props;
    setCheckedData([]);
};

handleAddPress = () => {
    const { addPress, selectMode } = this.state;
    if (!selectMode) {
        this.setState({ addPress: !addPress });
        const { setupTask } = this.props;
        setupTask({
            repeat: '1',
            task: '',
            important: false,
            addToElected: false,
        });
    }
};

handleTaskPress = () => {
    const { addPress, selectMode } = this.state;
    if (!selectMode) {
        this.setState({ addPress: !addPress });
    }
};

deleteTasks = () => {
    const { setupData, data, checkedData } = this.props;
    const newData = data.filter((item) => (
        !checkedData.some((val) => (val.id === item.id))
    ));
    setupData(newData);
    storeData(newData, GENERAL_DATA);
};

turnOffSelectMode = () => {
    const { setCheckedData } = this.props;
    this.setState({ selectMode: false });
    setCheckedData([]);
};

handelDeleteModalOkPress = () => {
    this.deleteTasks();
    this.turnOffSelectMode();
    this.setState({ showDeleteModal: false });
};

handelDeleteModalCancelPress = () => {
    this.turnOffSelectMode();
    this.setState({ showDeleteModal: false });
};

handleDeletePress = () => {
    const { selectMode } = this.state;
    const { checkedData } = this.props;
    if (selectMode && checkedData.length) {
        this.setState({ showDeleteModal: true });
    } else if (!checkedData.length && selectMode) {
        this.turnOffSelectMode();
    } else {
        this.setState({ selectMode: true });
    }
};

handleStarPress= () => {
    const { navigation } = this.props;
    navigation.navigate('ListOfElect');
};

handleTaskLongPress = () => {
    this.setState({ selectMode: true });
};

render() {
    const { data } = this.props;
    const {
        addPress,
        selectMode,
        menuShow,
        showAll,
        showImp,
        showOther,
        showDeleteModal,
    } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={containerStyle.container}>
          {menuShow ? (
            <Animated.View style={{ marginTop: this.menuMarginTop }}>
              <ListViewSwitch
                onPressAll={this.handleAllPress}
                onPressImportant={this.handleImportantPress}
                onPressOther={this.handleOtherPress}
              />
            </Animated.View>
) : null}

          <ListOfTasks
            data={data}
            styles={addPress ? { marginBottom: 10 } : { marginBottom: indents.marginBottomList }}
            OnPressTask={this.handleTaskPress}
            OnLongPressTask={this.handleTaskLongPress}
            selectMode={selectMode}
            showAll={showAll}
            showImp={showImp}
            showOther={showOther}
          />
          {addPress ? <NewTask close={this.handleTaskPress} withKeyboard={!menuShow} /> : null}
          {menuShow
          ? (
            <Animated.View style={{ marginBottom: this.menuMarginBottom }}>
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
                <Button
                  icon={
                    <Icon name="star" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                }
                  onPress={this.handleStarPress}
                />
              </BottomMenu>
            </Animated.View>
)
          : null}
          <CustomModal isVisible={showDeleteModal} title="Delete" text="Are you sure you want to delet this?">
            <Button text="Ok" onPress={this.handelDeleteModalOkPress} />
            <Button text="Cancel" onPress={this.handelDeleteModalCancelPress} />
          </CustomModal>
        </View>
      </TouchableWithoutFeedback>
    );
}
}

EditList.propTypes = {
    setupData: PropTypes.func,
    data: PropTypes.array,
    checkedData: PropTypes.array,
    setupTask: PropTypes.func,
    setCheckedData: PropTypes.func,
    navigation: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
    setupData: (data) => {
        dispatch(setupCurrentData(data));
    },
    setupTask: (task) => {
        dispatch(setupCurrentTask(task));
    },
    setCheckedData: (data) => {
        dispatch(setupCheckedData(data));
    },
});

const mapStateToProps = (state) => {
    const { data, checkedData } = state.data;
    return {
        data,
        checkedData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditList);
