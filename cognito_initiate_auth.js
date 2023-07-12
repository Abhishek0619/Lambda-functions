'use strict';

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

/**
 * initiateAuth
 * @param {string} userId User's email address or phone number
 * @param {string} userPassword User's password
 * @returns {Promise<Object>} HTTP Response 200 OK
 */
exports.handler = async (event) => {

  // Initiate Auth parameters
  const params = {
    AuthFlow:'USER_PASSWORD_AUTH', // The authentication method you specified in your user pool
    ClientId: event.clientId, // Enter your App Client Id here
    AuthParameters: {
      USERNAME: event.userId,
      PASSWORD: event.userPassword
    },
  };

  // initiateAuth Execution Flow
  const result = await cognito.initiateAuth(params).promise().catch(error => {
    throw error;
  });

  // HTTP Response Edit as necessary
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Set-Cookie': `IdToken=${result.AuthenticationResult.IdToken}; Max-Age=${result.AuthenticationResult.ExpiresIn}`
    },
    body: JSON.stringify({
      
    }),
  };
};
