import { SETUP_DATA } from '../actions/data';
import { SETUP_DELETE_DATA } from '../actions/deleteData';

const reducer = (state = {}, action) => {
    switch (action.type) {
    case SETUP_DATA:
        return {
            ...state,
            data: action.data,
        };
    case SETUP_DELETE_DATA:
        return {
            ...state,
            deleteData: action.deleteData,
        };
    default: return state;
    }
};

export default reducer;
