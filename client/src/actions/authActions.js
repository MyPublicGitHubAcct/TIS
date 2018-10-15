import axios from 'axios';
import setAuthToken from '../functions/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from '../actions/types';

const initialState = {};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/routes/api/auth/login', userData)
    .then(res => {
      // grab token
      const { token } = res.data;
      // save it to localStorage
      localStorage.setItem('jwtToken', token);
      // set it to Auth header
      setAuthToken(token);
      // decode it to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem('jwtToken');
  // remove auth header for future requests
  setAuthToken(false);
  // set current user to {} to set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// errors
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
