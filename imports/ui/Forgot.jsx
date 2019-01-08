import React, {Component} from 'react';

class Forgot extends Component {
  
  constructor(props){
    super(props);
    this.state = {
    };
  }

  forgot = () => {
    var forgotPwOptions = {};
		forgotPwOptions.container = "forgotpassword-container";
		forgotPwOptions.onSuccess = function(response) {
      // On Success
      alert("Reset password email has been sent.")
			console.log(response);
		};
		forgotPwOptions.onError = function(errors) {
      // On Errors
      alert("Something went wrong, check console.")
			console.log(errors);
		}

	  window.LRObject.init("forgotPassword", forgotPwOptions);
  }
  
  componentDidMount() {
    this.forgot();
  }

  componentDidUpdate() {
    this.forgot();
  }
  
  render(){
    return (
      <div id="forgotpassword-container">
      </div>
    );
  }
}
export default Forgot;