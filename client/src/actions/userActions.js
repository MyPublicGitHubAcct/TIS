import axios from 'axios';

import {
  GET_ERRORS,
  GET_USER_BY_LOGON,
  // GET_USER_ID_BY_LOGON,
  GET_MGR_LIST,
  GET_DPT_LIST,
  GET_USER_ROLE_LIST,
  USER_LOADING
  // CLEAR_USER
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
// export const addUser = (userData, history) => dispatch => {
//   axios
//     .post('/routes/api/user/createUser', userData)
//     .then(res => history.push('/updateUser'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

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

// add a user's roles
// export const addUsersRole = (roleData, history) => dispatch => {
//   axios
//     .post('/routes/api/user/createUsersRole', roleData)
//     .then(res => history.push('/updateUser'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// add a user's roles
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

////////////////////////////////////////////

// get user ID by logon
// export const getUserIdByLogon = Logon => dispatch => {
//   dispatch(setUserLoading());
//   return new Promise((resolve, reject) => {
//     // axios
//     //   .get('/routes/api/user/readUserIdByLogon', {
//     //     params: { Logon: Logon }
//     //   })
//     //   .then(res =>
//     //     dispatch({
//     //       type: GET_USER_ID_BY_LOGON,
//     //       payload: res.data
//     //     })
//     //   )
//     //   .then(resolve('success'))
//     //   .catch(err =>
//     //     dispatch({
//     //       type: GET_ERRORS,
//     //       payload: err.response.data
//     //     })
//     //   );
//   });
// };

////////////////////////////////////////////

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

// clear user
// export const clearUser = () => {
//   return {
//     type: CLEAR_USER
//   };
// };

// errors
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
