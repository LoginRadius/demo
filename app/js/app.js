window.IdentityManager = {
    Models: {},
    Collections: {},
    Views: {},
  
    start: function() {
      var customer = new IdentityManager.Models.Customer();
      var router = new IdentityManager.Router();

      loginSuccess = function(attrs) {
        $('#home_url').hide();
        customer.set({
          name: attrs.name, 
          profile: attrs.profile, 
          access_token: attrs.access_token,
          expires_in: attrs.expires_in, 
          refresh_token: attrs.refresh_token
        });
        router.navigate('profile', true);
      };
  
      router.on('route:home', function() {
        var view = new IdentityManager.Views.Home();
        $('.main-container').html(view.render().$el);
      });
  
      router.on('route:newRegistration', function() {
        var regView = new IdentityManager.Views.Registration();
        regView.on('registerSuccess', function(){
          router.navigate('login', true);
        });
        $('.main-container').html(regView.render().$el);
      });
  
      router.on('route:login', function() {
        var loginView = new IdentityManager.Views.Login();
        loginView.on('loginSuccess', loginSuccess);
        $('.main-container').html(loginView.render().$el);
      });

      router.on('route:socialLogin', function() {
        var loginView = new IdentityManager.Views.SocialLogin();
        loginView.on('loginSuccess', loginSuccess);
        $('.main-container').html(loginView.render().$el);
      });

      router.on('route:forgotPassword', function() {
        var fpView = new IdentityManager.Views.ForgotPassword();
        fpView.on('fpSuccess', function(response){
          //router.navigate('', true);
        });
        $('.main-container').html(fpView.render().$el);
      });

      router.on('route:emailVerification', function() {
        var evView = new IdentityManager.Views.EmailVerification();
        evView.on('evSuccess', function(response){
          router.navigate('', true);
        });
        $('.main-container').html(evView.render().$el);
      });

      router.on('route:resetPassword', function() {
        var rpView = new IdentityManager.Views.ResetPassword();
        rpView.on('rpSuccess', function(response){
          router.navigate('', true);
        });
        $('.main-container').html(rpView.render().$el);
      });
  
      router.on('route:showProfile', function() {
        var pView = new IdentityManager.Views.Customer({model: customer});
        pView.on('logout', function() {
          var logout_options= {};
          logout_options.onSuccess = function() {};
          LRObject.init("logout", logout_options);
          
          $('#home_url').show();
          customer.set({
            name: null, 
            profile: null, 
            access_token: null,
            expires_in: null, 
            refresh_token: null
          });
          router.navigate('', true);
        });
        $('.main-container').html(pView.render().$el);
      });
  
      Backbone.history.start();
    }
  };