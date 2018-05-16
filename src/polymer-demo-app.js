import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/iron-pages/iron-pages.js";
import "@polymer/iron-selector/iron-selector.js";

class PolymerDemoApp extends PolymerElement {
    static get template() {
        return html`
            <style>
                .iron-selected {
                    font-weight: bold;
                }
            </style>
            <app-location route="{{route}}"></app-location>
            <app-route
                route="{{route}}"
                pattern="/:view"
                data="{{routeData}}"
                tail="{{subroute}}"></app-route>
            
            <h2>LoginRadius Polymer Demo Application</h2>
            <iron-selector selected="[[view]]" attr-for-selected="name">
                <a name="login" href="login" class="btn btn-lg">Login</a>
                <a name="registration" href="registration" class="btn btn-lg">Registration</a>
                <a name="forgot-password" href="forgot-password" class="btn btn-lg">Forgot Password</a>
                <a name="email-verification" href="email-verification" class="btn btn-lg">Email Verification</a>
                <a name="reset-password" href="reset-password" class="btn btn-lg">Reset Password</a>
                <a name="social-login" href="social-login" class="btn btn-lg">Social Login</a>
            </iron-selector>
            <iron-pages selected="[[view]]" attr-for-selected="name">
                <login-view name="login"></login-view>
                <registration-view name="registration"></registration-view>
                <forgot-password-view name="forgot-password"></forgot-password-view>
                <email-verification-view name="email-verification"></email-verification-view>
                <reset-password-view name="reset-password"></reset-password-view>
                <social-login-view name="social-login"></social-login-view>
            </iron-pages>
        `;
    }

    static get properties() {
        return {
            view: {
                type: String,
                reflectToAttribute: true,
                observer: "_viewChanged"
            },
            routeData: Object,
            subroute: Object,
        };
    }

    static get observers() {
        return [
            "_routeViewChanged(routeData.view)",
        ];
    }

    ready() {
        super.ready();
    }

    _attachDom(dom) {
        this.appendChild(dom);
    }

    // Default to login view if no/invalid view.
    _routeViewChanged(view) {
        if (["login", "registration", "forgot-password", "email-verification", "reset-password", "social-login"].indexOf(view) !== -1) {
            this.view = view;
        } else {
            this.view = "login";
        }
    }

    _viewChanged(view) {
        switch (view) {
            case "login":
                import("../src/login-view.js");
                break;
            case "registration":
                import("../src/registration-view.js");
                break;
            case "forgot-password":
                import("../src/forgot-password-view.js");
                break;
            case "email-verification":
                import("../src/email-verification-view.js");
                break;
            case "reset-password":
                import("../src/reset-password-view.js");
                break;
            case "social-login":
                import("../src/social-login-view.js");
                break;
        }
    }
}

window.customElements.define('polymer-demo-app', PolymerDemoApp);
