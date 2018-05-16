import Component from '@ember/component';
/* global LRObject */

export default Component.extend({

	didInsertElement: function () {
		let registration_options = {};
		registration_options.onSuccess = function(res) {
			console.log(res);
		};
		registration_options.onError = function(err) {
			console.log(err);
		};

		registration_options.container = "registration-container";
		LRObject.init("registration",registration_options);
	}

});
