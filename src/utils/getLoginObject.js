import config from './config.json';

export let options = {
    apiKey: config.apiKey,
    appName: config.appName,
    forgotPasswordUrl: config.homeURL,
    verificationUrl: config.homeURL,
    hashTemplate: true,
    sott: config.sott,
    templateName: 'loginradiuscustom_tmpl'
};

/**
 * Returns the singleton LoginRadius object.
 */
export function getLoginObject() {
    if (typeof window.LRObject === 'undefined') {
        window.LRObject = new LoginRadiusV2(options);
    }
    return window.LRObject;
}