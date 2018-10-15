import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { getMgrList } from '../../actions/userActions';
import { getDptList } from '../../actions/userActions';
import { addUser } from '../../actions/userActions';
import { holdUserLogon, getUserByLogon } from '../../actions/userActions';
// import Spinner from '../common/Spinner';  // see 48 before UpdateUser
// import { clearUser } from '../../actions/userActions';

class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      FirstName: '',
      LastName: '',
      Manager: '',
      Logon: '',
      Password: '',
      Department: '',
      isManager: '',
      isActive: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getMgrList();
    this.props.getDptList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount() {
    this.setState({ errors: {} });
  }

  populateMgrOpts(options) {
    if (options) {
      return options.map((opt, index) => (
        <option key={index} value={parseInt(opt.ID, 10)}>
          {opt.FirstName + ' ' + opt.LastName}
        </option>
      ));
    } else {
      return (
        <option key="1" value="1">
          huh?
        </option>
      );
    }
  }

  populateDptOpts(options) {
    if (options) {
      return options.map((opt, index) => (
        <option key={index} value={parseInt(opt.ID, 10)}>
          {opt.Name}
        </option>
      ));
    } else {
      return (
        <option key="1" value="1">
          huh?
        </option>
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  onSubmit(e) {
    e.preventDefault();

    const im = this.state.isManager ? 1 : 0;
    const ia = this.state.isActive ? 1 : 0;

    const newUser = {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Manager: this.state.Manager,
      Logon: this.state.Logon,
      Password: this.state.Password,
      Department: this.state.Department,
      isManager: im,
      isActive: ia
    };

    this.props.holdUserLogon(this.state.Logon);
    this.props.addUser(newUser, this.props.history);
    this.props.getUserByLogon(this.state.Logon);
  }

  render() {
    const { errors } = this.state;
    const { mgrList, dptList } = this.props.user;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">AddUser</h1>
              <p className="lead text-center">Time and Issues</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="First name"
                    name="FirstName"
                    type="text"
                    value={this.state.FirstName}
                    onChange={this.onChange}
                    error={errors.FirstName}
                  />
                </div>

                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Last name"
                    name="LastName"
                    type="text"
                    value={this.state.LastName}
                    onChange={this.onChange}
                    error={errors.LastName}
                  />
                </div>

                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Please enter the user's ID."
                    name="Logon"
                    type="text"
                    value={this.state.Logon}
                    onChange={this.onChange}
                    error={errors.Logon}
                  />
                </div>

                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Please enter the user's password."
                    name="Password"
                    type="password"
                    value={this.state.Password}
                    onChange={this.onChange}
                    error={errors.Password}
                  />
                </div>

                <div className="form-group">
                  <select
                    required
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.Manager
                    })}
                    name="Manager"
                    value={this.state.Manager}
                    onChange={this.onChange}
                    error={errors.Manager}
                    id="Manager"
                  >
                    <option value="" hidden>
                      Please select a manager
                    </option>
                    {this.populateMgrOpts(mgrList)}
                  </select>
                  {errors.Manager && (
                    <div className="invalid-feedback">{errors.Manager}</div>
                  )}
                </div>

                <div className="form-group">
                  <select
                    required
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.Department
                    })}
                    name="Department"
                    value={this.state.Department}
                    onChange={this.onChange}
                    error={errors.Department}
                    id="Department"
                  >
                    <option value="" hidden>
                      Please select a department
                    </option>
                    {this.populateDptOpts(dptList)}
                  </select>
                  {errors.Department && (
                    <div className="invalid-feedback">{errors.Department}</div>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group form-check col mr-5">
                    <input
                      type="checkbox"
                      className={classnames('form-check-input')}
                      id="isManager"
                      name="isManager"
                      value={this.state.isManager}
                      onClick={this.onClick}
                    />
                    <label
                      className={classnames('form-check-label')}
                      htmlFor="isManager"
                    >
                      Is a manager
                    </label>
                  </div>

                  <div className="form-group form-check col">
                    <input
                      type="checkbox"
                      className={classnames('form-check-input')}
                      id="isActive"
                      name="isActive"
                      value={this.state.isActive}
                      onClick={this.onClick}
                    />
                    <label
                      className={classnames('form-check-label')}
                      htmlFor="isActive"
                    >
                      Is active
                    </label>
                  </div>
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddUser.propTypes = {
  addUser: PropTypes.func.isRequired,
  getMgrList: PropTypes.func.isRequired,
  getDptList: PropTypes.func.isRequired,
  holdUserLogon: PropTypes.func.isRequired,
  getUserByLogon: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addUser, getMgrList, getDptList, holdUserLogon, getUserByLogon }
)(withRouter(AddUser));
