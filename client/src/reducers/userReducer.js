import {
  GET_USER_BY_LOGON,
  STORE_USER_ID,
  GET_MGR_LIST,
  GET_DPT_LIST,
  GET_USER_ROLE_LIST,
  POST_NEW_USER_WITH_ROLES,
  POST_UPDATED_USER_WITH_ROLES,
  GET_USER_INFO_FOR_UPDATE_SELECT,
  GET_ROLE_LIST_FOR_USER_ID,
  USER_LOADING
} from '../actions/types';

const initialState = {
  IndiId: null,
  ListUsers: null,
  IndiRoles: null,
  ListMgrs: null,
  ListDepts: null,
  ListRoles: null,
  UserCreated: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_BY_LOGON:
      return {
        ...state,
        loading: false
      };
    case STORE_USER_ID:
      return {
        ...state,
        IndiId: action.payload,
        loading: false
      };
    case GET_USER_INFO_FOR_UPDATE_SELECT:
      return {
        ...state,
        ListUsers: action.payload,
        loading: false
      };
    case GET_ROLE_LIST_FOR_USER_ID:
      return {
        ...state,
        IndiRoles: action.payload,
        loading: false
      };
    case GET_MGR_LIST:
      return {
        ...state,
        ListMgrs: action.payload,
        loading: false
      };
    case GET_DPT_LIST:
      return {
        ...state,
        ListDepts: action.payload,
        loading: false
      };
    case GET_USER_ROLE_LIST:
      return {
        ...state,
        ListRoles: action.payload,
        loading: false
      };
    case POST_NEW_USER_WITH_ROLES:
      return {
        ...state,
        loading: false
      };
    case POST_UPDATED_USER_WITH_ROLES:
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
