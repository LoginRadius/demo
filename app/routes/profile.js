import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
	model() {
		let settings = {
			"async": true,
			"crossDomain": true,
			"url": "http://api.loginradius.com/api/v2/userprofile/refresh?access_token=" + window.localStorage.LRTokenKey,
			"method": "GET",
			"headers": {
				"content-Type" : "application/x-www-form-urlencoded",
			},
		};

		return $.ajax(settings).done(function (res) {
			console.log(res);
		});
	}
});
