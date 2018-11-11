import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  onLogOutClick(e) {
    e.preventDefault();
    this.props.history.push('/');
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <div className="nav-item text-white col-sm-8">
          Welcome {' ' + user.FirstName + ' (' + user.Logon + ')'}.
        </div>

        <ul className="navbar-nav col-sm-2">
          <li className="nav-item">
            <a
              href="/login"
              className="nav-link"
              onClick={this.onLogOutClick.bind(this)}
            >
              Log out
            </a>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar  navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand col-sm-2" to="/">
            TIS
          </Link>
          {isAuthenticated ? authLinks : null}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
