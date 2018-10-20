import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import BtnGroup from '../common/BtnGroup';
import AlertGroup from '../common/AlertGroup';
import { getUserIdByLogon } from '../../actions/testActions';

class UserTimeTest1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Logon: '',
      test: {},
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    //clear state.Logon?
    this.props.getUserIdByLogon(this.state.Logon);
  }

  needAlert(uid) {
    if (uid) {
      return (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Holy guacamole!</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    } else {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>You are a failure!</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  componentWillUnmount() {
    this.setState({ errors: {} });
  }

  render() {
    const { errors } = this.state;
    const { uid } = this.props.test;
    const { user } = this.props.auth;

    return (
      <div className="userTimeTest1">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="text-center">User Time Test 1</h2>
              <p className="lead text-center">Get user id by logon</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Enter Logon"
                    name="Logon"
                    type="text"
                    value={this.state.Logon}
                    onChange={this.onChange}
                    error={errors.Logon}
                    disabled={user.AdminAll === 'false' ? 'disabled' : ''}
                  />
                </div>
                <BtnGroup
                  datatoggle="collapse"
                  datatarget="#collapseAlert"
                  ariaexpanded="false"
                  ariacontrols="collapseAlert"
                  type="submit"
                  name="submit"
                  value={
                    user.AdminAll === 'true'
                      ? 'You have permission to press this.'
                      : 'You cannot press this.'
                  }
                  disabled={user.AdminAll === 'false' ? true : false}
                />
              </form>
              {uid ? uid.ID : 'still waiting for you to click the button...'}
              <br />
              {uid ? (
                <AlertGroup type="success" id="collapseAlert" msg={uid.ID} />
              ) : (
                <AlertGroup type="failure" id="collapseAlert" msg="...nope" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserTimeTest1.props = {
  auth: PropTypes.object.isRequired,
  getUserIdByLogon: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  test: PropTypes.object.isRequired
};

// define props in this component
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  test: state.test
});

export default connect(
  mapStateToProps,
  { getUserIdByLogon }
)(UserTimeTest1);
