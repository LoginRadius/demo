/**
 * Created by Eric on 5/26/17.
 */
import React, {Component} from 'react';
import {getLoginObject} from '../utils/getLoginObject';
import {handleError} from '../utils/handleError';
import SocialLogin from './SocialLogin.js'



var changeState; // need a global variable to access it in JS
var firstName; // needed to assign a first name to the user


class Login extends Component {
    constructor(props) {
        super(props);
        // props:
        //-- action: App.js uses this to check if Login was clicked
        //-- isLoggedIn: App.js uses this to check if it needs to render LoggedIn page
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
            changeState();
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