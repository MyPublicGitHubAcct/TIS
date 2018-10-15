import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Footer extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="bg-dark text-white mt-5 p-3 form-horizontal">
        <div className="container">
          <div className="row">
            <div className="text-left col-sm-6">
              Welcome {' ' + user.FirstName + ' (' + user.Logon + ')'}.
            </div>
            <div className="text-right col-sm-6">
              Today is {new Date().getFullYear()}/{new Date().getMonth()}/
              {new Date().getDay()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Footer);
