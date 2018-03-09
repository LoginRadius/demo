'use strict';
// Declare app level module which depends on views, and components
angular.module('LoginRadiusApp', ['ngRoute']).
config(['$locationProvider', '$routeProvider', function($locationProvider,
	$routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'index.html',
		controller: 'IndexCtrl'
	})
	$locationProvider.html5Mode(true);
}]).controller('IndexCtrl', ['$scope', function($scope, myConstant) {
	$scope.flags = {
		showProfilePage: false,
		showLoginInput: true
	};
	//Get a LoginRadius Object with LoginRadius API information
	$scope.renderLoginItem = function(cb) {
		$scope.commonOptions = {
			apiKey: "<LoginRadius API Key>",
			appName: "<LoginRadius APP Name>",
			forgotPasswordUrl: "http://localhost:8000",   //should change if you have a different URL
			hashTemplate: true,
			sott: "<SOTT>",
			templateName: 'loginradiuscustom_tmpl',
			verificationUrl: "http://localhost:8000",    //should change if you have a different URL
			v2Recaptcha: false,
			invisibleRecaptcha: false
		};
		//Check function to ensure api information filled
		if ($scope.commonOptions.apiKey.substring(0, 1) == "<") console.log(
			"Please fill out your apiKey, appName and sott, otherwise the app won't work"
		);
		$scope.LoginObject = window.LoginRadiusV2($scope.commonOptions);
	};
	$scope.renderLoginItem();

	$scope.handleEventRegister = function() {
		var registration_options = {};
		registration_options.onSuccess = function(response) {
			//On Success
			alert("Emailed! Please check your email and go to the link provided");
			console.log(response);
		};
		registration_options.onError = function(errors) {
			//On Errors
			alert(JSON.stringify(errors));
			console.log(JSON.stringify(errors));
		};
		registration_options.container = 'registration-container';
		$scope.LoginObject.util.ready(function() {
			$scope.LoginObject.init('registration', registration_options);
		})
	}
	/*
	// This safe-apply function is an alternative solution of $scope.$apply; For example, when you find youself having trouble with the '$apply already in progress',
	// you may wanna use safeApply instead of '$scope.$apply()';
	$scope.safeApply = function(fn) {
  		var phase = this.$root.$$phase;
  		if(phase == '$apply' || phase == '$digest') {
   			if(fn && (typeof(fn) === 'function')) {
      			fn();
    		}
  		} else {
   				this.$apply(fn);
  		}
	};
	*/
	$scope.handleEventLogin = function() {
		var login_option = {};
		login_option.onSuccess = function(response) {
			//On Success
			console.log(JSON.stringify(response));
			$scope.flags.showProfilePage = true;
			$scope.flags.showLoginInput = false;
			$scope.ProfileFN = response.Profile.FirstName;
			$scope.ProfileLN = response.Profile.LastName;
			$scope.$apply();
			//see above description
			/*$scope.safeApply(function() {
 				alert('Now I'm wrapped for protection!');
			});
			*/
		};
		login_option.onError = function(errors) {
			//On Errors
			alert(JSON.stringify(errors));
			console.log(JSON.stringify(errors));
		};
		login_option.container = 'login-container';
		$scope.LoginObject.util.ready(function() {
			$scope.LoginObject.init('login', login_option);
		})
	}
	$scope.handleEventSocialLogin = function() {
		var custom_interface_option = {};
		custom_interface_option.templateName = 'loginradiuscustom_tmpl';
		$scope.LoginObject.util.ready(function() {
			$scope.LoginObject.customInterface("interfacecontainerdiv",
				custom_interface_option);
		})
		var sl_options = {};
		sl_options.onSuccess = function(response) {
			//On Success
			//Here you get the access token
			console.log(response);
			$scope.flags.showProfilePage = true;
			$scope.flags.showLoginInput = false;
			$scope.ProfileFN = response.Profile.FirstName;
			$scope.ProfileLN = response.Profile.LastName;
			$scope.$apply();
			/*$scope.safeApply(function() {
 				alert('Now I'm wrapped for protection!');
			});
			*/
		};
		sl_options.onError = function(errors) {
			//On Errors
			alert(JSON.stringify(errors));
			console.log(JSON.stringify(errors));
		};
		sl_options.container = 'sociallogin-container';
		$scope.LoginObject.util.ready(function() {
			$scope.LoginObject.init('socialLogin', sl_options);
		})
	}
	$scope.handleEventForgotPW = function() {
		var forgotpassword_options = {};
		forgotpassword_options.onSuccess = function(response) {
			// On Success
			alert("Emailed! Please check your email and go to the link provided");
			console.log(response);
		};
		forgotpassword_options.onError = function(errors) {
			// On Errors
			alert(JSON.stringify(errors));
			console.log(JSON.stringify(errors));
		}
		forgotpassword_options.container = 'forgotpassword-container';
		$scope.LoginObject.util.ready(function() {
			$scope.LoginObject.init('forgotPassword', forgotpassword_options);
		})
	}
	$scope.handleEventResetPassword = function() {
		var reset_options = {};
		reset_options.container = 'resetpassword-container';
		reset_options.onSuccess = function(response) {
			// On Success
			alert("Change it successfully, Please relogin.");
			console.log("Change it successfully, Please relogin.");
			location.href = "/"; //Refresh the page, relogin required
		};
		reset_options.onError = function(errors) {
			// On Errors
			alert(JSON.stringify(errors));
			console.log(JSON.stringify(errors));
		}
		$scope.LoginObject.util.ready(function() {
			$scope.LoginObject.init('resetPassword', reset_options);
		})
	}
	$scope.handleEventChangePassword = function() {
		$scope.hideProfile = true;
		var changepassword_options = {};
		changepassword_options.container = 'changepassword-container';
		changepassword_options.onSuccess = function(response) {
			// On Success
			alert("Change it successfully");
			console.log("Change it successfully");
		};
		changepassword_options.onError = function(errors) {
			// On Errors
			alert(JSON.stringify(errors));
			console.log(JSON.stringify(errors));
		}
		$scope.LoginObject.util.ready(function() {
			$scope.LoginObject.init('changePassword', changepassword_options);
		})
	}
	$scope.handleEventVerifyemail = function() {
		$scope.flags.EmailVerifiedSucceed = true;
		var verifyemail_options = {};
		verifyemail_options.onSuccess = function(response) {
			// On Success
			console.log(JSON.stringify(response));
		};
		verifyemail_options.onError = function(errors) {
			// On Errors
			alert(JSON.stringify(errors));
			console.log(JSON.stringify(errors));
		}
		$scope.LoginObject.util.ready(function() {
			$scope.LoginObject.init("verifyEmail", verifyemail_options);
		})
	}
	// Evaluate if this site is email-verification site and run the HandleEvent
	$scope.runVerify = function() {
		var link = window.location.href;
		if (link.includes("emailverification") && link.includes("vtoken=")) {
			$scope.handleEventVerifyemail();
		}
	}
	$scope.runVerify();
	// Evaluate if this site is reset-password site and run the HandleEvent
	$scope.runReset = function() {
		var link = window.location.href;
		if (link.includes("reset") && link.includes("vtoken=")) {
			$scope.handleEventResetPassword();
			$scope.flags.showReset = true;
			$scope.flags.showProfilePage = false;
			$scope.flags.showLoginInput = false;
		}
	}
	$scope.runReset();
	//Invalidate the Token to logout the users safely
	$scope.logout = function() {
		$scope.LoginObject.api.invalidateToken(window.localStorage['LRTokenKey'],
			function(response) {
				alert(JSON.stringify(response));
			},
			function(errors) {
				alert(JSON.stringify(errors));
			})
		location.href = "/"; //TargetURL is homepage(index.html)
	}
	// The following functions renders the input options, so it would be shown quickly when the buttons clicked
	$scope.handleEventRegister();
	$scope.handleEventLogin();
	$scope.handleEventForgotPW();
	$scope.handleEventChangePassword();
	//Change the flags value to show only one input option in the page
	$scope.load = function(action) {
		if (action == "SignUp") {
			$scope.flags.showRegistration = !$scope.flags.showRegistration;
			$scope.flags.showForgotPW = false;
			$scope.flags.showEmailLogin = false;
			$scope.flags.showResendEmail = false;
			$scope.flags.showSocialLogin = false;
		} else if (action == "EmailLogin") {
			$scope.flags.showEmailLogin = !$scope.flags.showEmailLogin;
			$scope.flags.showForgotPW = false;
			$scope.flags.showResendEmail = false;
			$scope.flags.showRegistration = false;
			$scope.flags.showSocialLogin = false;
		} else if (action == "ForgotPassword") {
			$scope.flags.showForgotPW = !$scope.flags.showForgotPW;
			$scope.flags.showEmailLogin = false;
			$scope.flags.showResendEmail = false;
			$scope.flags.showRegistration = false;
			$scope.flags.showSocialLogin = false;
		} else if (action == "SocialLogin") {
			$scope.flags.showSocialLogin = !$scope.flags.showSocialLogin;
			$scope.handleEventSocialLogin();
			$scope.flags.showForgotPW = false;
			$scope.flags.showEmailLogin = false;
			$scope.flags.showResendEmail = false;
			$scope.flags.showRegistration = false;
		}
	}
}]);