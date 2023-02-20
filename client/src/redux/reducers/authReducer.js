import * as AT from '../actionTypes';

const authState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
};

export default function auth (state = authState, action) {
  switch (action.type) {

    // login
    case AT.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      };
    case AT.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
      };
    case AT.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message,
      };

    // logout
    case AT.LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      };
    case AT.LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}
