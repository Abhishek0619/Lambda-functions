const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const pdf = require('html-pdf');

exports.handler = async (event, context) => {
    const htmlContent = '<html><body><h1>Hello PDF!</h1></body></html>';
    const pdfBuffer = pdf.create(htmlContent).toBuffer();

    const params = {
        Bucket: 'pdf-bucket',
        Key: 'example.pdf',
        Body: pdfBuffer
    };

    try {
        await S3.putObject(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify('PDF generated and stored'),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify('Error generating or storing PDF'),
        };
    }
};

