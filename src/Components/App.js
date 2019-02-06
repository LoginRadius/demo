import React, {Component} from 'react';
import Start from './Start.js';
import {getLoginObject} from '../utils/getLoginObject.js';
import ResetPassword from './ResetPassword.js';
import LoggedIn from './LoggedIn';
import config from '../utils/config.json';

// Email Verification needs to occur here because there is only one HTML page


let emailVerify; // global variable to check for email verification in home page
let handleReset;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageState: "notLogged",
        };

        this.handleEmailVerify = this.handleEmailVerify.bind(this);
        this.handleLoggedIn = this.handleLoggedIn.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
    }


    componentDidMount() {
        let LoginObject = getLoginObject();

        // verify email options
        let verifyemail_options = {};
        verifyemail_options.onSuccess = function (response) {
            console.log(response);
            emailVerify();
        };
        verifyemail_options.onError = function (errors) {
            console.log(errors);
        };


        // reset password options
        var reset_options = {};
        reset_options.container = 'resetpassword-container';
        reset_options.onSuccess = function (response) {
            console.log(response);
        };
        reset_options.onError = function (errors) {
            console.log(errors);
        };


        // checking for a reset password
        if (window.location.href.indexOf("vtype=reset") > -1) {
            LoginObject.init('resetPassword', reset_options);
            handleReset();
        }


        // checking if the URL contains the type emailverification string, if not then dont initiate the verify email
        if (window.location.href.indexOf("vtype=emailverification") > -1) {
            LoginObject.init('verifyEmail', verifyemail_options);
        }
    }


    handleLoggedIn() {
        this.setState({pageState: "Logged"})
    }

    handleEmailVerify() {
        this.setState({pageState: "Email"})
    }

    handleResetPassword() {
        this.setState({pageState: "Reset"})
    }

    handleBack() {
        // homeURL in config.json holds the appropriate port where the server is listening on:
        window.location.assign(config.homeURL);
    }


    render() {
        emailVerify = this.handleEmailVerify;
        handleReset = this.handleResetPassword;

        switch (this.state.pageState) {
            case "Logged":
                return (<LoggedIn handleBack={this.handleBack} />);
            case "Email":
                return (
                    <div>
                        <h1>Email Verified!</h1>
                        <button onClick={this.handleBack}> Back</button>
                    </div>);
            case "Home":
                return (<Start handler={this.handleLoggedIn}/>);
            case "Reset":
                return (<div><h1>Reset Your Password!</h1><ResetPassword handler={this.handleBack} /></div>);
            default:
                return (<Start handler={this.handleLoggedIn}/>)
        }


    }
}


export default App;
