import React, {Component} from 'react';
import {getLoginObject} from '../utils/getLoginObject.js';
import {handleError} from '../utils/handleError';

class ChangePassword extends Component {
    componentDidMount() {
        let LRObject = getLoginObject();

        let changepassword_options = {};
        changepassword_options.container = 'changepassword-container';
        changepassword_options.onSuccess = function (response) {
            console.log(response);
            alert("Succesfully Changed")
        };
        changepassword_options.onError = function (errors) {
            console.log(errors);
            alert(handleError(errors));
        };
        LRObject.init('changePassword', changepassword_options);
    }


    render() {
        return (
            <div>
                <h3> Change Your Password </h3>
                <div id="changepassword-container"></div>
                <button onClick = {this.props.action}> Back </button>
            </div>
        )
    }
}
export default ChangePassword;