import React, { Component } from 'react';
import LRObject from '../utils/getLoginObject';
import { formatErrorMessage } from '../utils/handleError';
import { withRouter } from 'react-router-dom';


class ForgotPassword extends Component {
  componentDidMount() {
    let forgotpassword_options = {};
    forgotpassword_options.container = 'forgotpassword-container';
    forgotpassword_options.onSuccess = function (response) {
      console.log(response);
      alert("Succesfully Sent")
    };
    forgotpassword_options.onError = function (errors) {
      console.log(errors);
      alert(formatErrorMessage(errors));
    };
    LRObject.init('forgotPassword', forgotpassword_options);
  }


  render() {
    return (
      <div>
        <h3> Forgot Password </h3>
        <div id="forgotpassword-container"></div>
        <button onClick={this.props.history.goBack}> Back</button>
      </div>

    )
  }
}

export default withRouter(ForgotPassword);