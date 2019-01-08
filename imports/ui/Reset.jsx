import React, {Component} from 'react';

class Reset extends Component {
  
  constructor(props){
    super(props);
    this.state={
    };
  }

  reset = () => {
    let resetOptions = {};
    resetOptions.container = "resetpassword-container";
    
		resetOptions.onSuccess = (response) => {
      // On Success
      window.history.pushState("object or string", "Title", "/");
      alert("Password reset successful.");
			console.log(response);
    };
    
		resetOptions.onError = (errors) => {
      // On Errors
      alert("Something went wrong, check console");
			console.log(errors);
		}

		window.LRObject.init("resetPassword", resetOptions);
  }

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    this.reset();
  }
  
  render(){
    return (
      <div id="resetpassword-container">
      </div>
    );
  }
}
export default Reset;