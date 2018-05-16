import Component from '@ember/component';
/* global LRObject */

export default Component.extend({

	didInsertElement: function () {
		var verifyemail_options = {};
		verifyemail_options.onSuccess = function(res) {
			console.log(res);
		};
		verifyemail_options.onError = function(err) {
			console.log(err);
		};

		LRObject.init("verifyEmail", verifyemail_options);
	}
});
