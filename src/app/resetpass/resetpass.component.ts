/*  Component for the forget password of the LoginRadius tool.
 *  The reset password interface is also included with this component
 *  and will trigger when the URL of the page includes the reset flag
 *  provided when a reset e-mail provides the reset e-mail URL.
 */

import { Component, OnInit } from '@angular/core';
import { LRObject } from '../commonOptions';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {
  hideForgotPass = true;
  forgotPass_options = {
    onSuccess: function (response) {
      console.log(response);
      document.getElementById('message').innerText = 'Reset password email sent.';
    },
    onError: function (errors) {
      console.log(errors);
      document.getElementById('message').innerText = 'Reset password email not sent.';
    },
    container: 'forgotPass-container'
  };

  resetPass_options = {
    onSuccess: function (response) {
      console.log(response);
      document.getElementById('message').innerText = 'Password Reset';
    },
    onError: function (errors) {
      console.log(errors);
      document.getElementById('message').innerText = 'Password reset error';
    },
    container: 'resetPass-container'
  };

  constructor() {
  }

  ngOnInit() {
    const forgot_options = this.forgotPass_options;
    const reset_options = this.resetPass_options;
    LRObject.util.ready(function () {
      LRObject.init('forgotPassword', forgot_options);
    });
    if (window.location.href.includes('vtype=reset')) {
      LRObject.util.ready(function () {
        LRObject.init('resetPassword', reset_options);
      });
    }
  }

  showForgotPass() {
    if (this.hideForgotPass === true) {
      this.hideForgotPass = false;
    } else {
      this.hideForgotPass = true;
    }
  }
}
