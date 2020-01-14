import React, { Component } from 'react';
import LRObject from '../utils/getLoginObject';
import { formatErrorMessage } from '../utils/handleError';
import { withRouter } from 'react-router-dom';

class EmailResend extends Component {
  componentDidMount() {
    let resend_email_options = {};
    resend_email_options.container = 'resend-email-container';

    resend_email_options.onSuccess = function (response) {
      console.log(response);
      alert("Successfully Resent");
    };
    resend_email_options.onError = function (errors) {
      console.log(errors);
      alert(formatErrorMessage(errors));
    };

    LRObject.init('resendVerificationEmail', resend_email_options);
  }

  render() {
    return (
      <div>
        <h3> Resend Email </h3>
        <div id="resend-email-container"></div>
        <button onClick={this.props.history.goBack}> Back</button>
      </div>

    )
  }
}
export default withRouter(EmailResend);