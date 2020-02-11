import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import I18n from '../i18n/i18n';

import {
    ListOfTasks,
    BottomMenu,
    Title,
    Button,
} from '../common';
import { CustomModal } from '../combo';
import { setupCurrentData } from '../actions/data';
import { setupCheckedData } from '../actions/checkedData';
import { setupFavouriteData } from '../actions/FavouriteData';
import { containerStyle, colors, indents, buttonWithIconStyle } from '../styles';
import { storeData, FAVOURITE_DATA, GENERAL_DATA } from '../services/localstorage';

class ListOfFavourite extends Component {
    constructor(props) {
        super(props);
        if (!props.FavouriteData) { props.setFavouriteData([]); }
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
    const newData = [...data];
    let id = newData.length ? newData[newData.length - 1].id + 1 : 1;

    checkedData.forEach((item) => {
        const newItem = { ...item };
        newItem.id = id;
        id++;
        newData.push({ ...newItem });
    });
    setupData(newData.map((item) => item));
    storeData(newData.map((item) => item), GENERAL_DATA);
    this.resetCheckedTasks();
};

handleAddPress = () => {
    this.addCheckedTasks();
};

deleteCheckedTasks = () => {
    const { setFavouriteData, FavouriteData, checkedData } = this.props;
    const newData = FavouriteData.filter((item) => !checkedData.some((val) => (val.id === item.id)));

    setFavouriteData(newData);
    storeData(newData, FAVOURITE_DATA);
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
    const { FavouriteData } = this.props;
    const { showDeleteModal } = this.state;
    return (
        <View style={containerStyle.container}>
            <Title title={I18n.t('listOfFavouriteTitle')} />
            <ListOfTasks
                data={FavouriteData}
                styles={{ marginBottom: indents.marginBottomList }}
                selectedMode
            />
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
                        <EntypoIcon name="add-to-list" color={colors.$primaryAccentColorVar} size={30} resizeMode="contain" />
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
            </BottomMenu>
            <CustomModal isVisible={showDeleteModal} title={I18n.t('deleteModalTitle')} text={I18n.t('deleteModalText')}>
                <Button text={I18n.t('buttonOk')} onPress={this.handelDeleteModalOkPress} />
                <Button text={I18n.t('buttonCancel')} onPress={this.handelDeleteModalCancelPress} />
            </CustomModal>
        </View>
    );
}
}

ListOfFavourite.propTypes = {
    setupData: PropTypes.func,
    setFavouriteData: PropTypes.func,
    data: PropTypes.array,
    FavouriteData: PropTypes.array,
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
    setFavouriteData: (data) => {
        dispatch(setupFavouriteData(data));
    },
});

const mapStateToProps = (state) => {
    const { data, checkedData, FavouriteData } = state.data;
    return {
        data,
        checkedData,
        FavouriteData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfFavourite);
