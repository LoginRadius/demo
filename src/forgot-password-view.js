import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class ForgotPasswordView extends PolymerElement {
    static get template() {
        return html`
            <style>
            </style>
        
            <h1>Forgot Password</h1>
            <div id="forgotpassword-container">Loading...</div>
        `;
    }

    ready() {
        super.ready();
        forgotpassword_options.onSuccess = function (response) {
            console.log(response);
        }

        forgotpassword_options.onError = function (errors) {
            console.log(errors);
        }

        forgotpassword_options.container = "forgotpassword-container";
        LRObject.init("forgotPassword", forgotpassword_options);
    }

    _attachDom(dom) {
        this.appendChild(dom);
    }
}

var forgotpassword_options = {};
window.customElements.define('forgot-password-view', ForgotPasswordView);
