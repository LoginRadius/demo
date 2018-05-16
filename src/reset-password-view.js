import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class ResetPasswordView extends PolymerElement {
    static get template() {
        return html`
            <style>
            </style>
        
            <h1>Reset Password</h1>
            <div id="resetpassword-container">Loading...</div>
        `;
    }

    ready() {
        super.ready();
        resetpassword_options.onSuccess = function (response) {
            console.log(response);
        }

        resetpassword_options.onError = function (errors) {
            console.log(errors);
        }

        resetpassword_options.container = "resetpassword-container";
        LRObject.init("resetPassword", resetpassword_options);
    }

    _attachDom(dom) {
        this.appendChild(dom);
    }
}

var resetpassword_options = {};
window.customElements.define('reset-password-view', ResetPasswordView);
