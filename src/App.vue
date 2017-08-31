<template>
  <div style="text-align:center" id="app">
      <h1>LoginRadius Vue.js Demo</h1>
      <HomePage v-if="this.lr_display === 'none'" v-on:update="updatePage"></HomePage>
      <LoggedIn v-else-if="this.lr_display === 'loggedin'" v-on:update="updatePage"></LoggedIn>
      <EmailVerified v-else-if="this.lr_display === 'emailverified'" v-on:update="updatePage"></EmailVerified>
  </div>
</template>

<script>
    import HomePage from './components/homepage.vue'
    import LoggedIn from './components/loggedin.vue'
    import EmailVerified from './components/email-verified.vue'
    export default {
        name: 'app',
        data() {
            return {
                lr_display: "none"
            }
        },
        methods: {
            updatePage(newData) {
                this.lr_display = newData
            }
        },
        components: {
            HomePage,
            LoggedIn,
            EmailVerified
        },

        mounted() {
            if (window.location.href.includes('?vtype=emailverification')) {
                var verifyemail_options = {};
                verifyemail_options.onSuccess = (response) => {
                    console.log(response);
                    this.lr_display = "emailverified"
                };
                verifyemail_options.onError = function (errors) {
                    console.log(errors);
                };
                window.LRObject.init('verifyEmail', verifyemail_options);
            }
        }
    }
</script>
