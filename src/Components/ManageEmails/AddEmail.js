import React, { Component } from 'react';
import LRObject from '../../utils/getLoginObject.js';
import { handleError } from '../../utils/handleError';


class AddEmail extends Component {

  componentDidMount() {
    let LRObject = getLoginObject();
    let addEmailOptions = {};
    addEmailOptions.container = 'add-email-container';

    addEmailOptions.onSuccess = function (response) {
      console.log(response);
      alert("Successfully Added")
    };
    addEmailOptions.onError = function (errors) {
      console.log(errors);
      alert(handleError(errors));

    };

    LRObject.init('addEmail', addEmailOptions);
  }


  render() {
    return (
      <div>
        <h3> Add an Email </h3>
        <div id="add-email-container"></div>
        <button onClick={this.props.action}> Back </button>
      </div>
    )
  }
}

export default AddEmail