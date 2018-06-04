
/*
 * Create the LoginRadiusV2 singleton with a set of commonOptions and exports it.
 * Fill in the apiKey, sott and appName with appropriate credentials.
 */
declare function LoginRadiusV2(commonOptions): void;

const commonOption = {
    apiKey: '{Your API-key}',
    sott: '{Your SOTT}',
    appName: '{Your Application Name}',
    hashTemplate: true,
    verificationUrl: window.location.href,
    resetPasswordUrl: window.location.href,
};

export const LRObject = new LoginRadiusV2(commonOption);
