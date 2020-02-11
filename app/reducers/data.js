import { SETUP_DATA } from '../actions/data';
import { SETUP_CHECKED_DATA } from '../actions/checkedData';
import { SETUP_FAVOURITE_DATA } from '../actions/FavouriteData';

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
        case SETUP_FAVOURITE_DATA:
            return {
                ...state,
                FavouriteData: action.FavouriteData,
            };

        default: return state;
    }
};

export default reducer;
