const Alexa = require('alexa-sdk');
const request = require('request');
//Add your Alexa App ID
const alexaAppid = "<< Your Alexa App ID>>";
//Add your LoginRadius API Key
const apiKey = "<< Your LoginRadius API Key>>";

const handlers = {
  LaunchRequest: function() {
    //Upon launch check if Alexa has an Access Token
    if (this.event.session.user.accessToken) {
      //If Alexa has an Access Token let's try to pull that person's profile

      const token = this.event.session.user.accessToken;
      const queryStringsObj = {
        apikey: apiKey,
        access_token: token,
      };
      const options = {
        method: 'GET',
        url: 'https://api.loginradius.com/identity/v2/auth/account',
        qs: queryStringsObj,
      };

      request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const profile = JSON.parse(body);
          this.response.speak(
            `Hi ${
              profile.FirstName
            } welcome back to the LoginRadius Demo, you are logged in, thanks for trying this demo`
          );
        } else {
          this.response
            .speak(
              "Welcome to the LoginRadius Demo, You aren't logged in, I have sent the account linking card to your Alexa application to login."
            )
            .linkAccountCard();
        }
        this.emit(':responseReady');
      });
    } else {
      this.response
        .speak(
          "Welcome to the LoginRadius Demo, You aren't logged in, I have sent the account linking card to your Alexa application to login."
        )
        .linkAccountCard();
      this.emit(':responseReady');
    }
  }
};

exports.handler = function(event, context) {
  const alexa = Alexa.handler(event, context);
   	alexa.APP_ID = alexaAppid;
  // To enable string internationalization (i18n) features, set a resources object.
  // alexa.resources = languageStrings;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
