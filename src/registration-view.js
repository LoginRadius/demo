import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class RegistrationView extends PolymerElement {
    static get template() {
        return html`
            <style>
            </style>
        
            <h1>Registration</h1>
            <div id="registration-container">Loading...</div>
        `;
    }

    ready() {
        super.ready();
        registration_options.onSuccess = function (response) {
            console.log(response);
        }

        registration_options.onError = function (errors) {
            console.log(errors);
        }

        registration_options.container = "registration-container";
        LRObject.init("registration", registration_options);
    }

    _attachDom(dom) {
        this.appendChild(dom);
    }
}

var registration_options = {};
window.customElements.define('registration-view', RegistrationView);
