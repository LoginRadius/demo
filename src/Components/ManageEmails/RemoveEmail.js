/**
 * Created by Eric on 5/29/17.
 *//**
 * Created by Eric on 5/29/17.
 */
import React, {Component} from 'react';
import {getLoginObject} from '../../utils/getLoginObject.js';
import {handleError} from '../../utils/handleError';


class RemoveEmail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let LRObject = getLoginObject();
        var remove_email_options = {};
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
                <button onClick={this.props.action}> Back</button>
            </div>
        )
    }
}

export default RemoveEmail