import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
    GENERAL_DATA,
    ELECT_DATA,
    getStoredData,
} from '../services/localstorage';
import { setupCurrentData } from '../actions/data';
import { setupElectData } from '../actions/ElectData';
import { setupCheckedData } from '../actions/checkedData';
import Navigator from '../config/routes';

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
    }

    async componentDidMount() {
        await this.loadData();

        this.setState({ isReady: true });
    }

    loadData = async () => {
        const {
            setupData,
            setElectData,
            setCheckedData,
        } = this.props;

        const data = await getStoredData(GENERAL_DATA);
        setupData(Array.isArray(data) ? data : []);

        const electData = await getStoredData(ELECT_DATA);
        setElectData(Array.isArray(electData) ? electData : []);

        setCheckedData([]);
    };

    render() {
        const { isReady } = this.state;
        if (!isReady) {
            return null;
        }
        return (
          <Navigator />
        );
    }
}
Application.propTypes = {
    setupData: PropTypes.func,
    setElectData: PropTypes.func,
    setCheckedData: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => ({
    setupData: (data) => {
        dispatch(setupCurrentData(data));
    },
    setElectData: (data) => {
        dispatch(setupElectData(data));
    },
    setCheckedData: (data) => {
        dispatch(setupCheckedData(data));
    },
});

export default connect(null, mapDispatchToProps)(Application);
