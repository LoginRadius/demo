import React, { Component } from 'react';
import LRObject from '../../utils/getLoginObject.js';
import { handleError } from '../../utils/handleError';
import { withRouter } from 'react-router-dom';


class RemoveEmail extends Component {

    componentDidMount() {
        let remove_email_options = {};
        remove_email_options.container = 'removeemail-container';

        remove_email_options.onSuccess = function (response) {
            console.log(response);
            alert("Successfully Removed")
        };
        remove_email_options.onError = function (errors) {
            console.log(errors);
            alert(handleError(errors));

        };

        LRObject.init('removeEmail', remove_email_options);
    }


    render() {
        return (
            <div>
                <h3> Remove An Email </h3>
                <div id="removeemail-container"></div>
                <button onClick={this.props.history.goBack}> Back</button>
            </div>
        )
    }
}

export default withRouter(RemoveEmail)