/**
 * Created by Eric on 5/26/17.
 */
import config from './config.json'

export let commonOptions = {
    apiKey: config.apiKey,
    appName: config.appName,
    forgotPasswordUrl: config.forgotPasswordUrl,
    hashTemplate: true,
    sott: config.sott,
    templateName: 'loginradiuscustom_tmpl',
    verificationUrl: config.verificationUrl
};




export function getLoginObject() {

    return window.LoginRadiusV2(commonOptions);
}

