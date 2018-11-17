import {
  GET_USER_BY_LOGON,
  GET_USER_ID_BY_LOGON,
  GET_MGR_LIST,
  GET_DPT_LIST,
  GET_USER_ROLE_LIST,
  POST_NEW_USER_WITH_ROLES,
  GET_USER_INFO_FOR_UPDATE_SELECT,
  USER_LOADING
} from '../actions/types';

const initialState = {
  userData: null,
  userInfo: null,
  userId: null,
  mgrList: null,
  dptList: null,
  roles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_BY_LOGON:
      return {
        ...state,
        userData: action.payload,
        loading: false
      };
    case GET_USER_INFO_FOR_UPDATE_SELECT:
      return {
        ...state,
        userInfo: action.payload,
        loading: false
      };
    case GET_USER_ID_BY_LOGON:
      return {
        ...state,
        userId: action.payload,
        loading: false
      };
    case GET_MGR_LIST:
      return {
        ...state,
        mgrList: action.payload,
        loading: false
      };
    case GET_DPT_LIST:
      return {
        ...state,
        dptList: action.payload,
        loading: false
      };
    case GET_USER_ROLE_LIST:
      return {
        ...state,
        roles: action.payload,
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
