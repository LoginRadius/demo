import Component from '@ember/component';
import { computed } from '@ember/object';
/* global LRObject */

export default Component.extend({

	socialLoginName: '',

	socialLogin: computed('socialLoginName', function() {
		let data = {};
		let socialNames = JSON.parse(this.get('socialLoginName'));
		let appName = LRObject.global.commonOptions.appName;
		let apiKey = LRObject.global.commonOptions.apiKey;

		for (let name of socialNames) {
			data[name] = 'https://' + appName + '.hub.loginradius.com/RequestHandlor.aspx?apikey=' + apiKey + '&provider=' +
				name + '&callback=' + window.location.href + '&same_window=&is_access_token=true&callbacktype=&disablesignup=undefined';
		}

		return data;
	}),

	didInsertElement: function () {
		var sl_options = {};
		sl_options.onSuccess = function(res) {
			console.log(res);
		};
		sl_options.onError = function(err) {
			console.log(err);
		};

		sl_options.container = "sociallogin-container";
		LRObject.init('socialLogin', sl_options);
	}
});
