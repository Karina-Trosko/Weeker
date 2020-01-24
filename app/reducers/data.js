import { SETUP_DATA } from '../actions/data';

const reducer = (state = {}, action) => {
    switch (action.type) {
    case SETUP_DATA:
        return {
            ...state,
            data: action.data,
        };
    default: return state;
    }
};

export default reducer;
