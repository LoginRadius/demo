import React, { Component } from 'react';
import Form from './Form.jsx';
import Menu from './Menu.jsx';
import { Meteor } from 'meteor/meteor';

class App extends Component {
  
  initLRObject =  () => {
    console.log('initlrobject ran')
    Meteor.call('getLROptions', {
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        window.LRObject = new LoginRadiusV2(res)
        this.checkParams();
      }
    });
  }

  checkParams = () => {
    const query = new URLSearchParams(location.search);
    const type = query.get('vtype')
    switch (type ) {
      case 'reset':
        this.handleReset()
        break;
      case 'emailverification':
        this.handleVerify()
        break;
      default:
        break;
    }
  }
  
  handleReset = () => {
    this.setState({
      menuVisible: false, 
      formVisible: true,
      action: {resetPw: true} 
    })
  }
 
  handleVerify = () => {
    this.setState({
      menuVisible: false, 
      formVisible: true,
      action: {verifyEmail: true}, 
    })
  }

  handleClickHome = () => {
    this.setState({
      action: null, 
      formVisible: false,
      menuVisible: true
    });
  }

  handleClickMenu = () => {
    this.setState({
      formVisible: true,
      menuVisible: false
    });
  }

  handleClickAction = (value) => {
    this.setState({
      action: value
    });
  }

  constructor(props){
    super(props);
    this.state = {
      formVisible: false, 
      menuVisible: true, 
      action: null 
    }
    this._isMounted = false;
    this.handleClickAction = this.handleClickAction.bind(this);
  }

  componentWillMount() {
    this.initLRObject();
  }

  render() {
    return (
      <div>
        <h3 onClick={this.handleClickHome} >Home</h3>

        <div onClick={this.handleClickMenu} >
          {this.state.menuVisible && < Menu 
            LRObject = {this.state.LRObject}
            handleClickAction = {this.handleClickAction}
            /> }
        </div>

        {this.state.formVisible && <Form 
          action = {this.state.action}
        />}
      </div>
    ); 
  }
}

export default App;