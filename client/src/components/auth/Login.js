import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Logon: '',
      Password: '',
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

    const userData = {
      Logon: this.state.Logon,
      Password: this.state.Password
    };

    this.props.loginUser(userData);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  componentWillUnmount() {
    this.setState({ errors: {} });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <p className="lead text-center">Time and Issues System</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Please enter your ID."
                    name="Logon"
                    type="text"
                    value={this.state.Logon}
                    onChange={this.onChange}
                    error={errors.Logon}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Please enter your password."
                    name="Password"
                    type="password"
                    value={this.state.Password}
                    onChange={this.onChange}
                    error={errors.Password}
                  />
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
