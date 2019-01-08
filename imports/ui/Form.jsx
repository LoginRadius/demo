import React, {Component} from 'react';
import Registration from './Registration.jsx';
import Login from './Login.jsx';
import SocialLogin from './SocialLogin.jsx';
import Reset from './Reset.jsx';
import Forgot from './Forgot.jsx';
import Verification from './Verification.jsx';

class Form extends Component {
  
  constructor(props){
    super(props);
    this.state={
    }
  }

  render(){    
    return (
      <div>
          {this.props.action.register && <Registration /> }
          {this.props.action.login && <Login /> }
          {this.props.action.socialLogin && <SocialLogin /> }
          {this.props.action.resetPw && <Reset /> }
          {this.props.action.forgotPw && <Forgot /> }
          {this.props.action.verifyEmail && <Verification  />}
      </div>
    );
  }
}
export default Form;