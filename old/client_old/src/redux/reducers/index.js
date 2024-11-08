import { combineReducers } from 'redux';

import authReducer from './authReducer';
import snackbarReducer from './snackbarReducer';


// Combine Reducers
const reducers = combineReducers({
  authState: authReducer,
  snackbarState: snackbarReducer,
});

export default reducers;
