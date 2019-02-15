IdentityManager.Views.ForgotPassword = Backbone.View.extend({
    template: _.template($('#tpl-forgot-password').html()),
  
    onSuccess: function(response) {
      //On Success
      console.log(response);
      alert("Success: Check your email or mobile");
      this.trigger('fpSuccess',{});
    },

    onError: function(errors) {
      //On Errors
      console.log(errors);
      alert(errors[0].Message);
    },
  
    render: function() {
      var html = this.template();
      this.$el.html(html);

      var fp_options = {}
      fp_options.onSuccess = this.onSuccess.bind(this);
      fp_options.onError = this.onError.bind(this);
      fp_options.container = "forgot-password-div";
      
      LRObject.init("forgotPassword",fp_options);
  
      return this;
    }
  });