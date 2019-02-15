IdentityManager.Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'register': 'newRegistration',
      'login': 'login',
      'social-login': 'socialLogin',
      'forgot-password': 'forgotPassword',
      'profile': 'showProfile',
      'email-verification': 'emailVerification',
      'reset-password': 'resetPassword',
    }
  });