import React, {Component} from 'react';

class Menu extends Component {
  
  constructor(props){
    super(props);
    this.state = {
    };
  }
  
  render(){    
    return (
      <div>
          <h3 onClick={(() => this.props.handleClickAction({register: true}))}>Register</h3>
          <h3 onClick={(() => this.props.handleClickAction({login: true}))}>Log in</h3>
          <h3 onClick={(() => this.props.handleClickAction({socialLogin: true}))}>Social log in</h3>
          <h3 onClick={(() => this.props.handleClickAction({forgotPw: true}))}>Forgot password</h3>
      </div>
    );
  }
}

export default Menu;