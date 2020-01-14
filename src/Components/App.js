import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Login from "../Components/Login";
import Start from "./Start";
import EmailResend from './EmailResend';
import ForgotPassword from './ForgotPassword';
import Register from './Register';
import Home from './Home';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this._defaultState
  }

  // Initial state
  _defaultState = {
    isLoggedIn: false,
    profile: undefined
  }

  /**
   * This handler is called on login success.
   * It accepts the user profile as an argument fetched with the login method.
   */
  _onLogin = (profile) => {
    this.setState({
      isLoggedIn: true,
      profile: {
        uid: profile.Uid,
        name: profile.FullName
      }
    }, () => this.props.history.push("/home"))
  }

  /**
   * This handler removed the fetched user data by resetting the state
   */
  _onLogout = () => {
    this.setState(this._defaultState, () => this.props.history.push("/start"))
  }

  render() {

    const { isLoggedIn, profile } = this.state;

    return <Switch>
      {/* Protected Routes */}
      <Route exact path="/home" render={() => isLoggedIn
        ? <Home handler={this._onLogout} profile={profile} /> : <Redirect to="/login" />} />

      {/* Public Routes */}
      <Route exact path="/start" render={() => <Start handler={this._onLogout} profile={this.state.profile} />} />
      <Route exact path="/login" render={() => <Login handler={this._onLogin} />} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/resend-verification-email" component={EmailResend} />

      {/* Default Route */}
      <Redirect to="/start" />
    </Switch>
  }
}

export default withRouter(App);