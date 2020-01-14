import React, { Component } from 'react';
import LRObject from '../utils/getLoginObject';
import { commonOptions } from '../utils/getLoginObject';
import { formatErrorMessage } from '../utils/handleError';

class SocialLogin extends Component {

  componentDidMount() {
    LRObject.customInterface(".interfacecontainerdiv", commonOptions);

    let sl_options = {};
    sl_options.container = "sociallogin-container";

    sl_options.onSuccess = function (response) {
      console.log(response);
      this.props.onLoginSuccess()
    };
    sl_options.onError = function (errors) {
      console.log(errors);
      alert(formatErrorMessage(errors));
    };

    LRObject.init('socialLogin', sl_options);
  }

  render() {
    return (
      <div>
        <div id="interfacecontainerdiv" className="interfacecontainerdiv"></div>
        <div id="sociallogin-container"></div>
      </div>
    )
  }

}


export default SocialLogin;