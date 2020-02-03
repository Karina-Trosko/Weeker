import { SETUP_DATA } from '../actions/data';
import { SETUP_CHECKED_DATA } from '../actions/checkedData';
import { SETUP_ELECT_DATA } from '../actions/ElectData';

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
    default: return state;
    }
};

export default reducer;
