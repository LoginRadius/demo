import {h, render, Component} from 'preact';
import {getLoginObject} from '../utils/getLoginObject';
import {handleError} from '../utils/handleError';
import {options as commonOptions} from '../utils/getLoginObject';

let handleState; // global variable to handle login event from social login

class SocialLogin extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let LoginObject = getLoginObject();
        LoginObject.customInterface(".interfacecontainerdiv", commonOptions);

        let sl_options = {};
        sl_options.onSuccess = function (response) {
            console.log(response);
            handleState();
        };
        sl_options.onError = function (errors) {
            console.log(errors);
            alert(handleError(errors));
        };
        sl_options.container = "sociallogin-container";
        LoginObject.init('socialLogin', sl_options);
    }

    render() {
        handleState = this.props.handler;
        return (
            <div>
                <div id="interfacecontainerdiv" className="interfacecontainerdiv"></div>
                <div id="sociallogin-container"></div>
            </div>
        )
    }

}

export default SocialLogin;