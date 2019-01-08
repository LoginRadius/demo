Meteor.methods({
  getLROptions: () => {
    try {
      response = HTTP.get(`https://api.loginradius.com/identity/v2/manage/account/sott?apikey=${Meteor.settings.LR_VALS.API_KEY}&apisecret=${Meteor.settings.LR_SENSITIVE_VALS.API_SECRET}`);
      const options = {
        apiKey: Meteor.settings.LR_VALS.API_KEY, 
        appName: Meteor.settings.LR_VALS.APP_NAME, 
        hashTemplate:true,
        resetPasswordUrl: Meteor.settings.LR_VALS.BASE_URL + '/reset',
        verificationUrl: Meteor.settings.LR_VALS.BASE_URL + '/confirm',
        sott: response.data.Sott
      }
      return options;
    } catch (error) {
      console.log(error)
      throw new Meteor.Error('Something went wrong.');
    }
  }
})