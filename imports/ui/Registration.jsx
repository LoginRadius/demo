import React, {Component} from 'react';

class Registration extends Component {
  
  constructor(props){
    super(props);
    this.state = {
    };
    this._isMounted = false;
  }

  register = () => {
    let registrationOptions = {};

		registrationOptions.onSuccess = (response) => {
      alert("Confirmation email has been sent.");
			console.log(response);
    };
    
		registrationOptions.onError = (errors) => {
      alert("Something went wrong, check console");
			console.log(errors);
    };
    
		registrationOptions.container = "registration-container";

    window.LRObject.$hooks.call('customizeFormPlaceholder',{    
      "emailid" : "Enter your email address",
      "password" : "Enter Your password"
    });
    window.LRObject.init("registration",registrationOptions);
  }
  
  componentDidMount() {
    this._isMounted = true;
    this.register();
  }

  componentDidUpdate() {
    this.register();
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  render(){
    return (
      <div id="registration-container">
      </div>
    );
  }
}
export default Registration;