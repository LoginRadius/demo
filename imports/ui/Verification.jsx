import React, {Component} from 'react';

class Verification extends Component {
  
  constructor(props){
    super(props);
    this.state = {
    }
  }

  verify = () => {
    let verifyOptions = {};

		verifyOptions.onSuccess = (response) => {
      // On Success
      alert("Email verified!")
      window.history.pushState("object or string", "Title", "/");
			console.log(response);
    };
    
		verifyOptions.onError = (errors) => {
      // On Errors
      alert("Something went wrong.")
			console.log(errors);
    }
    
		window.LRObject.init("verifyEmail", verifyOptions);
  }
  
  componentWillUpdate() {
  }

  componentDidMount() {
    this.verify();
  }

  componentDidUpdate() {
    this.verify();
  }
  
  render(){
    return (
      <div>
      </div>
    );
  }
}
export default Verification;