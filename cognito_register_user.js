'use strict';

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();


/**
 * SignUp
 * @param userId = User's email address or phone number
 * @param userPassword => User's password
 * @returns {Promise<Object>} HTTP Response 200 OK
 */
exports.handler = async (event) => { 

  // SignUp parameters
  const params = {
    ClientId: event.clientId, // Your client ID here
    Username: event.userId, // Must be email or phone number
    Password: event.userPassword, // uppercase letters, lowercase letters, special characters, numbers
    UserAttributes: [
      {Name: "email", Value: event.userId} // Valid email address
    ],
  };

  // Execution flow
  const result = await cognito.signUp(params).promise().catch(error => {
    // Add exception handling as needed
    // For example, the exception when the ID is duplicated is →「error.code == 'UsernameExistsException'」
    throw error;
  });
  
    // HTTP Response Edit as required
  return {
    statusCode: 200,
  };
};
