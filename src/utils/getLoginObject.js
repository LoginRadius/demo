import config from './config.json'

export let commonOptions = {
    apiKey: config.apiKey,
    appName: config.appName,
    sott: config.sott,
    forgotPasswordUrl: config.homeURL,
    verificationUrl: config.homeURL,
    hashTemplate: true,
    templateName: 'loginradiuscustom_tmpl',
    passwordlessLogin: false,
    passwordlessLoginOTP: false
};

/**
 * A singleton LoginRadius object.
 */
export default new window.LoginRadiusV2(commonOptions)