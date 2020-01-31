import { SETUP_DATA } from '../actions/data';
import { SETUP_CHECKED_DATA } from '../actions/checkedData';

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
    default: return state;
    }
};

export default reducer;
