import {h, render, Component} from 'preact';
import {getLoginObject} from '../utils/getLoginObject';
import {handleError} from '../utils/handleError';

class EmailResend extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let LRObject = getLoginObject();

        let resend_email_options = {};
        resend_email_options.container = 'resend-email-container';
        resend_email_options.onSuccess = function (response) {
            console.log(response);
            alert("Successfully Resent");
        };
        resend_email_options.onError = function (errors) {
            console.log(errors);
            alert(handleError(errors));
        };
        LRObject.init('resendVerificationEmail', resend_email_options);
    }

    render() {
        return (
            <div>
                <h3> Resend Email </h3>
                <div id="resend-email-container"></div>
                <button onClick={this.props.action}> Back</button>
            </div>

        )
    }
}
export default EmailResend;