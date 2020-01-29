import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, ScrollView } from 'react-native';

import ListItem from './ListItem';
import { setupCurrentData } from '../actions/data';
import { indents } from '../styles';

class ListOfTasks extends Component {
    handleOnPress = () => {
    };

    render() {
        const { data, styles = { marginBottom: indents.marginBottomList } } = this.props;
        return (
          <ScrollView style={styles}>
            <FlatList
              data={data || []}
              renderItem={({ item }) => (
                <ListItem data={item} onPress={this.handleOnPress} />)}
              keyExtractor={(item) => item.id}
            />
          </ScrollView>
        );
    }
}

ListOfTasks.propTypes = {
    data: PropTypes.array,
    setupData: PropTypes.func,
    styles: PropTypes.object,
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
