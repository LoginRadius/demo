import {h, render, Component} from 'preact';
import ChangePassword from '../Components/ChangePassword.js'
import ManageEmails from '../Components/ManageEmails/ManageEmails.js'

class LoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: ""
        };
        this.handleEventClick = this.handleEventClick.bind(this);
        this.toRenderHandler = this.toRenderHandler.bind(this);
    }

    handleEventClick(event) {
        this.state.current === event ? this.setState({current: ""}) : this.setState({current: event})
    }

    toRenderHandler() {
        switch (this.state.current) {
            case "ChangePassword":
                return (
                    <ChangePassword action={this.handleEventClick}/>
                );
            case "ManageEmails":
                return (
                    <ManageEmails action = {this.handleEventClick} />
                );
            default:
                return (
                    <div>
                        <button onClick={() => this.handleEventClick("ChangePassword")}> Change Password</button>
                        <br />
                        <button onClick={() => this.handleEventClick("ManageEmails")}> Manage Emails </button>
                    </div>
                )

        }
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>
                {this.toRenderHandler()}
                <br />
                <button onClick = {this.props.handleBack}> Log Out </button>
            </div>

        )
    }

}

export default LoggedIn