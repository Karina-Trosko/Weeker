import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    ListOfTasks,
    BottomMenu,
    ListViewSwitch,
    Title,
    Button,
} from '../common';
import { setupCurrentData } from '../actions/data';

const InitData = [{
    id: '1',
    task: 'task',
    repeat: '',
    important: true,
}, {
    id: '2',
    task: 'task2',
    repeat: '3',
    important: true,
}, {
    id: '3',
    task: 'task3',
    repeat: '',
    important: true,
},
{
    id: '4',
    task: 'task',
    repeat: '1',
    important: true,
}, {
    id: '5',
    task: 'task2',
    repeat: '1',
    important: true,
}, {
    id: '6',
    task: 'task3',
    repeat: '1',
    important: true,
},
{
    id: '7',
    task: 'task3',
    repeat: '3',
    important: true,
}, {
    id: '8',
    task: 'task3',
    repeat: '1',
    important: true,
},
{
    id: '9',
    task: 'task3jshdgs jhgjhgjhgjsh bdjyg fjrhdbhegjyrg thrbrduuf ytty t ty ty ty ty tytuty ',
    repeat: '1',
    important: true,
}];

class Home extends Component {
    constructor(props) {
        super(props);
        const { setupData } = this.props;
        setupData(InitData);
    }

handelEditPress = () => {

};

handleAllPress = () => {

};

render() {
    const { data } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Title title="Tasks for this week: " />
        <ListViewSwitch />
        <ListOfTasks data={data} />
        <BottomMenu>
          <Button
            text="Edit list"
            icon={
              <Icon name="fountain-pen" color="red" size={30} resizeMode="contain" />
                }
            onPress={this.handelEditPress}
          />
        </BottomMenu>
      </View>
    );
}
}

Home.propTypes = {
    setupData: PropTypes.func,
    data: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    setupData: (data) => {
        dispatch(setupCurrentData(data));
    },
});

const mapStateToProps = (state) => {
    const { data } = state.data;
    return {
        data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
