
var commonOptions = {};
commonOptions.apiKey = '<LoginRadius API Key>';
commonOptions.appName = '<LoginRadius App Name>';
commonOptions.hashTemplate = true;
commonOptions.sott = '<SOTT>';
commonOptions.verificationUrl = window.location.host + '/emailverification';
commonOptions.resetPasswordUrl = window.location.host + '/reset';

commonOptions.debugMode = true;

var LRObject = new LoginRadiusV2(commonOptions);
