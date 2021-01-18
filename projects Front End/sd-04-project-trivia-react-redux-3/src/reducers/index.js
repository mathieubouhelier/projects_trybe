import { combineReducers } from 'redux';
import token from './token';
import login from './login';
import trivia from './trivia';
import StoreConfiguration from '../reducers/StoreConfiguration';

const rootReducer = combineReducers({
  login,
  token,
  trivia,
  StoreConfiguration,
});

export default rootReducer;
