import axios from 'axios';

import {
  GET_ERRORS,
  GET_USER_BY_LOGON,
  GET_USER_ID_BY_LOGON,
  GET_MGR_LIST,
  GET_DPT_LIST,
  GET_USER_ROLE_LIST,
  POST_NEW_USER_WITH_ROLES,
  USER_LOADING,
  CLEAR_ERRORS
} from '../actions/types';

const initialState = {};

// get mgr list
export const getMgrList = () => dispatch => {
  axios
    .get('/routes/api/user/readMgrList')
    .then(res =>
      dispatch({
        type: GET_MGR_LIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get dpt list
export const getDptList = () => dispatch => {
  axios
    .get('/routes/api/user/readDptList')
    .then(res =>
      dispatch({
        type: GET_DPT_LIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get user role list
export const getUserRoleList = () => dispatch => {
  axios
    .get('/routes/api/user/readUserRoleList')
    .then(res =>
      dispatch({
        type: GET_USER_ROLE_LIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
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

// add a new user with role assignments
// export const addUserWithRoles = NewUser => dispatch => {
//   // console.log(
//   //   'from userActions...NewUser = ' + JSON.stringify(NewUser)
//   // );
//   return new Promise(resolve => {
//     axios
//       .post('/routes/api/user/createUserWithRoles', NewUser)
//       .then(
//         dispatch({
//           type: POST_NEW_USER_WITH_ROLES
//         })
//       )
//       .then(resolve('success'))
//       .catch(err =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       );
//   });
// };
export const addUserWithRoles = NewUser => dispatch => {
  axios
    .post('/routes/api/user/createUserWithRoles', NewUser)
    .then(
      dispatch({
        type: POST_NEW_USER_WITH_ROLES
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get user by logon
export const getUserByLogon = Logon => dispatch => {
  dispatch(setUserLoading());
  axios
    .get('/routes/api/user/readUserByLogon', Logon)
    .then(res =>
      dispatch({
        type: GET_USER_BY_LOGON,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get user id by logon
export const getUserIdByLogon = Logon => dispatch => {
  dispatch(setUserLoading());
  axios
    .get('/routes/api/user/readUserIdByLogon', Logon)
    .then(res =>
      dispatch({
        type: GET_USER_ID_BY_LOGON,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// update user
export const updateUser = (userData, history) => dispatch => {
  axios
    .post('/routes/api/user/updateUser', userData)
    .then(res => history.push('/updateUser')) // success message?
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// user loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// errors
export const setErrorsClear = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
