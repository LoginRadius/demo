
var option = {};
option.apikey = "<LoginRadius-API-Key>";
option.appName = "<LoginRadius-Site-Name>";
option.V2Recaptcha = true;
option.inFormvalidationMessage = true;
option.enableLoginOnEmailVerification = true;
/** You can directly bind it with the correct url, the string operation is just to dynamically bind them**/
var path = window.location.href;
option.emailVerificationUrl = path.replace(path.substr(path.lastIndexOf('/')), "/email-verification.html");
option.forgotPasswordUrl = path.replace(path.substr(path.lastIndexOf('/')), "/reset-password.html");
