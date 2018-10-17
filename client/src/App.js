import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import jwt_decode from 'jwt-decode';
import setAuthToken from './functions/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Dashboard from './components/layout/Dashboard';
import Login from './components/auth/Login';

import UserTimeTest1 from './components/test/UserTimeTest1';

import './App.css';

// persist user if token exists
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  // decode the token
  const decoded = jwt_decode(localStorage.jwtToken);
  // set current user as authenticated
  store.dispatch(setCurrentUser(decoded));
  // if token expired, logout user
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/timeTest1"
                  component={UserTimeTest1}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
