import Component from '@ember/component';
/* global LRObject */

export default Component.extend({

	didInsertElement: function () {
		var forgotpassword_options = {};
		forgotpassword_options.onSuccess = function(res) {
			console.log(res);
		};
		forgotpassword_options.onError = function(err) {
			console.log(err);
		};

		forgotpassword_options.container = "forgotpassword-container";
		LRObject.init("forgotPassword", forgotpassword_options);
	}
});
