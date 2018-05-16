import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class LoginView extends PolymerElement {
    static get template() {
        return html`      
            <h1>Login</h1>
            <div id="login-container">Loading...</div>
        `;
    }

    ready() {
        super.ready();
        login_options.onSuccess = function (response) {
            console.log(response);
        }

        login_options.onError = function (errors) {
            console.log(errors);
        }

        login_options.container = "login-container";
        LRObject.init("login", login_options);
    }

    _attachDom(dom) {
        this.appendChild(dom);
    }
}

var login_options = {};
window.customElements.define('login-view', LoginView);
