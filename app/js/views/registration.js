IdentityManager.Views.Registration = Backbone.View.extend({
    template: _.template($('#tpl-registration').html()),

    onRegistrationSuccess: function(response) {
      //On Success
      console.log(response);
      alert("Account successfully created.");
      this.trigger('registerSuccess');
    },

    onRegistrationError: function(errors) {
      //On Errors
      console.log(errors);
      alert(errors[0].Message);
    },
  
    render: function() {
      var html = this.template();
      this.$el.html(html);

      var registration_options = {}
      registration_options.onSuccess = this.onRegistrationSuccess.bind(this);
      registration_options.onError = this.onRegistrationError.bind(this);
      registration_options.container = "register-div";
      
      LRObject.init("registration",registration_options);
  
      return this;
    }
  });