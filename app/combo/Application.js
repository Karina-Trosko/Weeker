import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
    GENERAL_DATA,
    FAVOURITE_DATA,
    getStoredData,
    LANG,
} from '../services/localstorage';
import { setupCurrentData } from '../actions/data';
import { setupFavouriteData } from '../actions/FavouriteData';
import { setupCheckedData } from '../actions/checkedData';
import Navigator from '../config/routes';
import { changeLanguage } from '../i18n/i18n';

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
            setFavouriteData,
            setCheckedData,
        } = this.props;

        const data = await getStoredData(GENERAL_DATA);
        setupData(Array.isArray(data) ? data : []);

        const FavouriteData = await getStoredData(FAVOURITE_DATA);
        setFavouriteData(Array.isArray(FavouriteData) ? FavouriteData : []);

        setCheckedData([]);
        const lang = await getStoredData(LANG);
        if (lang) { changeLanguage(lang); }
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
    setFavouriteData: PropTypes.func,
    setCheckedData: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => ({
    setupData: (data) => {
        dispatch(setupCurrentData(data));
    },
    setFavouriteData: (data) => {
        dispatch(setupFavouriteData(data));
    },
    setCheckedData: (data) => {
        dispatch(setupCheckedData(data));
    },
});

export default connect(null, mapDispatchToProps)(Application);
