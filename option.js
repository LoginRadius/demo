
var commonOptions = {};
commonOptions.apiKey = "<LoginRadius API Key>";
commonOptions.appName = "<LoginRadius Site Name>";
commonOptions.hashTemplate= true;
commonOptions.sott ="<Sott>";
var path = window.location.href;
commonOptions.verificationUrl = path.replace(path.substr(path.lastIndexOf('/')), "/email-verification.html");
commonOptions.resetPasswordUrl = path.replace(path.substr(path.lastIndexOf('/')), "/reset-password.html");
var LRObject= new LoginRadiusV2(commonOptions);
var sdkoptions = {


  "key": "<LoginRadius API Key>"

}
