import { combineReducers } from 'redux';
import data from './data';
import currentTask from './currentTask';

export default combineReducers({
    data,
    currentTask,
});
