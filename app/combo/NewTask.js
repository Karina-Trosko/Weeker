import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View, Text, Picker,
} from 'react-native';
import { connect } from 'react-redux';

import { setupCurrentData } from '../actions/data';
import {
    Input,
    Checkbox,
    Button,
} from '../common';
import { newTaskStyle, colors } from '../styles';

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
                addToElected: false,
            }
            : {
                repeat: '1',
                task: '',
                important: false,
                addToElected: false,
            };
    }

    handleSaveOnPress = () => {
        const { task: taskFromProps, setupData, close } = this.props;
        let { data } = this.props;
        const {
            repeat,
            task,
            important,
            addToElected,
        } = this.state;
        if (taskFromProps.id) {
            data = data.map((item) => ((item.id === taskFromProps.id) ? {
                id: item.id,
                repeat,
                task,
                important,
                addToElected,
            } : item));
        } else {
            data = data.map((item) => (item));
            data.push({
                id: String(Number(data[data.length - 1].id) + 1),
                repeat,
                task,
                important,
                addToElected,
            });
        }
        setupData(data);
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

    handleAddToElectedPress = () => {
        const { addToElected } = this.state;
        this.setState({ addToElected: !addToElected });
    };

    render() {
        const {
            repeat, important, addToElected, task,
        } = this.state;

        const { withKeyboard } = this.props;
        return (
          <View style={[newTaskStyle.container, withKeyboard ? { marginBottom: 0 } : null]}>
            <Input
              placeholder="Enter task..."
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
                <Text style={newTaskStyle.text}>important</Text>
              </View>
              <View style={newTaskStyle.option}>
                <Checkbox
                  selected={addToElected}
                  onPress={this.handleAddToElectedPress}
                  backgroundColor={colors.$primaryAccentColorVar}
                  underlayColor={colors.$primaryColorVar}
                />
                <Text style={newTaskStyle.text}>add to elected</Text>
              </View>
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
                <Text style={newTaskStyle.text}>repeat</Text>
              </View>
            </View>
            <View style={newTaskStyle.buttons}>
              <Button text="Cancel" onPress={this.handleCancelOnPress} />
              <Button text="Save" onPress={this.handleSaveOnPress} />
            </View>
          </View>
        );
    }
}

NewTask.propTypes = {
    task: PropTypes.object,
    data: PropTypes.array,
    setupData: PropTypes.func,
    close: PropTypes.func,
    withKeyboard: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => ({
    setupData: (data) => {
        dispatch(setupCurrentData(data));
    },
});

const mapStateToProps = (state) => {
    const { data } = state.data;
    const { task } = state.currentTask;
    return {
        data,
        task,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
