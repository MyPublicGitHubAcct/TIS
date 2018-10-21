import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../../src/App';

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;

    const showUserCreate = (
      <span>
        <Link to="/addUser" className="btn btn-secondary m-2">
          New
        </Link>
      </span>
    );
    const showUserUpdate = (
      <span>
        <Link to="/updateUser" className="btn btn-secondary m-2">
          Update
        </Link>
      </span>
    );
    const showUserDelete = (
      <span>
        <Link to="/removeUser" className="btn btn-secondary m-2">
          Remove
        </Link>
      </span>
    );
    const showUserApprove = (
      <span>
        <Link to="/approveUser" className="btn btn-secondary m-2">
          Approve
        </Link>
      </span>
    );

    const showProjectCreate = (
      <span>
        <Link to="/addProject" className="btn btn-secondary m-2">
          New
        </Link>
      </span>
    );
    const showProjectUpdate = (
      <span>
        <Link to="/updateProject" className="btn btn-secondary m-2">
          Update
        </Link>
      </span>
    );
    const showProjectDelete = (
      <span>
        <Link to="/removeProject" className="btn btn-secondary m-2">
          Delete
        </Link>
      </span>
    );
    const showProjectApprove = (
      <span>
        <Link to="/approveProject" className="btn btn-secondary m-2">
          Approve
        </Link>
      </span>
    );

    const showUserIdTest = (
      <span>
        <Link to="/userIdTest" className="btn btn-secondary m-2">
          Test 1
        </Link>
      </span>
    );

    const showTimeCreate = (
      <span>
        <Link to="/enterTime" className="btn btn-secondary m-2">
          Enter
        </Link>
      </span>
    );
    const showTimeUpdate = (
      <span>
        <Link to="/updateTime" className="btn btn-secondary m-2">
          Change
        </Link>
      </span>
    );
    const showTimeDelete = (
      <span>
        <Link to="/removeTime" className="btn btn-secondary m-2">
          Delete
        </Link>
      </span>
    );
    const showTimeApprove = (
      <span>
        <Link to="/approveTime" className="btn btn-secondary m-2">
          Approve
        </Link>
      </span>
    );

    const showIssueCreate = (
      <span>
        <Link to="/addIssue" className="btn btn-secondary m-2">
          New
        </Link>
      </span>
    );
    const showIssueUpdate = (
      <span>
        <Link to="/updateIssue" className="btn btn-secondary m-2">
          Change
        </Link>
      </span>
    );
    const showIssueDelete = (
      <span>
        <Link to="/removeIssue" className="btn btn-secondary m-2">
          Delete
        </Link>
      </span>
    );
    const showIssueApprove = (
      <span>
        <Link to="/approveIssue" className="btn btn-secondary m-2">
          Approve
        </Link>
      </span>
    );

    const showCommentCreate = (
      <span>
        <Link to="/addComment" className="btn btn-secondary m-2">
          New
        </Link>
      </span>
    );
    const showCommentUpdate = (
      <span>
        <Link to="/updateComment" className="btn btn-secondary m-2">
          Change
        </Link>
      </span>
    );
    const showCommentDelete = (
      <span>
        <Link to="/removeComment" className="btn btn-secondary m-2">
          Delete
        </Link>
      </span>
    );
    const showCommentApprove = (
      <span>
        <Link to="/approveComment" className="btn btn-secondary m-2">
          Approve
        </Link>
      </span>
    );
    const showAdminAll = (
      <span>
        <Link to="/addRole" className="btn btn-secondary m-2">
          Add Role
        </Link>
        <Link to="/updateRole" className="btn btn-secondary m-2">
          Update Role
        </Link>
        <Link to="/somethingelseadmiiny" className="btn btn-secondary m-2">
          Other
        </Link>
      </span>
    );

    const showTimeBox = (
      <div className="p-2 col">
        <div className="card mb-3">
          <h1 className="card-header text-center text-warning display-5">
            Time
          </h1>
          <div className="card-body">
            {user.TimeRead ? showUserIdTest : null}
            {user.TimeCreate ? showTimeCreate : null}
            {user.TimeUpdate ? showTimeUpdate : null}
            {user.TimeDelete ? showTimeDelete : null}
            {user.TimeApprove ? showTimeApprove : null}
          </div>
        </div>
      </div>
    );
    const showProjectBox = (
      <div className="p-2 col">
        <div className="card mb-3">
          <h1 className="card-header text-center text-secondary display-5">
            Project
          </h1>
          <div className="card-body">
            {user.ProjectCreate ? showProjectCreate : null}
            {user.ProjectUpdate ? showProjectUpdate : null}
            {user.ProjectDelete ? showProjectDelete : null}
            {user.ProjectApprove ? showProjectApprove : null}
          </div>
        </div>
      </div>
    );
    const showUserBox = (
      <div className="p-2 col">
        <div className="card mb-3">
          <h1 className="card-header text-center text-primary display-5">
            User
          </h1>
          <div className="card-body">
            {user.UserCreate ? showUserCreate : null}
            {user.UserUpdate ? showUserUpdate : null}
            {user.UserDelete ? showUserDelete : null}
            {user.UserApprove ? showUserApprove : null}
          </div>
        </div>
      </div>
    );
    const showIssueBox = (
      <div className="p-2 col">
        <div className="card mb-3">
          <h1 className="card-header text-center text-info display-5">
            Issues
          </h1>
          <div className="card-body">
            {user.IssueCreate ? showIssueCreate : null}
            {user.IssueUpdate ? showIssueUpdate : null}
            {user.IssueDelete ? showIssueDelete : null}
            {user.IssueApprove ? showIssueApprove : null}
          </div>
        </div>
      </div>
    );
    const showCommentBox = (
      <div className="p-2 col">
        <div className="card mb-3">
          <h1 className="card-header text-center text-danger display-5">
            Comment
          </h1>
          <div className="card-body">
            {user.CommentCreate ? showCommentCreate : null}
            {user.CommentUpdate ? showCommentUpdate : null}
            {user.CommentDelete ? showCommentDelete : null}
            {user.CommentApprove ? showCommentApprove : null}
          </div>
        </div>
      </div>
    );
    const showAdminBox = (
      <div className="p-2 col">
        <div className="card mb-3">
          <h1 className="card-header text-center text-dark display-5">Admin</h1>
          <div className="card-body">{user.AdminAll ? showAdminAll : null}</div>
        </div>
      </div>
    );

    return (
      <div className="landing">
        <div className="jumbotron jumbotron-fluid p-3  text-center mb-2 rounded">
          <div className="container">
            <h1 className="display-3">Time Input System</h1>
            <hr />
            <p className="lead">What would you like to do?</p>
          </div>
        </div>
        <div className="row">
          {user.TimeRead ? showTimeBox : null}
          {user.IssueRead ? showIssueBox : null}
          {user.CommentRead ? showCommentBox : null}
        </div>
        <div className="row">
          {user.ProjectRead ? showProjectBox : null}
          {user.UserRead ? showUserBox : null}
          {user.AdminAll ? showAdminBox : null}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
