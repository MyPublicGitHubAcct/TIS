import { GET_USER_ID_BY_LOGON, USER_LOADING } from '../actions/types';

const initialState = {
  uid: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ID_BY_LOGON:
      return {
        ...state,
        uid: action.payload,
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
