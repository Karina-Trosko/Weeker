import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    ListOfTasks,
    BottomMenu,
    ListViewSwitch,
    Button,
} from '../common';
import { setupCurrentData } from '../actions/data';
import { NewTask } from '../combo';
import { listStyle } from '../styles';

class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addPress: false,
        };
    }

handelBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
};

handleAllPress = () => {

};

handleAddPress = () => {
    const { addPress } = this.state;
    this.setState({ addPress: !addPress });
};

//  <ListOfTasks data={data} />
render() {
    const { data } = this.props;
    const { addPress } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ListViewSwitch />
        <ListOfTasks data={data} styles={addPress ? { marginBottom: 10 } : { marginBottom: 60 }} />
        {addPress ? <NewTask /> : null}
        <BottomMenu otherStyle={{ justifyContent: 'space-between' }}>
          <Button
            icon={
              <Icon name="arrow-left" color="red" size={30} resizeMode="contain" />
                  }
            onPress={this.handelBackPress}
          />
          <Button
            icon={
              <Icon name="plus" color="red" size={30} resizeMode="contain" />
                }
            onPress={this.handleAddPress}
          />
          <Button icon={
            <Icon name="trash-o" color="red" size={30} resizeMode="contain" />
                }
          />
          <Button icon={
            <Icon name="star" color="red" size={30} resizeMode="contain" />
                }
          />
        </BottomMenu>
      </View>
    );
}
}

EditList.propTypes = {
    setupData: PropTypes.func,
    data: PropTypes.array,
    navigation: PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(EditList);
