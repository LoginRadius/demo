IdentityManager.Views.EmailVerification = Backbone.View.extend({
    template: _.template($('#tpl-email-verification').html()),
  
    onSuccess: function(response) {
      //On Success
      console.log(response);
      alert("Email successfully verified");
      this.trigger('evSuccess',{});
    },

    onError: function(errors) {
      //On Errors
      console.log(errors);
      alert(errors[0].Message);
    },
  
    render: function() {
      var html = this.template();
      this.$el.html(html);
      const url = window.location.href;
      const params = url.split("?")[1];
      const domainName = url.substring(0, url.lastIndexOf("/"));
      let paramsObj = JSON.parse('{"' + decodeURI(params.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
      LRObject.api.emailVerification(paramsObj, this.onSuccess.bind(this), this.onError.bind(this));
  
      return this;
    }
  });