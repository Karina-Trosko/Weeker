import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';

import ListItem from './ListItem';
import { setupCurrentData } from '../actions/data';

class ListOfTasks extends Component {
    handleOnPress = () => {
        console.log();
    };

    render() {
        const { data } = this.props;
        return (
          <View>
            <FlatList
              data={data || []}
              renderItem={({ item }) => (
                <ListItem data={item} onPress={this.handleOnPress} />)}
              keyExtractor={(item) => item.id}
            />
          </View>
        );
    }
}

ListOfTasks.propTypes = {
    data: PropTypes.array,
    setupData: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(ListOfTasks);
