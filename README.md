alexa-skills-kit-sdk-for-nodejs
======
----------

Note: This branch is specifically for the Alexa demousing the original V1 release of the Alexa Skills Kit SDK for NodeJS.

It is compatible with the LoginRadius API V2.

This SDK is being deprecated by Amazon in favor of 
the alexa-skills-kit-sdk-for-nodejs V2.

Please see the Dev/Master branches for the demo that uses the latest Alexa NodeJS SDK.


## LoginRadius Alexa Skills Kit Demo 
![Home Image](http://docs.lrcontent.com/resources/github/banner-1544x500.png)

## Introduction ##
LoginRadius is an Identity Management Platform that simplifies user registration while securing data. LoginRadius Platform simplifies and secures your user registration process, increases conversion with Social Login that combines 30 major social platforms, and offers a full solution with Traditional Customer Registration. You can gather a wealth of user profile data from Social Login or Traditional Customer Registration.

LoginRadius centralizes it all in one place, making it easy to manage and access. Easily integrate LoginRadius with all of your third-party applications, like MailChimp, Google Analytics, Livefyre and many more, making it easy to utilize the data you are capturing.

LoginRadius helps businesses boost user engagement on their web/mobile platform, manage online identities, utilize social media for marketing, capture accurate consumer data, and get unique social insight into their customer base.

Please visit [here](http://www.loginradius.com/) for more information.

## Requirements

This Demo requires the following Node.js Libraries:

- [Alexa Skills Kit SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)
- [Request](https://github.com/request/request)

## Installation

1. Go to your [Alexa Skills Dashboard](https://developer.amazon.com/alexa-skills-kit) and create an Alexa Skill with the invocation name "loginradius"

2. Open up the Alexa Skill Builder and click on "Code Editor" 

3. Make sure you have a Schema of any kind (feel free to create an intent of your choosing) make sure to hit "Save Model" and "Build Model" (And that the Model builds succesfully).

4. Go back to your main Skill area, and click "Configuration"

5. This integration makes use of the LoginRadius OAuth2 SSO Flow, for the steps to configure this please see our Alexa Skills Kit Integration [Document](https://docs.loginradius.com/api/v2/integrations/alexa-skills-kit).

6. Open up index.js, set the value of `apiKey` to your LoginRadius API Key  

7. Set the value of `alexa.APP_ID` to the value of your Alexa App ID.

8. Load up the index.js along with the [Alexa Skills Kit SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) and the Node.js [Request](https://github.com/request/request) libraries to your testing environment or AWS Lambda.


##Documentation

Integrating LoginRadius with Alexa makes use of the LoginRadius OAuth2 Single Sign On workflow which you can read more about [here](https://docs.loginradius.com/api/v2/single-sign-on/oauth2-single-sign-on).

We also have Alexa Skills Kit Integration specific Documentation available [here](https://docs.loginradius.com/api/v2/integrations/alexa-skills-kit)

## Author

[LoginRadius](https://www.loginradius.com/)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.##
