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
import I18n from '../i18n/i18n';

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
import { containerStyle, colors, indents, buttonWithIconStyle } from '../styles';
import { storeData, GENERAL_DATA } from '../services/localstorage';

const ANIMATION_DURATION = 400;

class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addPress: false,
            selectedMode: false,
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
                toValue: -55,
                duration: ANIMATION_DURATION,
            }),
            Animated.timing(this.menuMarginBottom, {
                toValue: -55,
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
    const { addPress, selectedMode } = this.state;
    if (!selectedMode) {
        this.setState({ addPress: !addPress });
        const { setupTask } = this.props;
        setupTask({
            repeat: '1',
            task: '',
            important: false,
            addToFavourite: false,
        });
    }
};

handleTaskPress = () => {
    const { addPress, selectedMode } = this.state;
    if (!selectedMode) {
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

turnOffselectedMode = () => {
    const { setCheckedData } = this.props;
    this.setState({ selectedMode: false });
    setCheckedData([]);
};

handelDeleteModalOkPress = () => {
    this.deleteTasks();
    this.turnOffselectedMode();
    this.setState({ showDeleteModal: false });
};

handelDeleteModalCancelPress = () => {
    this.turnOffselectedMode();
    this.setState({ showDeleteModal: false });
};

handleDeletePress = () => {
    const { selectedMode } = this.state;
    const { checkedData } = this.props;
    if (selectedMode && checkedData.length) {
        this.setState({ showDeleteModal: true });
    } else if (!checkedData.length && selectedMode) {
        this.turnOffselectedMode();
    } else {
        this.setState({ selectedMode: true });
    }
};

handleStarPress= () => {
    const { navigation } = this.props;
    navigation.navigate('ListOfFavourite');
};

handleTaskLongPress = () => {
    this.setState({ selectedMode: true });
};

render() {
    const { data } = this.props;
    const {
        addPress,
        selectedMode,
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
                    selectedMode={selectedMode}
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
                                    text={I18n.t('buttonBack')}
                                    styles={buttonWithIconStyle}
                                    icon={
                                        <Icon name="arrow-left" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                                    }
                                    onPress={this.handelBackPress}
                                />
                                <Button
                                    text={I18n.t('buttonAdd')}
                                    styles={buttonWithIconStyle}
                                    icon={
                                        <Icon name="plus" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                                    }
                                    onPress={this.handleAddPress}
                                />
                                <Button
                                    text={I18n.t('buttonDelete')}
                                    styles={buttonWithIconStyle}
                                    icon={
                                        <Icon name="trash-o" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                                    }
                                    onPress={this.handleDeletePress}
                                />
                                <Button
                                    text={I18n.t('buttonFavourite')}
                                    styles={buttonWithIconStyle}
                                    icon={
                                        <Icon name="star" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                                    }
                                    onPress={this.handleStarPress}
                                />
                            </BottomMenu>
                        </Animated.View>
                    )
                    : null}
                <CustomModal isVisible={showDeleteModal} title={I18n.t('deleteModalTitle')} text={I18n.t('deleteModalText')}>
                    <Button text={I18n.t('buttonOk')} onPress={this.handelDeleteModalOkPress} />
                    <Button text={I18n.t('buttonCancel')} onPress={this.handelDeleteModalCancelPress} />
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
