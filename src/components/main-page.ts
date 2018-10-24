import {getLRObject} from 'util/utilities';
import {config} from 'util/config';

export class MainPage {
    private LoginRadius: any;
    public traditionalLoginContainerID: string = 'login_container';
    public socialLoginContainerID: string = 'social_login_container';
    public interfaceContainerDivID: string = 'interfacecontainerdiv';
    public socialLoginTemplateID: string = 'social_login_custom_emplate';
    public loginMenuID: string = 'login_menu';
    public forgotPasswordMenuID: string = 'forgot_pw_menu';
    public forgotPWContainerID: string = 'forgot_pw_container';
    public registrationMenuID: string = 'registration_menu';
    public registrationContainerID: string = 'registration_container';
    public resetPWMenuID: string = 'reset_pw_menu';
    public resetPWContainerID: string = 'reset_pw_container';
    public loggedInViewID: string = 'logged_in_view';
    public profileContainerID: string = 'profile_container';
    public currentProfile: any;
    public loggedInUserEmail: string;
    public loggedInUserFirstName: string;
    public loggedInUserLastName: string;
    public changePasswordMenuID: string = 'change_pw_menu';
    public changePasswordContainerID: string = 'change_pw_container';

    public MENU_CLASS_NAME = 'menu';

    /** 
     * Initialize all the class's default values to be used for displaying the main page of the
     * application.
     */
    constructor() {
        this.LoginRadius = getLRObject();
    }

    /** 
     * Calls the init method of the LoginRadius object to display the standard login form and the social login functionality. 
     * This callback is part of the component lifecycle and is called when the view of this model-view has been displayed.
     */
    attached() {
        this.hideMenus();
        let queryString: string = window.location.search;
        if (queryString.length !== 0) {
            if (queryString.indexOf('vtype=emailverification') != -1) {
                this.handleEmailVerification();
            } else if (queryString.indexOf('vtype=reset') != -1) {
                this.handlePasswordReset();
            }
        } else {
            this.initTraditionalLogin();
            this.initSocialLogin();
            this.displayLoginForms();
            this.initForgotPassword();
            this.initRegistration();
        }
    }

    /** 
     * Changes the styling of element whose class is 'menu' so they are not displayed on the browser.
     */
    private hideMenus() {
        var menus = document.getElementsByClassName(this.MENU_CLASS_NAME);
        for (var i = 0; i < menus.length; i++) {
            menus[i].setAttribute('style', 'display: none');
        }
    }

    /**
     * Displays the standard login and social login forms/menus.
     */
    private displayLoginForms() {
        this.displayElementAsBlock(this.loginMenuID);
        this.displayElementAsBlock(this.socialLoginContainerID);
    }

    /**
     * Changes the styling of the element whose ID is passed to display it as a block.
     * @param elementID ID of HTML element whose style is to be changed to display it as a block.
     */
    private displayElementAsBlock(elementID: string) {
        document.getElementById(elementID).setAttribute('style', 'display: block');
    }

    /**
     * Hide the HTML DOM element whose id passed as an argument.
     * @param elementID ID of element to be hidden.
     */
    private hideElement(elementID: string) {
        document.getElementById(elementID).setAttribute('style', 'display: none');
    }

    /** 
     * Initializes the traditional login functionality with the configuration specific for the app.
     */
    private initTraditionalLogin() {
        var login_options: any = {};
        login_options.onSuccess = (response) => this.displayProfile(response);
        login_options.onError = (errors) => MainPage.commonErrorHandling(errors);
        login_options.container = this.traditionalLoginContainerID;
        this.LoginRadius.util.ready(
            () => this.LoginRadius.init('login', login_options)
        );
    }

    /** 
     * Initializes the social login functionality with the configuration needed for the app.
     */
    private initSocialLogin() {
        var sl_options:any = {};
        // For this demo, we are simply logging to the console the response we get from social login attempts:
        sl_options.onSuccess = (response) => this.displayProfile(response);
        sl_options.onError = (errors) => MainPage.commonErrorHandling(errors);
        sl_options.container = this.socialLoginContainerID;
        this.LoginRadius.util.ready(
            () => this.LoginRadius.init('socialLogin', sl_options)
        );

        var customInterfaceOption: any = {};
        customInterfaceOption.templateName = this.socialLoginTemplateID;
        this.LoginRadius.util.ready(
            () => this.LoginRadius.customInterface('.' + this.interfaceContainerDivID, customInterfaceOption)
        );
    }

    /**
     * Initializes the forgot password functionality with the configuration needed for the app.
     */
    private initForgotPassword() {
        var forgotPW_options: any = {};
        forgotPW_options.onSuccess = (response) => {
            console.log(response);
            alert('Email has been sent to your provided email address, please check your email for further instructions');
        }
        forgotPW_options.onError = (errors) => MainPage.commonErrorHandling(errors);
        forgotPW_options.container = this.forgotPWContainerID;

        this.LoginRadius.util.ready(
            () => this.LoginRadius.init('forgotPassword', forgotPW_options)
        );
    }

    /**
     * Initializes the registration functionality with the configuration neededfor the app.
     */
    private initRegistration() {
        var registration_options: any = {};
        registration_options.onSuccess = (response) => {
            console.log(response);
            alert('A verification email has been sent to your provided email address, please check your email for further instructions');
        }
        registration_options.onError = (errors) => MainPage.commonErrorHandling(errors);
        registration_options.container = this.registrationContainerID;

        this.LoginRadius.util.ready(
            () => this.LoginRadius.init('registration', registration_options)
        );
    }

    /** 
     * Handles the click event on the forgot password link by displaying a menu with the forgot password form and hiding all other menus.
     */
    private forgotPasswordClicked() {
        this.hideMenus();
        this.displayElementAsBlock(this.forgotPasswordMenuID);
    }

    /** 
     * Handles the click event on the create account link by displaying a menu with the registration form and hiding all other menus.
     */
    private createAccountClicked() {
        this.hideMenus();
        this.displayElementAsBlock(this.registrationMenuID);
    }

    /** 
     * Handles the click event on the login link by displaying the login menus (standard login and social login) and hiding all other menus.
     */
    private loginClicked() {
        this.hideMenus();
        this.displayLoginForms();
    }

    /**
     * Handles the click event on the change password link by displaying a form for changing the password.
     */
    private changePasswordClicked() {
        this.hideElement(this.profileContainerID);
        this.displayElementAsBlock(this.changePasswordMenuID);
        var change_pw_options: any = {};
        change_pw_options.onSuccess = (response) => {
            console.log(response);
            alert('Sucessful password change!');
            this.hideElement(this.changePasswordMenuID);
            this.displayElementAsBlock(this.profileContainerID);
        };
        change_pw_options.onError = (errors) => MainPage.commonErrorHandling(errors);
        change_pw_options.container = this.changePasswordContainerID;
        this.LoginRadius.util.ready(
            () => this.LoginRadius.init('changePassword', change_pw_options)
        );
    }

    /**
     * Handles an email verification request.
     */
    private handleEmailVerification() {
        var email_ver_options: any = {};
        email_ver_options.onSuccess = (response) => {
            console.log(response);
            alert('You may log in now.');
            this.reloadHomePage();
        }
        email_ver_options.onError = (errors) => {
            MainPage.commonErrorHandling(errors)
            this.reloadHomePage();
        }
        this.LoginRadius.util.ready(
            () => this.LoginRadius.init('verifyEmail', email_ver_options)
        );
    }

    /**
     * Handles a password reset request by making available to the user a form for them to change their password.
     */
    private handlePasswordReset() {
        var reset_pw_options: any = {};
        reset_pw_options.onSuccess = (response) => {
            console.log(response);
            if(response.IsPosted) {
                alert('Password was reset successfully.');
                this.reloadHomePage();
            }
        }
        reset_pw_options.onError = (errors) => MainPage.commonErrorHandling(errors);
        reset_pw_options.container = this.resetPWContainerID;
        this.LoginRadius.util.ready(
            () => this.LoginRadius.init('resetPassword', reset_pw_options)
        );
        this.displayElementAsBlock(this.resetPWMenuID);
    }


    /**
     * Displays some of the data corresponding to a profile, passed as an argument.
     * @param data Data returned 
     */
    private displayProfile(data: any) {
        this.currentProfile = data;
        console.log(data);
        this.hideMenus();
        this.displayElementAsBlock(this.loggedInViewID);
        this.displayElementAsBlock(this.profileContainerID);
        this.loggedInUserEmail = data.Profile.Email[0].Value || 'No email address available';
        this.loggedInUserFirstName = data.Profile.FirstName || '';
        this.loggedInUserLastName = data.Profile.LastName || '';
    }

    private backToProfile() {
        this.hideElement(this.changePasswordMenuID);
        this.displayElementAsBlock(this.profileContainerID);
    }

    /** 
     * Error handling common to several of the functionalities offered; displays the first error message in the array of errors returned when a request cannot be
     * satisfied.
     * @param errors Array of error objects returned by a LoginRadius API when the request could not be satisfied.
     */
    private static commonErrorHandling(errors: any[]) {
        // For simplicity purposes, only the first  error in the list of errors returned is being displayed in this application. However, you can, 
        //of course, decide to iterate over the array of errors and then display the list of all errors.
        if (errors[0]) {
            MainPage.displayErrorAlert(errors[0]);
        }
    }

    /**
     * Displays as an alert either the Message or the Description property of the error object passed as an argument, whichever is available, and checking is done in that order.
     * @param error Error object returned from a request to the LoginRadius servers.
     */
    private static displayErrorAlert(error: any) {
        alert(error.Message || error.Description || 'Error');
    }

    /**
     * Reloads the main page by redirecting the user to it.
     */
    private reloadHomePage() {
        window.location.assign(config.homeURL);
    }
}