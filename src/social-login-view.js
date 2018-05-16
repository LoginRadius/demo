import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class SocialLoginView extends PolymerElement {
    static get template() {
        return html`
            <style>
            </style>
        
            <h1>Social Login</h1>
            <div id="interfacecontainerdiv" class="interfacecontainerdiv">Loading...</div>
            <div id="sociallogin-container"></div>
        
		    <script type="text/html" id="loginradiuscustom_tmpl">
		        <a class="lr-provider-label" href="javascript:void(0)" onclick="return <#=ObjectName#>.util.openWindow('<#= Endpoint #>');" title="<#= Name #>" alt="Sign in with <#=Name#>">
			        <#=Name#>
		        </a>
		    </script>
        `;
    }

    ready() {
        super.ready();
        custom_interface_options.templateName = "loginradiuscustom_tmpl";
        LRObject.customInterface(".interfacecontainerdiv", custom_interface_options);

        sl_options.onSuccess = function (response) {
            console.log(response);
        }

        sl_options.onError = function (errors) {
            console.log(errors);
        }
                
        sl_options.container = "sociallogin-container";
        LRObject.init("socialLogin", sl_options);
    }

    _attachDom(dom) {
        this.appendChild(dom);
    }
}

var custom_interface_options = {};
var sl_options = {}
window.customElements.define('social-login-view', SocialLoginView);
