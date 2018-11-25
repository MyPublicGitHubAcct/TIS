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
  getUserInfoForUpdateSelect,
  getRoleListForUserId,
  storeUserId
} from '../../actions/userActions';

// const store = require('./../../store'); // used in onChangeUserIdSelect to print state

class UpdateUser extends Component {
  constructor(props) {
    // console.log('constructor');
    super(props);
    this.state = {
      SelectUserId: '',
      UserId: '',
      FirstName: '',
      LastName: '',
      Manager: '',
      Department: '',
      isManager: '',
      isActive: '',
      userIndiRoles: [],
      rolesReceived: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeUserIdSelect = this.onChangeUserIdSelect.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickRole = this.onClickRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // console.log('componentDidMount');
    this.props.getMgrList();
    this.props.getDptList();
    this.props.getUserRoleList();
    this.props.getUserInfoForUpdateSelect();
  }

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate');
    if (this.props.user.userListRoles !== prevProps.user.userListRoles) {
      this.setState({ userIndiRoles: this.props.user.userListRoles });
    }

    if (this.props.user.userIndiId !== prevProps.user.userIndiId) {
      this.props.getRoleListForUserId(this.props.user.userIndiId);
    }

    if (this.props.user.userIndiRoles !== prevProps.user.userIndiRoles) {
      // console.log(
      //   'prevProps.user.userIndiRoles = ' +
      //     JSON.stringify(prevProps.user.userIndiRoles)
      // );
      // console.log(
      //   'this.props.user.userIndiRoles = ' +
      //     JSON.stringify(this.props.user.userIndiRoles)
      // );
      this.setState({ rolesReceived: false });
      this.setState({ userIndiRoles: this.props.user.userIndiRoles }, () => {
        this.setState({ rolesReceived: true });
      });
    }

    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount');
    this.setState({ errors: {} });
  }

  static getDerivedStateFromProps() {
    // console.log('getDerivedStateFromProps');
    return null;
  }

  shouldComponentUpdate() {
    // console.log('shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate() {
    // console.log('getSnapshotBeforeUpdate');
    return true;
  }

  populateUserOpts(options) {
    if (options) {
      return options.map((opt, index) => (
        <option key={index} value={index}>
          {opt.FirstName +
            ' ' +
            opt.LastName +
            '  (' +
            opt.Logon +
            ') ID: ' +
            parseInt(opt.ID, 10)}
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

  /** Adds rows to role table.
   * Takes array like:
   * [
   *    {"RoleId":1,"UserHas":false,"RoleName":"AppAdmin"},
   *    {"RoleId":2,"UserHas":true,"RoleName":"UserMgr"},
   *    etc....
   * ]
   */
  populateRoleOpts(roles) {
    // console.log('populateRoleOpts: received roles = ' + JSON.stringify(roles));
    // console.log(
    //   'populateRoleOpts: this.state.userIndiRoles = ' +
    //     JSON.stringify(this.state.userIndiRoles)
    // );
    if (roles) {
      return roles.map(role => (
        <tr key={role.RoleId}>
          <td className="text-left">{role.RoleName}</td>
          <td>
            <div className="form-check">
              <input
                name={role.RoleName}
                id={role.RoleId}
                type="checkbox"
                className="form-check-input"
                value={roles[role.RoleId - 1].UserHas}
                checked={roles[role.RoleId - 1].UserHas}
                onChange={this.onClickRole}
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
    // console.log(
    //   'onClickRole: this.state.userIndiRoles = ' +
    //     JSON.stringify(this.state.userIndiRoles)
    // );
    // let newRoles = { ...this.state.userIndiRoles };
    let newRoles = this.state.userIndiRoles.slice(0); // make copy of array
    // console.log('onClickRole: newRoles = ' + JSON.stringify(newRoles));
    newRoles[e.target.id - 1].UserHas = e.target.checked;
    // console.log('onClickRole: newRoles = ' + JSON.stringify(newRoles));
    this.setState({ userIndiRoles: newRoles });
    // console.log(
    //   'onClickRole: this.state.userIndiRoles = ' +
    //     JSON.stringify(this.state.userIndiRoles)
    // );
  }

  onChangeUserIdSelect(e) {
    const { userListUsers } = this.props.user;
    const uid = parseInt(e.target.value, 10);
    this.props.storeUserId(uid);

    // set check boxes
    if (userListUsers[uid].IsManager === true) {
      document.getElementById('isManager').checked = true;
    } else {
      document.getElementById('isManager').checked = false;
    }

    if (userListUsers[uid].IsActive === true) {
      document.getElementById('isActive').checked = true;
    } else {
      document.getElementById('isActive').checked = false;
    }

    // set state based on props
    this.setState({ SelectUserId: uid });
    this.setState({ UserId: userListUsers[uid].ID });
    this.setState({ FirstName: userListUsers[uid].FirstName });
    this.setState({ LastName: userListUsers[uid].LastName });
    this.setState({ Manager: userListUsers[uid].Manager });
    this.setState({ Department: userListUsers[uid].Department });
    this.setState({ isManager: userListUsers[uid].IsManager });
    this.setState({ isActive: userListUsers[uid].IsActive });

    // let d = store.default.getState(); // to print state
    // console.log(JSON.stringify(d, null, 2)); // to print state
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

    // this.props.addUserWithRoles(newUser);
  }

  render() {
    const { errors, rolesReceived, userIndiRoles } = this.state;
    const { userListMgrs, userListDepts, userListUsers } = this.props.user;
    // const { user } = this.props.auth;  // TODO make require some level of authority

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Update User</h1>
              <p className="lead text-center">Time and Issues</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <select
                    required
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.UserId
                    })}
                    name="UserId"
                    value={this.state.SelectUserId}
                    onChange={this.onChangeUserIdSelect}
                    error={errors.UserId}
                    id="UserId"
                  >
                    <option value="" hidden>
                      Please select a UserId
                    </option>
                    {this.populateUserOpts(userListUsers)}
                  </select>
                  {errors.UserId && (
                    <div className="invalid-feedback">{errors.UserId}</div>
                  )}
                </div>

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
                    {this.populateMgrOpts(userListMgrs)}
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
                    {this.populateDptOpts(userListDepts)}
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
                <table
                  id="rolesTable"
                  className="table table-bordered table-sm table-responsive{-sm|-md|-lg|-xl}"
                >
                  <thead>
                    <tr>
                      <th scope="col">RoleName</th>
                      <th scope="col">UserHas</th>
                    </tr>
                  </thead>
                  <tbody id="tbody">
                    {rolesReceived
                      ? this.populateRoleOpts(userIndiRoles)
                      : null}
                  </tbody>
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

UpdateUser.propTypes = {
  getMgrList: PropTypes.func.isRequired,
  getDptList: PropTypes.func.isRequired,
  getUserRoleList: PropTypes.func.isRequired,
  getUserInfoForUpdateSelect: PropTypes.func.isRequired,
  getRoleListForUserId: PropTypes.func.isRequired,
  // addUserWithRoles: PropTypes.func.isRequired,
  storeUserId: PropTypes.func.isRequired,
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
    getUserInfoForUpdateSelect,
    getRoleListForUserId,
    storeUserId
    // addUserWithRoles
  }
)(withRouter(UpdateUser));
