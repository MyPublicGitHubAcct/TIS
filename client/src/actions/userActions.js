import axios from 'axios';

import {
  GET_ERRORS,
  GET_USER_BY_LOGON,
  STORE_USER_ID,
  GET_MGR_LIST,
  GET_DPT_LIST,
  GET_USER_ROLE_LIST,
  POST_NEW_USER_WITH_ROLES,
  POST_UPDATED_USER_WITH_ROLES,
  USER_LOADING,
  GET_USER_INFO_FOR_UPDATE_SELECT,
  GET_ROLE_LIST_FOR_USER_ID,
  CLEAR_ERRORS
} from '../actions/types';

const initialState = {};

// get mgr list
export const getMgrList = () => dispatch => {
  axios
    .get('/routes/api/user/readMgrList')
    .then(res => dispatch({ type: GET_MGR_LIST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// get dpt list
export const getDptList = () => dispatch => {
  axios
    .get('/routes/api/user/readDptList')
    .then(res => dispatch({ type: GET_DPT_LIST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// get user role list
export const getUserRoleList = () => dispatch => {
  axios
    .get('/routes/api/user/readUserRoleList')
    .then(res => dispatch({ type: GET_USER_ROLE_LIST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// add user
export const addUser = userData => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post('/routes/api/user/createUser', userData)
      .then(resolve('success'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  });
};

// add a user's roles one at a time
export const addUsersRole = roleData => dispatch => {
  return new Promise(resolve => {
    axios
      .post('/routes/api/user/createUsersRole', roleData)
      .then(resolve('success'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  });
};

// get user info for update select
export const getUserInfoForUpdateSelect = () => dispatch => {
  return new Promise(resolve => {
    axios
      .get('/routes/api/user/readUserInfoForUpdateSelect')
      .then(res =>
        dispatch({ type: GET_USER_INFO_FOR_UPDATE_SELECT, payload: res.data })
      )
      .then(resolve('success'))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  });
};

// get roles for a specific user
export const getRoleListForUserId = userid => dispatch => {
  return new Promise(resolve => {
    axios
      .get('/routes/api/user/readRoleListForUserId', {
        params: { userid: userid }
      })
      .then(res =>
        dispatch({ type: GET_ROLE_LIST_FOR_USER_ID, payload: res.data })
      )
      .then(resolve('success'))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  });
};

// add a new user with role assignments
export const addUserWithRoles = NewUser => dispatch => {
  return new Promise((resolve, reject) => {
    if (!NewUser) {
      reject('No NewUser recieved.');
      return;
    }

    axios
      .post('/routes/api/user/createUserWithRoles', NewUser)
      .then(dispatch({ type: POST_NEW_USER_WITH_ROLES }))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));

    // const req = axios
    //   .post('/routes/api/user/createUserWithRoles', NewUser)
    //   .then(dispatch({ type: POST_NEW_USER_WITH_ROLES }))
    //   .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));

    // req.then(resolve(req));
  });
};

// update a user with their role assignments
export const updateUserWithRoles = UpdatedUser => dispatch => {
  console.log(JSON.stringify(UpdatedUser));
  axios
    .post('/routes/api/user/updateUserWithRoles', UpdatedUser)
    .then(dispatch({ type: POST_UPDATED_USER_WITH_ROLES }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// get user by logon
export const getUserByLogon = Logon => dispatch => {
  dispatch(setUserLoading());
  axios
    .get('/routes/api/user/readUserByLogon', Logon)
    .then(res => dispatch({ type: GET_USER_BY_LOGON, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// store user id
export const storeUserId = ID => dispatch => {
  dispatch({ type: STORE_USER_ID, payload: ID + 1 });
};

// update user
export const updateUser = (userData, history) => dispatch => {
  axios
    .post('/routes/api/user/updateUser', userData)
    .then(res => history.push('/updateUser')) // success message?
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// user loading
export const setUserLoading = () => {
  return { type: USER_LOADING };
};

// errors
export const setErrorsClear = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
