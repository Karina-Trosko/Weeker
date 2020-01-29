import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View, Text, Picker,
} from 'react-native';
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
        this.state = {
            repeat: '1',
            task: '',
            important: false,
            addToElected: false,
        };
    }

    handleSaveOnPress = () => {};

    handleCancelOnPress = () => {};

    handleTextChange = (value) => {
        this.setState({ task: value });
    };

    handleImportantPress = () => {
        console.log('imp');
        const { important } = this.state;
        this.setState({ important: !important });
    };

    handleAddToElectedPress = () => {
        const { addToElected } = this.state;
        this.setState({ addToElected: !addToElected });
    };

    render() {
        const { repeat, important, addToElected } = this.state;
        return (
          <View style={newTaskStyle.container}>
            <Input placeholder="Enter task..." onChangeText={this.handleTextChange} />
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
              <Button text="Cancel" />
              <Button text="Save" />
            </View>
          </View>
        );
    }
}

export default NewTask;
