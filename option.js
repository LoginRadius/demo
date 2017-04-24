
var commonOptions = {};
commonOptions.apiKey = "<LoginRadius API Key>";
commonOptions.appName = "<LoginRadius Site Name>";
commonOptions.hashTemplate= true;
commonOptions.sott ="<Sott>";
commonOptions.verificationUrl = window.location;//Change as per requirement

var LRObject= new LoginRadiusV2(commonOptions);