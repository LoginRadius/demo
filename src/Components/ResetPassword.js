import React, { Component } from 'react';
import LRObject from '../utils/getLoginObject';
import { handleError } from '../utils/handleError';
import { withRouter } from 'react-router-dom';

class ResetPassword extends Component {
  componentDidMount() {
    let reset_options = {};
    reset_options.container = 'resetpassword-container';

    reset_options.onSuccess = function (response) {
      console.log(response);
      alert("Succesfully Changed");
      this.props.handler();
    };
    reset_options.onError = function (errors) {
      console.log(errors);
      alert(handleError(errors));
    };

    LRObject.init('resetPassword', reset_options);
  }


  render() {
    return (
      <div>
        <div id="resetpassword-container"></div>
        <button onClick={this.props.history.goBack}> Back</button>
      </div>

    )
  }
}

export default withRouter(ResetPassword)