import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import {
  addUser,
  getMgrList,
  getDptList,
  getUserIdByLogon,
  getUserRoleList,
  addUsersRole
} from '../../actions/userActions';

class AddUser extends Component {
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
    if (this.props.user.roles !== prevProps.user.roles) {
      this.setState({ roles: this.props.user.roles });
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
                value={this.state.roles[[role.ID].UserHas]}
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
    // console.log(`updated state.roles = ${JSON.stringify(this.state.roles)}`);
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

    // TODO - uncomment these
    // this.props.addUser(newUser, this.props.history);
    // this.props.getUserIdByLogon(this.state.Logon);

    // =====================TESTING BELOW===========================
    // TODO for each role, create object with UserId, RoleId, UserHas

    // console.log(JSON.stringify(this.state.roles));
    alert(JSON.stringify(this.state.roles[2]));

    // stuff that does not work here -
    // this.state.roles.forEach(role => {
    //   let userhas;
    //   if (role.UserHas == true) {
    //     userhas = 'true';
    //   } else {
    //     userhas = 'false';
    //   }
    //   let newUserRole = {
    //     // UserId: this.state.user.userId,
    //     UserId: 1,
    //     RoleId: role.ID,
    //     UserHas: userhas
    //   };
    //   console.log(`newUserRole = ${JSON.stringify(newUserRole)}`);
    //   // this.props.addUsersRole(newUserRole);
    // });
  }

  render() {
    const { errors } = this.state;
    const { mgrList, dptList, roles } = this.props.user;
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
                <br />
                <h2>User roles</h2>
                <table className="table table-bordered table-sm table-responsive{-sm|-md|-lg|-xl}">
                  <thead>
                    <tr>
                      <th scope="col">RoleName</th>
                      <th scope="col">UserHas</th>
                    </tr>
                  </thead>
                  <tbody>{this.populateRoleOpts(roles)}</tbody>
                </table>

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
  getUserIdByLogon: PropTypes.func.isRequired,
  getUserRoleList: PropTypes.func.isRequired,
  addUsersRole: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    addUser,
    getMgrList,
    getDptList,
    getUserIdByLogon,
    getUserRoleList,
    addUsersRole
  }
)(withRouter(AddUser));
