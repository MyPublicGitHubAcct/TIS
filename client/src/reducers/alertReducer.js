import { ADD_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {
  id: null,
  message: null,
  style: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ALERT:
      return {
        ...state,
        id: action.id,
        message: action.message,
        style: action.style
      };
    case REMOVE_ALERT:
      return {
        ...state,
        id: null,
        message: null,
        style: null
      };
    default:
      return state;
  }
}

/** ideas from https://alexanderpaterson.com/posts/showing-and-dismissing-alerts-in-a-react-application */
