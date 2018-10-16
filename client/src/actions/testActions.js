import axios from 'axios';

import { GET_ERRORS, GET_USER_ID_BY_LOGON, USER_LOADING } from './types';

const initialState = {};

// BEGIN >>> get user ID by logon
export const getUserIdByLogon = Logon => dispatch => {
  dispatch(setUserLoading());

  axios
    .get('/routes/api/test/readUserIdByLogon', Logon)
    .then(res => {
      console.log('yes!....' + res.data);
      dispatch({
        type: GET_USER_ID_BY_LOGON,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('noooo!....' + err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// END >>> get user ID by logon

// BEGIN >>> user loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// END >>> user loading

// BEGIN >>> errors
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
// END >>> errors
