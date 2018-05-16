import Component from '@ember/component';
/* global LRObject */

export default Component.extend({

	didInsertElement: function () {
		var login_options = {};
		login_options.onSuccess = function(res) {
			window.location.href = "profile";
		};
		login_options.onError = function(err) {
			console.log(err);
		};

		login_options.container = "login-container";
		LRObject.init("login",login_options);
	}
});
