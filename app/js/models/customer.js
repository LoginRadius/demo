IdentityManager.Models.Customer = Backbone.Model.extend({
    defaults: {
      name: null,
      profile: null,
      access_token: null,
      expires_in: null,
      refresh_token: null
    }
  });