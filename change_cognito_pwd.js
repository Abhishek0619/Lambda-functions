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

  // Change Password Parameters
  const params = {
    AccessToken:event.token,  //remember to generate access token using any tools like Postman
    PreviousPassword:event.oldPass,
    ProposedPassword:event.newPass
  };

  // Execution Flow
  const result = await cognito.changePassword(params).promise().catch(error => {
    throw error;
  });

  // HTTP response
  return {
    statusCode: 200,
  };
};
