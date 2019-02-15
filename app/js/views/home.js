IdentityManager.Views.Home = Backbone.View.extend({
    template: _.template($('#tpl-home').html()),
  
    render: function() {
      var html = this.template();
      this.$el.html(html);
      return this;
    }
  });