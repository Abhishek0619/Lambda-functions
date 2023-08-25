const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const Sharp = require('sharp');

exports.handler = async (event, context) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    try {
        const image = await S3.getObject({ Bucket: bucket, Key: key }).promise();
        const resizedImage = await Sharp(image.Body).resize(300, 200).toBuffer();

        await S3.putObject({
            Bucket: bucket,
            Key: `resized/${key}`,
            Body: resizedImage
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify('Image resized and saved'),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify('Error resizing image'),
        };
    }
};

