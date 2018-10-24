import {h, render, Component} from 'preact';
import Register from './Register.js';
import Login from './Login.js';
import ForgotPassword from './ForgotPassword.js'
import EmailResend from './EmailResend.js'

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: ""
        };

        this.toRenderHandler = this.toRenderHandler.bind(this);
        this.handleEventClick = this.handleEventClick.bind(this);
    }

    handleEventClick(event) {
        this.state.current === event ? this.setState({current: ""}) : this.setState({current: event})
    }

    toRenderHandler() {
        switch (this.state.current) {
            case "Login":
                return (
                    <Login handler={this.props.handler} action={this.handleEventClick}/>
                );
            case "Register":
                return (
                    <Register action={this.handleEventClick}/>
                );
            case "ForgotPassword":
                return (
                    <ForgotPassword action={this.handleEventClick}/>
                );
            case "EmailResend":
                return (
                    <EmailResend action = {this.handleEventClick} />
                );
            default:
                return (
                    <div>
                        <button onClick={() => this.handleEventClick("Login")}> Login</button>
                        <br />
                        <button onClick={() => this.handleEventClick("Register")}> Register</button>
                        <br />
                        <button onClick={() => this.handleEventClick("ForgotPassword")}> Forgot Password </button>
                        <br />
                        <button onClick={() => this.handleEventClick("EmailResend")}> Resend Verification Email </button>
                        <br />
                    </div>
                )
        }
    }

    render() {
        return (
            <div>
                <h1>Preact LoginRadius Demo</h1>
                {this.toRenderHandler()}
            </div>
        );
    }
}

export default Start;