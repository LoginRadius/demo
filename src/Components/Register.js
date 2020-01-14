import React, { Component } from 'react';
import LRObject from '../utils/getLoginObject';
import { formatErrorMessage } from '../utils/handleError';
import { withRouter } from 'react-router-dom';


class Register extends Component {
  componentDidMount() {
    let registration_options = {};
    registration_options.container = 'registration-container';

    registration_options.onSuccess = function (response) {
      console.log(response);
      alert("Successfully Registered");
    };
    registration_options.onError = function (errors) {
      console.log(errors);
      alert(formatErrorMessage(errors));
    };

    LRObject.init('registration', registration_options);
  }

  render() {
    return (
      <div>
        <h3> Register </h3>
        <div id="registration-container"></div>
        <button onClick={this.props.history.goBack}> Back</button>
      </div>
    )
  }
}

export default withRouter(Register);