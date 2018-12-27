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
  updateUserWithRoles,
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
      IndiRoles: [],
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
    if (this.props.user.ListRoles !== prevProps.user.ListRoles) {
      this.setState({ IndiRoles: this.props.user.ListRoles });
    }

    if (this.props.user.IndiId !== prevProps.user.IndiId) {
      this.props.getRoleListForUserId(this.props.user.IndiId);
    }

    if (this.props.user.IndiRoles !== prevProps.user.IndiRoles) {
      // console.log(
      //   'prevProps.user.IndiRoles = ' +
      //     JSON.stringify(prevProps.user.IndiRoles)
      // );
      // console.log(
      //   'this.props.user.IndiRoles = ' +
      //     JSON.stringify(this.props.user.IndiRoles)
      // );
      this.setState({ rolesReceived: false });
      this.setState({ IndiRoles: this.props.user.IndiRoles }, () => {
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
    //   'populateRoleOpts: this.state.IndiRoles = ' +
    //     JSON.stringify(this.state.IndiRoles)
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
    //   'onClickRole: this.state.IndiRoles = ' +
    //     JSON.stringify(this.state.IndiRoles)
    // );
    // let newRoles = { ...this.state.IndiRoles };
    let newRoles = this.state.IndiRoles.slice(0); // make copy of array
    // console.log('onClickRole: newRoles = ' + JSON.stringify(newRoles));
    newRoles[e.target.id - 1].UserHas = e.target.checked;
    // console.log('onClickRole: newRoles = ' + JSON.stringify(newRoles));
    this.setState({ IndiRoles: newRoles });
    // console.log(
    //   'onClickRole: this.state.IndiRoles = ' +
    //     JSON.stringify(this.state.IndiRoles)
    // );
  }

  onChangeUserIdSelect(e) {
    const { ListUsers } = this.props.user;
    const uid = parseInt(e.target.value, 10);
    this.props.storeUserId(uid);

    // set check boxes
    if (ListUsers[uid].IsManager === true) {
      document.getElementById('isManager').checked = true;
    } else {
      document.getElementById('isManager').checked = false;
    }

    if (ListUsers[uid].IsActive === true) {
      document.getElementById('isActive').checked = true;
    } else {
      document.getElementById('isActive').checked = false;
    }

    // set state based on props
    this.setState({ SelectUserId: uid });
    this.setState({ UserId: ListUsers[uid].ID });
    this.setState({ FirstName: ListUsers[uid].FirstName });
    this.setState({ LastName: ListUsers[uid].LastName });
    this.setState({ Manager: ListUsers[uid].Manager });
    this.setState({ Department: ListUsers[uid].Department });
    this.setState({ isManager: ListUsers[uid].IsManager });
    this.setState({ isActive: ListUsers[uid].IsActive });

    // let d = store.default.getState(); // to print state
    // console.log(JSON.stringify(d, null, 2)); // to print state
  }

  onSubmit(e) {
    e.preventDefault();

    const im = this.state.isManager ? 1 : 0;
    const ia = this.state.isActive ? 1 : 0;
    const ma = parseInt(this.state.Manager, 10);
    const de = parseInt(this.state.Department, 10);

    const updatedUserDetails = {
      ID: this.props.us,
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Manager: ma,
      Logon: this.state.Logon,
      Department: de,
      isManager: im,
      isActive: ia
    };

    let stateRoles = this.state.IndiRoles;
    let updatedUserRoles = [];
    let ri;
    let uh;

    for (let r in stateRoles) {
      ri = stateRoles[r].RoleId;

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

      updatedUserRoles.push({
        RoleId: ri,
        UserHas: uh
      });
    }

    let updatedUser = {
      UpdatedUser: [{ Details: updatedUserDetails, Roles: updatedUserRoles }]
    };

    this.props.updateUserWithRoles(updatedUser);
  }

  render() {
    const { errors, rolesReceived, IndiRoles } = this.state;
    const { ListMgrs, ListDepts, ListUsers } = this.props.user;
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
                    {this.populateUserOpts(ListUsers)}
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
                    {rolesReceived ? this.populateRoleOpts(IndiRoles) : null}
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
  updateUserWithRoles: PropTypes.func.isRequired,
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
    storeUserId,
    updateUserWithRoles
  }
)(withRouter(UpdateUser));
