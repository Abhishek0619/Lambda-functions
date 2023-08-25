const AWS = require('aws-sdk');
const SES = new AWS.SES();

exports.handler = async (event, context) => {
    const params = {
        Destination: {
            ToAddresses: ['recipient@example.com']
        },
        Message: {
            Body: {
                Text: { Data: 'This is the email content.' }
            },
            Subject: { Data: 'Subject of the email' }
        },
        Source: 'sender@example.com'
    };

    try {
        await SES.sendEmail(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify('Email sent successfully'),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify('Error sending email'),
        };
    }
};
