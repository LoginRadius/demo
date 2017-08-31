<template>
    <div id="register">
        <div v-if="toggleRegister" id="register_true">
            <hr />
            <h3>Register</h3>
            <div id="registration-container"></div>
            <button v-on:click = "toggle">Back</button>
            <hr />
        </div>
        <div id="register_false" v-else>
            <button v-on:click="toggle">Register</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ResendEmail',
        methods: {
            toggle() {
                this.toggleRegister = !this.toggleRegister;
            }
        },
        data() {
            return {
                toggleRegister: false
            }
        },
        updated() {
            if (this.toggleRegister) {
                var registration_options = {};
                registration_options.container = 'registration-container';
                registration_options.onSuccess = function (response) {
                    console.log(response);
                };
                registration_options.onError = function (errors) {
                    console.log(errors);
                };
                LRObject.init('registration', registration_options);
            }
        }
    }

</script>