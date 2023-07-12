'use strict';

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

/**
 * ConfirmSignUp
 * userId (User's email address or phone number)
 * confCode Verification code sent to email
 * returns {Promise<Object>} HTTP response 200 OK
 */
exports.handler = async (event) => {

  // Parameters
  const params = {
    ClientId: event.clientId, // Enter your App Client Id
    Username: event.userId,
    ConfirmationCode: event.confCode //You can get this code either from your email addr. or mobile
  };

  // Execution 
  const result = await cognito.confirmSignUp(params).promise().catch(error => {
    throw error;
  });

  // HTTP response
  return {
    statusCode: 200,
  };
};
