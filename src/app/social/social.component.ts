/*
 *  Component for the social login of the LoginRadius tool.
 *  Differs from the normal HTML/JS setup by opening a new tab
 *  instead of opening a new window for social logins.
 */

import { Component, OnInit } from '@angular/core';
import { LRObject } from '../commonOptions';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  hideSocial = true;
  custom_interface_option = {
    templateName: 'loginradiuscustom_tmpl'
  };

  social_options = {
    onSuccess: function (response) {
      console.log(response);
      document.getElementById('message').innerText = 'Social Login successful.';
    },
    onError: function (errors) {
      console.log(errors);
      document.getElementById('message').innerText = 'Social Login failed.';
    },
    container: 'social-container'
  };

  constructor() {
  }

  ngOnInit() {
    const soc_options = this.social_options;
    const custInt_options = this.custom_interface_option;
    LRObject.util.ready(function () {
      LRObject.customInterface('.interfacecontainerdiv', custInt_options);
    });
    LRObject.util.ready(function () {
      LRObject.init('socialLogin', soc_options);
    });
  }

  showSocial() {
    if (this.hideSocial === true) {
      this.hideSocial = false;
    } else {
      this.hideSocial = true;
    }
  }
}
