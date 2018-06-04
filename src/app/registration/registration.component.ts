/*  Component for the registration of the LoginRadius tool.
 *  The email verification interface is also included with this component
 *  and will trigger when the URL of the page includes the verification flag
 *  provided when a verification e-mail provides the verification URL.
 */

import { Component, OnInit } from '@angular/core';
import { LRObject } from '../commonOptions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  hideRegistration = true;
  registration_options = {
    onSuccess: function (response) {
      console.log(response);
      document.getElementById('message').innerText = 'Verification email sent.';
    },
    onError: function (errors) {
      console.log(errors);
      document.getElementById('message').innerText = 'Error registering.';
    },
    container: 'registration-container'
  };

  verify_options = {
    onSuccess: function (response) {
      console.log(response);
      document.getElementById('message').innerText = 'Email verified.';
    },
    onError: function (errors) {
      console.log(errors);
      document.getElementById('message').innerText = 'Email verification error.';
    },
  };

  constructor() {
  }

  ngOnInit() {
    const reg_options = this.registration_options;
    const ver_options = this.verify_options;
    LRObject.util.ready(function () {
      LRObject.init('registration', reg_options);
    });
    if (window.location.href.includes('vtype=emailverification') && (!window.location.href.includes('vtype=reset'))) {
      LRObject.util.ready(function () {
        LRObject.init('verifyEmail', ver_options);
      });
    }
  }

  showRegistration() {
    if (this.hideRegistration === true) {
      this.hideRegistration = false;
    } else {
      this.hideRegistration = true;
    }
  }
}
