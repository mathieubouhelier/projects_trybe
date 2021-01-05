import { combineReducers } from 'redux';
import planetReducer from './planetReducer';
import filters from './FilterReducer';


const rootReducer = combineReducers({ planetReducer, filters });

export default rootReducer;
