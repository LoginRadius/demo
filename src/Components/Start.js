import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Start extends Component {
  render() {
    return (
      <div>
        <h1>LoginRadius React Demo</h1>
        <div>
          <button onClick={() => this.props.history.push("/login")}> Login</button>
          <br />
          <button onClick={() => this.props.history.push("/register")}> Register</button>
          <br />
          <button onClick={() => this.props.history.push("/forgot-password")}> Forgot Password? </button>
          <br />
          <button onClick={() => this.props.history.push("/resend-verification-email")}> Resend Verification Email </button>
          <br />
        </div>
      </div>
    )
  }


}


export default withRouter(Start);