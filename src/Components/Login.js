import React, { Component } from 'react';
import LRObject from '../utils/getLoginObject';
import { formatErrorMessage } from '../utils/handleError';
import SocialLogin from './SocialLogin.js'
import { withRouter } from 'react-router-dom';

class Login extends Component {
  componentDidMount() {
    let login_options = {};

    login_options.container = 'login-container';
    login_options.onSuccess = (response) => {
      if (response.access_token) {
        this.props.handler(response.Profile);
      }
    };

    login_options.onError = (errors) => {
      console.log(errors);
      alert(formatErrorMessage(errors));
    };

    LRObject.init('login', login_options);
  };


  render() {
    return (
      <div>
        <h3> Login </h3>
        <div id="login-container"></div>
        <SocialLogin onLoginSuccess={this.props.handler} />
        <button style={{ marginTop: "2em" }} onClick={this.props.history.goBack}> Back</button>
      </div>
    )
  }
}

export default withRouter(Login);