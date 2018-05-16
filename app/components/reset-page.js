import Component from '@ember/component';
/* global LRObject */

export default Component.extend({

	didInsertElement: function () {
		var resetpassword_options = {};
		resetpassword_options.onSuccess = function(response) {
			console.log(response);
		};
		resetpassword_options.onError = function(errors) {
			console.log(errors);
		};

		resetpassword_options.container = "resetpassword-container";
		LRObject.init("resetPassword", resetpassword_options);
	}
});
