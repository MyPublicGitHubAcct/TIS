import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';

import testReducer from './testReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  user: userReducer,
  test: testReducer
});
