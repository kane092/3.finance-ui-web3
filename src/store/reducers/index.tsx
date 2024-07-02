import { combineReducers } from 'redux';

import globalReducer from './globalReducer';
import navbarReducer from './navbarReducer';

export default combineReducers ({
  global: globalReducer,
  navbar: navbarReducer,
});