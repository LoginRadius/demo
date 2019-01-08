import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class SocialLogin extends Component {
  
  constructor(props){
    super(props);
    this.state = {
    };
  }

  socialLogin = () => {
    let customInterfaceOptions = {};

    customInterfaceOptions.templateName = 'loginradiuscustom_tmpl';
    window.LRObject.customInterface(".interfacecontainerdiv", customInterfaceOptions);
    
    var socialLoginOptions = {};
    socialLoginOptions.onSuccess = (response) => {
      console.log(response);
    };
    
    socialLoginOptions.onError = (errors) => {
      alert('Something went wrong, check console.');
      console.log(errors);
    };
    socialLoginOptions.container = "sociallogin-container";

    window.LRObject.init('socialLogin', socialLoginOptions);
  }
  
  componentWillUpdate() {
  }

  componentDidMount() {
    this.socialLogin();
  }

  componentDidUpdate() {
    this.socialLogin();
  }

  handleClick = () => {
    window.LRObject.util.openWindow();
  } 

  render(){	
    return (
      <div >
      		<div id="interfacecontainerdiv" className="interfacecontainerdiv"></div>
		      <div id="sociallogin-container"></div>
      </div>
    );
  }
}
export default SocialLogin;