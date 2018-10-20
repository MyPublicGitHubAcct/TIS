import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import BtnGroup from '../common/BtnGroup';
import AlertGroup from '../common/AlertGroup';
import { getUserIdByLogon, setErrorsClear } from '../../actions/testActions';

class UserIdTest extends Component {
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
    this.props.setErrorsClear();
    this.props.getUserIdByLogon(this.state.Logon);
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
      <div className="userIdTest">
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
              <br />
              {uid ? (
                <AlertGroup
                  type="success"
                  id="collapseAlert"
                  msg={`${this.state.Logon} is user id ${uid.ID}`}
                />
              ) : (
                <AlertGroup
                  type="failure"
                  id="collapseAlert"
                  msg={`...nope, can't find ${this.state.Logon}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserIdTest.props = {
  auth: PropTypes.object.isRequired,
  getUserIdByLogon: PropTypes.func.isRequired,
  setErrorsClear: PropTypes.func.isRequired,
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
  { getUserIdByLogon, setErrorsClear }
)(UserIdTest);
