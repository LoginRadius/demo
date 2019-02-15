IdentityManager.Views.ResetPassword = Backbone.View.extend({
    template: _.template($('#tpl-reset-password').html()),
  
    onSuccess: function(response) {
      //On Success
      console.log(response);
      alert("Password successfully updated");
      this.trigger('rpSuccess',{});
    },

    onError: function(errors) {
      //On Errors
      console.log(errors);
      alert(errors[0].Message);
    },
  
    render: function() {
      var html = this.template();
      this.$el.html(html);

      var resetpassword_options = {};
      resetpassword_options.container = "resetpassword-container";
      resetpassword_options.onSuccess = this.onSuccess.bind(this);
      resetpassword_options.onError =  this.onError.bind(this);

      LRObject.init("resetPassword", resetpassword_options);
  
      return this;
    }
  });