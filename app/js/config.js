var commonOptions = {};
commonOptions.apiKey = "<<api key>>";
commonOptions.appName = "<<app name>>";
commonOptions.hashTemplate= true;
// Required for registration
commonOptions.sott ="<< sott >>";

commonOptions.formRenderDelay = 2; // in milliseconds 
var path = window.location.href;
if (path[path.length - 1] === '/') {
    path = path + "index.html";
}
// No need to change these urls
commonOptions.verificationUrl = path.replace(path.substr(path.lastIndexOf('/')), "/%23email-verification");  // %23 is for #
commonOptions.resetPasswordUrl = path.replace(path.substr(path.lastIndexOf('/')), "/%23reset-password");
// callback url for social login
commonOptions.callbackUrl = path.replace(path.substr(path.lastIndexOf('/')), "/%23social-login");
var LRObject= new LoginRadiusV2(commonOptions);

LRObject.$hooks.register('startProcess',function () {
    $(':input[type="submit"]').prop('disabled', true);
});
LRObject.$hooks.register('endProcess',function () {
    $(':input[type="submit"]').prop('disabled', false);
});
