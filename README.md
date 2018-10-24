# LoginRadius Aurelia Demo

## LoginRadius

![LoginRadius brand image](https://camo.githubusercontent.com/36413f6e558b1d47c3d677b10de2027c55ed9557/687474703a2f2f646f63732e6c72636f6e74656e742e636f6d2f7265736f75726365732f6769746875622f62616e6e65722d31353434783530302e706e67)

LoginRadius is a unified **Customer Identity Management** API platform that combines 30 major social platforms into a single simplified and maintenance-free API. With LoginRadius' API, websites and mobile apps can capture user profile data, enable social login, enable social sharing, add single sign-on and implement many more features.

## Aurelia Demo
This demo shows how to use the LoginRadius JavaScript library - available through CDNs - in the context of the Aurelia framework. The following functionalities are implemented:

1. Login
2. Social Login
3. Registration
4. Email verification
5. Password reset ('forgot password')
6. Password change


*Note*: After successfully logging in, this demo displays the email ID, first name, and last name associated with the account. Of course, your application does not have be limited to displaying only these fields after retrieving user data. Only these values have been displayed in this demo to keep it simple.

## How to Run

**Requirement**  
You need to have previously installed Node.js in order to run this demo. You can download Node.js here: <https://nodejs.org/en/> 

**Steps**:

1. Modify the file under src/util/config.ts by filling in your credentials. Specifically, you need to provide three credentials associated with your account: LoginRadius API key, application name, and SOTT. You can find these credentials on your LoginRadius dashboard.
2. On a terminal or command prompt:
	* Navigate to the base directory of the repository.
	* Type: `npm install`.
	* Type: `npm install -g aurelia-cli`. (You might have to do `sudo npm install -g aurelia-cli` for permission reasons)
	* Type: `au run`. 

## Documentation
For more details about this demo, please visit the [Aurelia Demo Document](https://docs.loginradius.com/api/v2/deployment/demos/aurelia-demo).