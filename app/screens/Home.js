import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { getLanguages } from 'react-native-i18n';
import I18n, { changeLanguage } from '../i18n/i18n';

import {
    ListOfTasks,
    BottomMenu,
    ListViewSwitch,
    Title,
    Button,
} from '../common';
import { setupCurrentData } from '../actions/data';
import { setupElectData } from '../actions/ElectData';
import { containerStyle, colors, buttonWithIconStyle } from '../styles';
import { setupCheckedData } from '../actions/checkedData';
import {
    GENERAL_DATA,
    EXPIRATION_DATE,
    storeData,
    getStoredData,
    LANG,
} from '../services/localstorage';
import { CustomModal } from '../combo';

class Home extends Component {
    languages=['en', 'ru'];

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
            showLangModal: false,
            lang: 'en',
        };
        getLanguages().then((languages) => {
            this.setState({ lang: languages[0] });
        });
    }

    async componentWillMount() {
        if (await this.isNew()) { this.setState({ showCreateModal: true }); } else { this.setState({ showIsExpiredModal: await this.isExpire() }); }
    }

isNew = async () => {
    const date = new Date(await getStoredData(EXPIRATION_DATE));
    return Boolean(date);
};

    isExpire = async () => {
        const date = new Date(await getStoredData(EXPIRATION_DATE));
        const today = new Date();
        // today.setDate(date.getDate());
        return Boolean(date && (date.getFullYear() < today.getFullYear()
        || date.getMonth() < today.getMonth()
        || ((date.getMonth() === today.getMonth()) && (date.getDate() <= today.getDate()))));
    };

    handleModalDelete = () => {
        const { setupData } = this.props;
        setupData([]);
        storeData([], GENERAL_DATA);
        this.setState({
            showIsExpiredModal: false,
            showCreateModal: true,
        });
    };

    handleModalSave = () => {
        this.setState({
            showIsExpiredModal: false,
            showCreateModal: true,
        });
    };

    turnOffSelectMode = () => {
        const { setCheckedData } = this.props;
        this.setState({ selectMode: false });
        setCheckedData([]);
    };

    doneTasks = () => {
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
        setTimeout(() => this.setState({ showCreateModal: true }), 1000);
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

    handleLanguagePress = () => {
        this.setState({ showLangModal: true });
    };

    handleLangModalSave = () => {
        this.setState({ showLangModal: false });
        const { lang } = this.state;
        storeData(lang, LANG);
        changeLanguage(lang);
    };

    handleLangModalCancel = () => {
        this.setState({ showLangModal: false });
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
            showLangModal,
            lang,
        } = this.state;
        return (
            <View style={containerStyle.container}>
                <Title title={I18n.t('homeTitle')} />
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
                <BottomMenu otherStyle={{ justifyContent: 'space-around' }}>
                    {data.length ? (
                        <Button
                            text={I18n.t('buttonCreateNew')}
                            styles={buttonWithIconStyle}
                            icon={
                                <Icon name="list-unordered" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                            }
                            onPress={this.handelCreateNewPress}
                        />
                    ) : null}
                    {!(data.length)
                        ? (
                            <Button
                                text={I18n.t('buttonCreateList')}
                                styles={buttonWithIconStyle}
                                icon={
                                    <Icon name="list-unordered" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                                }
                                onPress={this.handelCreatePress}
                            />
                        )
                        : (
                            <Button
                                text={I18n.t('buttonEdit')}
                                styles={buttonWithIconStyle}
                                icon={
                                    <Icon name="pencil" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                                }
                                onPress={this.handelEditPress}
                            />
                        )}
                    <Button
                        text={I18n.t('buttonDone')}
                        styles={buttonWithIconStyle}
                        icon={
                            <Icon name="checklist" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                        }
                        onPress={this.handleDonePress}
                    />
                    <Button
                        text={I18n.t('buttonLanguage')}
                        styles={buttonWithIconStyle}
                        icon={
                            <EntypoIcon name="language" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
                        }
                        onPress={this.handleLanguagePress}
                    />
                </BottomMenu>
                <CustomModal isVisible={showIsExpiredModal} title={I18n.t('newWeekModalTitle')} text={I18n.t('newWeekModalText')}>
                    <Button text={I18n.t('buttonSave')} onPress={this.handleModalSave} />
                    <Button text={I18n.t('buttonDelete')} onPress={this.handleModalDelete} />
                </CustomModal>
                <CustomModal isVisible={showCreateModal} title={I18n.t('createListModalTitle')} text={I18n.t('createListModalText')}>
                    <Button text={I18n.t('buttonThis')} onPress={this.handleThisPress} />
                    <Button text={I18n.t('buttonNext')} onPress={this.handleNextPress} />
                </CustomModal>
                <CustomModal isVisible={showDoneModal} title={I18n.t('doneModalTitle')} text={I18n.t('doneModalText')}>
                    <Button text={I18n.t('buttonOk')} onPress={this.handleModalDoneOkPress} />
                    <Button text={I18n.t('buttonCancel')} onPress={this.handleModalDoneCancelPress} />
                </CustomModal>
                <CustomModal isVisible={showCreateNewModal} title={I18n.t('createListModalTitle')} text={I18n.t('createNewListModalText')}>
                    <Button text={I18n.t('buttonOk')} onPress={this.handelCreateNewModalOkPress} />
                    <Button text={I18n.t('buttonCancel')} onPress={this.handelCreateNewModalCancelPress} />
                </CustomModal>
                <CustomModal
                    isVisible={showLangModal}
                    title={I18n.t('languageModalTitle')}
                    additionalChildren={(
                        <Picker
                            style={{ width: 100, color: colors.$primaryColorVar }}
                            selectedValue={lang}
                            onValueChange={(value) => this.setState({ lang: value })}
                        >
                            {this.languages.map((value) => (
                                <Picker.Item
                                    label={value}
                                    value={value}
                                    key={value}
                                />
                            ))}
                        </Picker>
                    )}
                >
                    <Button text={I18n.t('buttonSave')} onPress={this.handleLangModalSave} />
                    <Button text={I18n.t('buttonCancel')} onPress={this.handleLangModalCancel} />
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
