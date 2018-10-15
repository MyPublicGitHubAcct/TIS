import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import {
  addUser,
  addUsersRole,
  getDptList,
  getMgrList,
  getUserRoleList,
  getUserByLogon
} from '../../actions/userActions';
import UserAdminTitle from './UserAdminTitle';

class UserAdminCreate extends Component {
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
      roles: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onRoleClick = this.onRoleClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getMgrList();
    this.props.getDptList();
    this.props.getUserRoleList();
  }

  /** componentWillReceiveProps will be DEPRECATED!  see:
   * https://hackernoon.com/replacing-componentwillreceiveprops-with-getderivedstatefromprops-c3956f7ce607
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.user.roles) {
      const roles = nextProps.user.roles;
      this.setState({ roles: roles });
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

  addRoleList(items) {
    if (items) {
      return items.map((i, index) => (
        <div key={index} className="roleListItem">
          <input
            type="checkbox"
            className={classnames('form-check-input')}
            id={i.ID}
            name={i.ID}
            value={i.UserHas}
            onClick={this.onRoleClick}
          />
          <label className={classnames('form-check-label')} htmlFor={i.ID}>
            {i.RoleName}
          </label>
        </div>
      ));
    } else {
      return <div>No application roles found.</div>;
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  onRoleClick(e) {
    // https://www.robinwieruch.de/react-state-array-add-update-remove/
    const n = e.target.name;
    const c = e.target.checked;

    const newRoles = this.state.roles.map(item => {
      if (String(item.ID) === n) {
        item.UserHas = c;
        return item;
      } else {
        return item;
      }
    });

    this.setState({ roles: newRoles });
  }

  onSubmit(e) {
    // https://developers.google.com/web/fundamentals/primers/promises
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

    /**
     * Failing somewhere in here...
     * new user's roles NOT addedTypeError: Cannot read property 'ID' of undefined
     */

    this.props
      .addUser(newUser)
      .then(() => {
        console.log('new user ' + this.state.Logon + ' added');
        this.props
          .getUserByLogon(this.state.Logon)
          .then(
            this.state.roles.map(item => {
              let uh = item.UserHas ? 1 : 0;
              if (item) {
                console.log(
                  'this.props.userData.ID = ' + this.props.userData.ID
                );
                const newRole = {
                  UserId: this.props.userData.ID,
                  RoleId: item.ID,
                  UserHas: uh
                };
                this.props.addUsersRole(newRole);
              } else {
                console.log('newRole did not work...');
              }
              return 0;
            })
          )
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log("new user's roles NOT added" + err);
      });

    // get the user's ID and for each item in roleItems, call addUserRole
    // const newUserDetails = this.props.getUserByLogon(this.state.Logon);

    // if (newUserDetails) {
    //   console.log('user found!');
    //   this.state.roles.map(item => {
    //     let uh = item.UserHas ? 1 : 0;
    //     if (item) {
    //       const newRole = {
    //         UserId: newUserDetails.ID,
    //         RoleId: item.ID,
    //         UserHas: uh
    //       };
    //       this.props.addUsersRole(newRole);
    //     } else {
    //       console.log('newUserDetails = ' + newUserDetails);
    //     }
    //     return 0;
    //   });
    // }
  }

  render() {
    const { errors, roles } = this.state;
    const { mgrList, dptList } = this.props.user;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <UserAdminTitle
                title="Create User"
                subheading="Looks like you are awesome."
              />
              <form noValidate onSubmit={this.onSubmit}>
                <div className="div UserAdminUser">
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
                      <div className="invalid-feedback">
                        {errors.Department}
                      </div>
                    )}
                  </div>

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
                {this.addRoleList(roles)}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserAdminCreate.propTypes = {
  addUser: PropTypes.func.isRequired,
  addUsersRole: PropTypes.func.isRequired,
  getDptList: PropTypes.func.isRequired,
  getMgrList: PropTypes.func.isRequired,
  getUserRoleList: PropTypes.func.isRequired,
  getUserByLogon: PropTypes.func.isRequired,
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
    addUsersRole,
    getDptList,
    getMgrList,
    getUserRoleList,
    getUserByLogon
  }
)(withRouter(UserAdminCreate));
