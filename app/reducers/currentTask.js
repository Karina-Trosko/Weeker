import { SETUP_CURRENT_TASK } from '../actions/currentTask';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case SETUP_CURRENT_TASK:
            return {
                ...state,
                task: action.task,
            };
        default: return state;
    }
};

export default reducer;
