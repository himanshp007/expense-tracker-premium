const AWS = require('aws-sdk');
require('dotenv').config();

exports.uploadToS3 = (data, filename) => {
    return new Promise((resolve, reject) => {
        let s3bucket = new AWS.S3({
            accessKeyId: process.env.IAM_USER,
            secretAccessKey: process.env.IAM_SECRET_KEY,
        });

        var params = {
            Bucket: process.env.BUCKET_NAME,
            Key: filename,
            Body: data,
            ACL: 'public-read'
        };

        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log("Something went wrong", err);
                reject(err);
            } else {
                console.log('success', s3response);
                resolve(s3response.Location);
            }
        });
    });
}