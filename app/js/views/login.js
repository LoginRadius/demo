IdentityManager.Views.Login = Backbone.View.extend({
    template: _.template($('#tpl-login').html()),
    
    onLoginSuccess: function(response) {
      //On Success
      console.log(response);

      if (typeof response.IsPosted !== 'undefined') {
        alert("Success: Check your email or mobile");
        return;
      }

      this.trigger('loginSuccess', {
        name: response.Profile.FullName, 
        profile: response.Profile, 
        access_token: response.access_token,
        expires_in: response.expires_in, 
        refresh_token: response.refresh_token
      });
    },

    onLoginError: function(errors) {
      //On Errors
      console.log(errors);
      alert(errors[0].Message);
    },
  
    render: function() {
      var html = this.template();
      this.$el.html(html);
    
      var login_options = {}
      login_options.onSuccess = this.onLoginSuccess.bind(this);
      login_options.onError = this.onLoginError.bind(this);
      login_options.container = "login-div";
      
      LRObject.init("login",login_options);
  
      return this;
    }
  });