import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View, Text, Picker,
} from 'react-native';
import { connect } from 'react-redux';
import I18n from '../i18n/i18n';

import { setupCurrentData } from '../actions/data';
import { setupFavouriteData } from '../actions/FavouriteData';
import {
    Input,
    Checkbox,
    Button,
} from '../common';
import { newTaskStyle, colors } from '../styles';
import { storeData, FAVOURITE_DATA, GENERAL_DATA } from '../services/localstorage';

class NewTask extends Component {
    repeats = ['1', '2', '3', '4', '5', '6', '7'];

    constructor(props) {
        super(props);
        const { task } = this.props;
        this.state = task
            ? {
                repeat: task.repeat,
                task: task.task,
                important: task.important,
            }
            : {
                repeat: '1',
                task: '',
                important: false,
                addToFavourite: false,
            };
    }

    addToFavouriteList = (repeat, task, important) => {
        const { setFavouriteData } = this.props;
        let { FavouriteData } = this.props;
        let newFavouriteData = [...FavouriteData];
        if (FavouriteData) {
            const id = newFavouriteData.length ? newFavouriteData[newFavouriteData.length - 1].id + 1 : 1;
            const newItem = {
                id, repeat, task, important,
            };
            newFavouriteData.push({ ...newItem });
        } else {
            newFavouriteData = [];
            newFavouriteData.push({
                id: 1, repeat, task, important,
            });
        }
        setFavouriteData(newFavouriteData);
        storeData(newFavouriteData, FAVOURITE_DATA);
    };

    createNewTask = () => {
        const {
            repeat,
            task,
            important,
            addToFavourite,
        } = this.state;
        const { data } = this.props;
        if (addToFavourite) {
            this.addToFavouriteList(repeat, task, important);
        }
        return {
            id: data.length ? data[data.length - 1].id + 1 : 1,
            repeat,
            task,
            important,
        };
    };

    updateTask = (id) => {
        const {
            repeat,
            task,
            important,
            addToFavourite,
        } = this.state;
        if (addToFavourite) {
            this.addToFavouriteList(repeat, task, important);
        }
        return {
            id,
            repeat,
            task,
            important,
        };
    };

    handleSaveOnPress = () => {
        const { task: taskFromProps, setupData, close } = this.props;
        let { data } = this.props;

        if (taskFromProps.id) {
            data = data.map((item) => ((item.id === taskFromProps.id)
                ? this.updateTask(item.id) : item));
        } else {
            data = data.map((item) => (item));
            data.push(this.createNewTask());
        }

        setupData(data);
        storeData(data, GENERAL_DATA);
        close();
    };

    handleCancelOnPress = () => {
        const { close } = this.props;
        close();
    };

    handleTextChange = (value) => {
        this.setState({ task: value });
    };

    handleImportantPress = () => {
        const { important } = this.state;
        this.setState({ important: !important });
    };

    handleAddToFavouritePress = () => {
        const { addToFavourite } = this.state;
        this.setState({ addToFavourite: !addToFavourite });
    };

    render() {
        const {
            repeat, important, addToFavourite, task,
        } = this.state;

        const { withKeyboard, task: taskFromProps } = this.props;
        return (
            <View style={[newTaskStyle.container, withKeyboard ? { marginBottom: 0 } : null]}>
                <Input
                    placeholder={I18n.t('enterTaskPlaseholder')}
                    onChangeText={this.handleTextChange}
                    value={task}
                />
                <View style={newTaskStyle.optionContainer}>
                    <View style={newTaskStyle.option}>
                        <Checkbox
                            selected={important}
                            onPress={this.handleImportantPress}
                            backgroundColor={colors.$primaryAccentColorVar}
                            underlayColor={colors.$primaryColorVar}
                        />
                        <Text style={newTaskStyle.text}>{I18n.t('checkboxImportantLable')}</Text>
                    </View>
                    {(taskFromProps.tesk)
                        ? null
                        : (
                            <View style={newTaskStyle.option}>
                                <Checkbox
                                    selected={addToFavourite}
                                    onPress={this.handleAddToFavouritePress}
                                    backgroundColor={colors.$primaryAccentColorVar}
                                    underlayColor={colors.$primaryColorVar}
                                />
                                <Text style={newTaskStyle.text}>{I18n.t('checkboxAddToFavorite')}</Text>
                            </View>
                        )}
                    <View style={newTaskStyle.option}>
                        <Picker
                            style={newTaskStyle.picker}
                            selectedValue={repeat}
                            onValueChange={(value) => this.setState({ repeat: value })}
                        >
                            {this.repeats.map((value) => (
                                <Picker.Item
                                    label={value}
                                    value={value}
                                    key={value}
                                />
                            ))}
                        </Picker>
                        <Text style={newTaskStyle.text}>{I18n.t('pickerRepeat')}</Text>
                    </View>
                </View>
                <View style={newTaskStyle.buttons}>
                    <Button text={I18n.t('buttonCancel')} onPress={this.handleCancelOnPress} />
                    <Button text={I18n.t('buttonSave')} onPress={this.handleSaveOnPress} disabled={!task} />
                </View>
            </View>
        );
    }
}

NewTask.propTypes = {
    task: PropTypes.object,
    data: PropTypes.array,
    FavouriteData: PropTypes.array,
    setupData: PropTypes.func,
    setFavouriteData: PropTypes.func,
    close: PropTypes.func,
    withKeyboard: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => ({
    setupData: (data) => {
        dispatch(setupCurrentData(data));
    },
    setFavouriteData: (data) => {
        dispatch(setupFavouriteData(data));
    },
});

const mapStateToProps = (state) => {
    const { data, FavouriteData } = state.data;
    const { task } = state.currentTask;

    return {
        data,
        task,
        FavouriteData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
