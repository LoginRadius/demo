/*
 *
 *  Component for the login of the LoginRadius tool.
 *
 */

import { Component, OnInit } from '@angular/core';
import { LRObject } from '../commonOptions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hideLogin = true;
  login_options = {
    onSuccess: function (response) {
      console.log(response);
      document.getElementById('message').innerText = 'Login successful.';
    },
    onError: function (errors) {
      console.log(errors);
      document.getElementById('message').innerText = 'Login failed.';
    },
    container: 'login-container'
  };

  constructor() {
  }

  ngOnInit() {
    const log_options = this.login_options;
    LRObject.util.ready(function () {
      LRObject.init('login', log_options);
    });
  }

  showLogin() {
    if (this.hideLogin === true) {
      this.hideLogin = false;
    } else {
      this.hideLogin = true;
    }
  }
}
