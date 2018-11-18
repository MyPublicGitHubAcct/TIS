import {
  GET_USER_BY_LOGON,
  GET_MGR_LIST,
  GET_DPT_LIST,
  GET_USER_ROLE_LIST,
  POST_NEW_USER_WITH_ROLES,
  GET_USER_INFO_FOR_UPDATE_SELECT,
  GET_ROLE_LIST_FOR_USER_ID,
  USER_LOADING
} from '../actions/types';

const initialState = {
  userIndiInfo: null,
  userListUsers: null,
  userIndiRoles: null,
  userListMgrs: null,
  userListDepts: null,
  userListRoles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_BY_LOGON:
      return {
        ...state,
        userIndiInfo: action.payload,
        loading: false
      };
    case GET_USER_INFO_FOR_UPDATE_SELECT:
      return {
        ...state,
        userListUsers: action.payload,
        loading: false
      };
    case GET_ROLE_LIST_FOR_USER_ID:
      return {
        ...state,
        userIndiRoles: action.payload,
        loading: false
      };
    case GET_MGR_LIST:
      return {
        ...state,
        userListMgrs: action.payload,
        loading: false
      };
    case GET_DPT_LIST:
      return {
        ...state,
        userListDepts: action.payload,
        loading: false
      };
    case GET_USER_ROLE_LIST:
      return {
        ...state,
        userListRoles: action.payload,
        loading: false
      };
    case POST_NEW_USER_WITH_ROLES:
      return {
        ...state,
        loading: false
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
