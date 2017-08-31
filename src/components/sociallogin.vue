<template>
    <div id="login">
        <div v-if="toggleSocial" id="sociallogin_true">
            <hr/>
            <h3>Social Login</h3>
            <div id="interfacecontainerdiv" class="interfacecontainerdiv"></div>
            <div id="sociallogin-container"></div>
            <button v-on:click="toggle">Back</button>
            <hr/>
        </div>
        <div id="sociallogin_false" v-else>
            <button v-on:click="toggle">Social Login</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Social-Login',
        methods: {
            toggle() {
                this.toggleSocial = !this.toggleSocial;
            }
        },
        data() {
            return {
                toggleSocial: false
            }
        },
        updated() {
            if (this.toggleSocial) {
                var sociallogin_options = {};
                sociallogin_options.templateName = 'loginradiuscustom_tmpl';
                sociallogin_options.container = 'sociallogin-container';
                sociallogin_options.onSuccess = function (response) {
                    console.log(response);
                };
                sociallogin_options.onError = function (errors) {
                    console.log(errors);
                };
                window.LRObject.customInterface('.interfacecontainerdiv', sociallogin_options);
                window.LRObject.init('socialLogin', sociallogin_options);
            }
        }
    }

</script>