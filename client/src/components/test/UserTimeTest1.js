import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { getUserIdByLogon } from '../../actions/testActions';

class UserTimeTest1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Logon: '',
      test: {},
      errors: {} // not actually sure if this is needed > props
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
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
    // const { uid } = this.props.test;

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
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <div className="text-center result">
                {errors.Logon ? errors.Logon : 'results go here'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserTimeTest1.props = {
  auth: PropTypes.object.isRequired, // not sure this is needed
  getUserIdByLogon: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  test: PropTypes.object.isRequired // for testing only
};

// define props in this component
const mapStateToProps = state => ({
  auth: state.auth, // not sure this is needed
  errors: state.errors, // not sure this is needed
  test: state.test // not sure this is needed
});

// export default connect(
//   mapStateToProps,
//   { getUserIdByLogon }
// )(UserTimeTest1);

export default connect(
  mapStateToProps,
  { getUserIdByLogon }
)(UserTimeTest1);
