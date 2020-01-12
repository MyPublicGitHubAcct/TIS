import { ADD_ALERT, REMOVE_ALERT } from '../actions/types';

export const addAlert = (message, style) => {
  return {
    type: ADD_ALERT,
    message: message,
    style: style
  };
};

export const removeAlert = id => {
  return {
    type: REMOVE_ALERT,
    id: id
  };
};

/** ideas from https://alexanderpaterson.com/posts/showing-and-dismissing-alerts-in-a-react-application */
