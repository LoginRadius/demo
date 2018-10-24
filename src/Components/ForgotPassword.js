import {h, render, Component} from 'preact';
import {getLoginObject} from '../utils/getLoginObject';
import {handleError} from '../utils/handleError';


class ForgotPassword extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let LRObject = getLoginObject();

        let forgotpassword_options = {};
        forgotpassword_options.container = 'forgotpassword-container';
        forgotpassword_options.onSuccess = function (response) {
            console.log(response);
            alert("Succesfully Sent")
        };
        forgotpassword_options.onError = function (errors) {
            console.log(errors);
            alert(handleError(errors));
        };
        LRObject.init('forgotPassword', forgotpassword_options);
    }


    render() {
        return (
            <div>
                <h3> Forgot Password </h3>
                <div id="forgotpassword-container"></div>
                <button onClick={this.props.action}> Back</button>
            </div>

        )
    }
}

export default ForgotPassword