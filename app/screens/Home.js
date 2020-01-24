import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from 'react-native';
import { ListOfTasks, BottomMenu, ListViewSwitch } from '../common';
import { setupCurrentData } from '../actions/data';

const InitData = [{
    id: '1',
    task: 'task',
    repeat: '1',
    important: true,
}, {
    id: '2',
    task: 'task2',
    repeat: '1',
    important: true,
}, {
    id: '3',
    task: 'task3',
    repeat: '1',
    important: true,
}];

class Home extends Component {
    constructor(props) {
        super(props);
        const { setupData } = this.props;
        setupData(InitData);
    }

    render() {
        const { data } = this.props;
        return (
          <View style={{ flex: 1 }}>
            <ListViewSwitch />
            <ListOfTasks data={data} />
            <BottomMenu />
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
