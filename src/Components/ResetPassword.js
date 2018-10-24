import {h, render, Component} from 'preact';
import {getLoginObject} from '../utils/getLoginObject';
import {handleError} from '../utils/handleError';

let goBack; // Initialized to go back to the home page after success change

class ResetPassword extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let LRObject = getLoginObject();

        let reset_options = {};
        reset_options.container = 'resetpassword-container';
        reset_options.onSuccess = function (response) {
            console.log(response);
            alert("Succesfully Changed");
            goBack();
        };
        reset_options.onError = function (errors) {
            console.log(errors);
            alert(handleError(errors));
        };
        LRObject.init('resetPassword', reset_options);
    }

    render() {
        goBack = this.props.handler;
        return (
            <div>
                <div id="resetpassword-container"></div>
                <button onClick = {this.props.handler}> Back </button>
            </div>

        )
    }
}

export default ResetPassword