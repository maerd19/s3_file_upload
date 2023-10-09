const s3Service = require("../services/s3.service");
const sendErrorResponse = require("../utils/responseHelper");

exports.uploadFile = (req, res, next) => {
    if (!req.file) {
        return sendErrorResponse(res, "No file provided.", 400);
    }

    s3Service.uploadToS3(req.file, (err, data) => {
        if (err) {
            return next(err); // Pass the error to your generic error handler
        }
        res.json({ status: "success", url: data.Location });
    });
};

exports.getAllFiles = (req, res, next) => {
    s3Service.listAllFromS3((err, data) => {
        if (err) {
            return next(err); // Pass the error to your generic error handler
        }
        const fileUrls = data.Contents.map(file => {
            return `${process.env.S3_BUCKET_URL}/${file.Key}`;
        });
        res.json(fileUrls);
    });
};