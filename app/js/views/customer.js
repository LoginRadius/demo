IdentityManager.Views.Customer = Backbone.View.extend({
    template: _.template($('#tpl-profile').html()),

    events: { 'click #logout-customer': 'onClickLogOut' },

    render: function() { 
        var html = this.template(this.model.toJSON()); 
        this.$el.append(html); 
        return this; 
    },

    onClickLogOut: function(e) { 
        e.preventDefault(); 
        this.trigger('logout');
    } 
});