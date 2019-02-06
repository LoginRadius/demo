import React, {Component} from 'react';
import {getLoginObject} from '../utils/getLoginObject';
import {handleError} from '../utils/handleError';
import SocialLogin from './SocialLogin.js'

var changeState; // need a global variable to access it in JS

class Login extends Component {
    constructor(props) {
        super(props);
        // props:
        //-- action: function to determine what state the app is in based on click event.
        //-- handler: function to execute when login attempt is successful.
        this.state = {
            email: "",
            password: "",
            data: ""
        };

    }

    componentDidMount() {
        let LoginObject = getLoginObject();
        let login_options = {};

        login_options.container = 'login-container';
        login_options.onSuccess = function (response) {
          console.log(response);
          if (response.access_token) {
            changeState();
          }
        };
        
        login_options.onError = function (errors) {
            console.log(errors);
            alert(handleError(errors));
        };
        
        LoginObject.init('login', login_options);
    };


    render() {
        changeState = this.props.handler; // associating the global variable with the prop
        return (
            <div>
                <h3> Login </h3>
                <div id="login-container"></div>
                <SocialLogin handler={this.props.handler}/>
                <button onClick={this.props.action}> Back</button>
            </div>
        )
    }
}

export default Login;