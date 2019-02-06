import config from './config.json'

export let commonOptions = {
    apiKey: config.apiKey,
    appName: config.appName,
    hashTemplate: true,
    sott: config.sott,
    templateName: 'loginradiuscustom_tmpl',
    forgotPasswordUrl: config.homeURL,
    verificationUrl: config.homeURL,
    // Prevent passwordless login buttons from appearing - this is a basic demo with minimal features
    passwordlessLogin: false,
    passwordlessLoginOTP: false
};

/**
 * Returns the singleton LoginRadius object.
 */
export function getLoginObject() {
    if (typeof window.LRObject === 'undefined') {
        window.LRObject = new window.LoginRadiusV2(commonOptions);
    }
    return window.LRObject;
}