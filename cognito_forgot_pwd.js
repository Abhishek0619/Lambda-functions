'use strict';

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

/**
 * ForgotPassword
 * @param clientId = Client Id of the user pool
 * @param userId => User's email address or phone number
 * @returns {Promise<Object>} HTTP Response 200 OK
 */
 
 exports.handler = async (event) => { 
 
 //Forgot Password Parameters
    const params = {
        ClientId: event.clientId,
        Username: event.userId
    }
      // Execution flow
  const result = await cognito.forgotPassword(params).promise().catch(error => {
    throw error;
  });
        var verificationCode = prompt('Please input verification code ' ,'');
        var newPassword = prompt('Enter new password ' ,'');
        cognito.confirmPassword(verificationCode, newPassword, this);
            
  
    // HTTP Response Edit as required
  return {
    statusCode: 200,
  };
};
