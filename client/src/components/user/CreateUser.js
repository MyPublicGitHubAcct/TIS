import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import {
  getMgrList,
  getDptList,
  getUserRoleList,
  addUserWithRoles
} from '../../actions/userActions';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      Manager: '',
      Logon: '',
      Password: '',
      Department: '',
      isManager: '',
      isActive: '',
      roles: {},
      // submitted: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickRole = this.onClickRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getMgrList();
    this.props.getDptList();
    this.props.getUserRoleList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.ListRoles !== prevProps.user.ListRoles) {
      this.setState({ roles: this.props.user.ListRoles });
    }

    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
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

  populateRoleOpts(roles) {
    if (roles) {
      return roles.map(role => (
        <tr key={role.ID}>
          <td className="text-left">{role.RoleName}</td>
          <td>
            <div className="form-check">
              <input
                name={role.RoleName}
                id={role.ID}
                type="checkbox"
                className="form-check-input"
                value={this.state.roles[[role.ID - 1]].UserHas}
                onClick={this.onClickRole}
              />
            </div>
          </td>
        </tr>
      ));
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  onClickRole(e) {
    let newRoles = { ...this.state.roles };
    newRoles[e.target.id - 1].UserHas = e.target.checked;
    this.setState({ roles: newRoles });
  }

  onSubmit(e) {
    e.preventDefault();

    const im = this.state.isManager ? 1 : 0;
    const ia = this.state.isActive ? 1 : 0;
    const ma = parseInt(this.state.Manager, 10);
    const de = parseInt(this.state.Department, 10);

    const newUserDetails = {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Manager: ma,
      Logon: this.state.Logon,
      Password: this.state.Password,
      Department: de,
      isManager: im,
      isActive: ia
    };

    let stateRoles = this.state.roles;
    let newUserRoles = [];
    let ri;
    let uh;

    for (let r in stateRoles) {
      ri = stateRoles[r].ID;

      if (
        stateRoles[r].UserHas === 'false' ||
        stateRoles[r].UserHas === false
      ) {
        uh = 0;
      } else if (
        stateRoles[r].UserHas === 'true' ||
        stateRoles[r].UserHas === true
      ) {
        uh = 1;
      }

      newUserRoles.push({ RoleId: ri, UserHas: uh });
    }

    let newUser = {
      NewUser: [{ Details: newUserDetails, Roles: newUserRoles }]
    };

    // console.log('newUser = ' + JSON.stringify(newUser));

    this.props.addUserWithRoles(newUser);
    document.getElementById('SuccessAlert').classList.remove('hide');
    document.getElementById('SuccessAlert').classList.add('show');
    // TODO redirect here.
  }

  render() {
    const { errors } = this.state;
    const { ListMgrs, ListDepts, ListRoles } = this.props.user;
    // const { user } = this.props.auth;  // TODO make require some level of authority

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
                    {this.populateMgrOpts(ListMgrs)}
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
                    {this.populateDptOpts(ListDepts)}
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
                <br />
                <h2>User roles</h2>
                <table className="table table-bordered table-sm table-responsive{-sm|-md|-lg|-xl}">
                  <thead>
                    <tr>
                      <th scope="col">RoleName</th>
                      <th scope="col">UserHas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(this.state.roles).length > 0 ? (
                      this.populateRoleOpts(ListRoles)
                    ) : (
                      <React.Fragment>
                        <tr>
                          <td className="text-left">
                            <div>Loading</div>
                          </td>
                          <td className="text-left">
                            <div>Loading</div>
                          </td>
                        </tr>
                      </React.Fragment>
                    )}
                  </tbody>
                </table>

                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4 mb-3"
                />
              </form>
              {Object.keys(errors).length !== 0 ? (
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  Error: User was not added!
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              ) : null}
              <div
                id="SuccessAlert"
                className="alert alert-success alert-dismissible fade hide"
                role="alert"
              >
                Success: User was added!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateUser.propTypes = {
  getMgrList: PropTypes.func.isRequired,
  getDptList: PropTypes.func.isRequired,
  getUserRoleList: PropTypes.func.isRequired,
  addUserWithRoles: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getMgrList,
    getDptList,
    getUserRoleList,
    addUserWithRoles
  }
)(withRouter(CreateUser));
