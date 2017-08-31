<template>
    <div id="loggedIn">
        <h1>Logged In!</h1>
        <button v-on:click="updateView">Log Out</button>
    </div>
</template>

<script>
    export default {
        name: 'LoggedIn',
        methods: {
            updateView() {
                this.$emit("update","none")
            }
        },
        data() {
            return {

            }
        }
    }
</script>