import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // apply token to every request header
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
