IdentityManager.Views.SocialLogin = Backbone.View.extend({
    template: _.template($('#tpl-social-login').html()),

    onRegistrationSuccess: function(response) {
      //On Success
      console.log(response);
      this.trigger('loginSuccess', {
        name: response.Profile.FullName, 
        profile: response.Profile, 
        access_token: response.access_token,
        expires_in: response.expires_in, 
        refresh_token: response.refresh_token
      });
    },

    onRegistrationError: function(errors) {
      //On Errors
      console.log(errors);
      alert(errors[0].Message);
    },
  
    render: function() {
      var html = this.template();
      this.$el.html(html);

      var custom_interface_option = {};
      custom_interface_option.templateName = 'loginradiuscustom_tmpl';
            
      var sl_options = {};
      sl_options.onSuccess = this.onRegistrationSuccess.bind(this);
      sl_options.onError = this.onRegistrationError.bind(this);
      sl_options.container = "sociallogin-container";

      // add some rendering delay, as backbonejs take some time to render parent component(interfacecontainerdiv)
      setTimeout(function() {
        LRObject.customInterface(".interfacecontainerdiv", custom_interface_option);
        LRObject.init('socialLogin', sl_options);
      }, 100);
  
      return this;
    }
  });