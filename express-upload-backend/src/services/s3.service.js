const s3 = require("../config/awsConfig");
const { v4: uuidv4 } = require("uuid");

exports.uploadToS3 = (file, callback) => {
  const fileExtension = file.originalname.split(".").pop();
  const newFileName = `${uuidv4()}.${fileExtension}`;

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: newFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  s3.upload(uploadParams, callback);
};

exports.listAllFromS3 = (callback) => {
  const listParams = {
    Bucket: process.env.S3_BUCKET_NAME,
  };

  s3.listObjectsV2(listParams, callback);
};
