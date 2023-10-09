const sendErrorResponse = require("../utils/responseHelper");

module.exports = (err, req, res, next) => {
    console.error("Internal Error:", err);
    sendErrorResponse(res, "Internal server error.");
};
