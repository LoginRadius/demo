# LoginRadius

![LoginRadius brand image](https://camo.githubusercontent.com/36413f6e558b1d47c3d677b10de2027c55ed9557/687474703a2f2f646f63732e6c72636f6e74656e742e636f6d2f7265736f75726365732f6769746875622f62616e6e65722d31353434783530302e706e67)

LoginRadius is a unified **Customer Identity Management** API platform that combines 30 major social platforms into a single simplified and maintenance-free API. With LoginRadius' API, websites and mobile apps can capture user profile data, enable social login, enable social sharing, add single sign-on and implement many more features.

## Preact Demo
This demo shows how to use the LoginRadius JavaScript library - available through CDNs - in the context of the Preact framework. For simplicity purposes, this demo implements only some of all of the functionality available through the LoginRadius JavaScript library, including:
 
- Registration
- Login
- Social login
- Password reset ('forgot password')
- Request email verification resend
- Password change
- Email management.

## How to Run

**Requirement**  
You need have previously installed Node.js in order to run this demo. You can download Node.js here: <https://nodejs.org/en/> 

**Steps**:

1. Modify the file under ./src/util/config.json by filling in your credentials. Specifically, you need to provide three credentials associated with your account: LoginRadius API key, application name, and SOTT. You can find these credentials on your LoginRadius dashboard.
2. On a terminal or command prompt:
	* Navigate to the base directory of the repository.
	* Type: `npm install`.
	* After package installation, type: `npm run build`.
	* After build, type: `npm start`.

## Documentation 
For more details about this demo, please visit the [Preact Demo Document](https://docs.loginradius.com/api/v2/deployment/demos/preact-demo).




