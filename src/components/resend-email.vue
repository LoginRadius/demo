<template>
    <div id="resendEmail">
        <div v-if="toggleResend" id="resend_true">
            <hr />
            <h3>Resend Email</h3>
            <div id="resend-email-container"></div>
            <button v-on:click = "toggle">Back</button>
            <hr />
        </div>
        <div id="resend_false" v-else>
            <button v-on:click="toggle">Resend Email Verification</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ResendEmail',
        methods: {
            toggle() {
                this.toggleResend = !this.toggleResend;
            }
        },
        data() {
            return {
                toggleResend: false
            }
        },
        updated() {
            if (this.toggleResend) {
                var resend_email_options = {};
                resend_email_options.container = 'resend-email-container';
                resend_email_options.onSuccess = function (response) {
                    console.log(response);
                };
                resend_email_options.onError = function (errors) {
                    console.log(errors);
                };
                window.LRObject.init('resendVerificationEmail', resend_email_options);
            }
        }
    }

</script>