import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class EmailVerificationView extends PolymerElement {
    static get template() {
        return html`
            <style>
            </style>
        
            <h1>Email Verification</h1>
            <div>This is the Email Verification page, it should alert you on success.</div>
        `;
    }

    ready() {
        super.ready();
        verifyemail_options.onSuccess = function (response) {
            console.log(response);
        }

        verifyemail_options.onError = function (errors) {
            console.log(errors);
        }

        LRObject.init("verifyEmail", verifyemail_options);
    }

    _attachDom(dom) {
        this.appendChild(dom);
    }
}

var verifyemail_options = {};
window.customElements.define('email-verification-view', EmailVerificationView);
