import axios from 'axios';
import {
  GET_ERRORS,
  GET_USER_ID_BY_LOGON,
  USER_LOADING,
  CLEAR_ERRORS
} from './types';

export const getUserIdByLogon = Logon => dispatch => {
  dispatch(setUserLoading());

  axios
    .get('/routes/api/test/readUserIdByLogon', { params: { logon: Logon } })
    .then(res => {
      dispatch({
        type: GET_USER_ID_BY_LOGON,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const setErrorsClear = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};
