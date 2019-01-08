import React, {Component} from 'react';

class Login extends Component {
  
  constructor(props){
    super(props);
    this.state = {
    };
  }

  login = () => {
    let loginOptions = {};
		loginOptions.onSuccess = (response) => {
      alert("Log in successful.")
			console.log(response);
		};
		loginOptions.onError = (errors) => {
      alert("Something went wrong, check console.")
      console.log(errors);
		};
		loginOptions.container = "login-container";

    window.LRObject.$hooks.call('customizeFormPlaceholder',{    
      "emailid" : "Enter your email address",
      "password" : "Enter Your password"
    });
    
    window.LRObject.init("login",loginOptions);
  }
  
  componentDidMount() {
    this.login();
  }

  componentDidUpdate() {
    this.login();
  }
  
  render(){
    return (
      <div id="login-container">
      </div>
    );
  }
}
export default Login;