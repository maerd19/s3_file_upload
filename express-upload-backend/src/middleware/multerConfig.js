const multer = require("multer");
const sendErrorResponse = require("../utils/responseHelper");

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // Limit to 1MB
}).single("file");

module.exports = (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return sendErrorResponse(res, "File size exceeds the allowable limit.", 400);
            }
            return sendErrorResponse(res, "File upload failed.", 400);
        } else if (err) {
            return sendErrorResponse(res, "File upload failed.", 400);
        }
        next();
    });
};
