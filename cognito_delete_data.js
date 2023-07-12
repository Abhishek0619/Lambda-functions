'use strict';

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider({region: ""}); //specify your AWS region here

/**
 * Delete
 * @param poolId = User's Pool  id
 * @param userId => User's email or pone number
 * @returns {Promise<Object>} HTTP Response 200 OK
 */
exports.handler = async (event) => { 

  // SignUp parameters
  const params = {
    UserPoolId:event.poolId,
    Username:event.userId
  };

  // Execution flow
  const result = await cognito.adminDeleteUser(params).promise().catch(error => {
    // Add exception handling as needed
    
    throw error;
  });
  
    // HTTP Response Edit as required
  return {
    statusCode: 200,
  };
};
