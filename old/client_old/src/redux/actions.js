import * as AT from './actionTypes';
import ClientConfig from '../config/config.client';

const protocol = ClientConfig.server.protocol;
const host = ClientConfig.server.host;
const port = ClientConfig.server.port;
const url = `${protocol}://${host}:${port}`;


export function loginUser (body) {

  body = {
    ...body,
    clientkey: ClientConfig.clientkey,
  };

  return dispatch => {

    dispatch(requestLogin(body));

    let options = {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(body),
    };

    fetch(`${url}/api/login`, options)
      .then(response => response.json())
      .then(data => {

        if (data.status === 'ok') {

          localStorage.setItem('token', data.data.token);
          dispatch(receiveLogin());

        } else {

          let obj = {
            isOpen: true,
            type: 'error',
            message: 'Error: Incorect login or password!',
            time: 3000,
          };
          // dispatch(snackbarupdate(obj));

          alert('Incorect pasword');

          dispatch(loginError('Auth error'));
          return Promise.reject('Auth error');
        }

      }).catch(err => console.log('Error: ', err));
  };
}

function requestLogin (creds) {
  return {
    type: AT.LOGIN_REQUEST,
    creds,
  };
}

function receiveLogin () {
  return {
    type: AT.LOGIN_SUCCESS,
  };
}

function loginError (message) {
  return {
    type: AT.LOGIN_FAILURE,
    message,
  };
}


// Logs the user out
export function logoutUser () {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('token');
    dispatch(receiveLogout());
  };
}

function requestLogout () {
  return {
    type: AT.LOGOUT_REQUEST,
  };
}

function receiveLogout () {
  return {
    type: AT.LOGOUT_SUCCESS,
  };
}

// snackbar
export function snackbarupdate (value) {
  return {
    type: AT.SNACKBARUPDATE,
    snackbar: value,
  };
}

export function snackbarclose () {
  return {
    type: AT.SNACKBARCLOSE,
  };
}


