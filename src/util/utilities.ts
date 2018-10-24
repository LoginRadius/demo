/** The util module contains functions and data other modules can every here and then use.*/
import {config} from './config';

// Type cast done to access the LoginRadiusV2 constructor whose scope is the window object.
// This object will contain the LoginRadiusV2 object.
export var windowObject: any = window as any;

export let commonOptions = {
    apiKey: config.apiKey,
    appName: config.appName,
    sott: config.sott,
    hashTemplate: true,
    templateName: 'loginradiuscustom_tmpl',
    forgotPasswordUrl: config.homeURL,
    verificationUrl: config.homeURL
};

/** Returns the single instance of the LoginRadius object to be used throughout the application.
 * @return LoginRadiusV2 object used for accessing the LoginRadius services.
 */
export function getLRObject(): any {
    if (typeof windowObject.loginRadius === 'undefined') {
        windowObject.loginRadius = new windowObject.LoginRadiusV2(commonOptions);
    }
    return windowObject.loginRadius;
}