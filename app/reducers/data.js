import { SETUP_DATA } from '../actions/data';
import { SETUP_CHECKED_DATA } from '../actions/checkedData';
import { SETUP_ELECT_DATA } from '../actions/ElectData';
import { SETUP_IS_NOT_EXPIRED } from '../actions/expirationDate';

const reducer = (state = {}, action) => {
    switch (action.type) {
    case SETUP_DATA:
        return {
            ...state,
            data: action.data,
        };
    case SETUP_CHECKED_DATA:
        return {
            ...state,
            checkedData: action.checkedData,
        };
    case SETUP_ELECT_DATA:
        return {
            ...state,
            electData: action.electData,
        };
    case SETUP_IS_NOT_EXPIRED:
        return {
            ...state,
            expirationDate: action.expirationDate,
        };
    default: return state;
    }
};

export default reducer;
