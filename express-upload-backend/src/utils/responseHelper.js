/**
 * A helper function to send structured error responses.
 *
 * @param {Object} res - The express response object.
 * @param {string} message - The error message to send in the response.
 * @param {number} [statusCode=500] - The HTTP status code for the response (defaults to 500).
 */
const sendErrorResponse = (res, message, statusCode = 500) => {
    res.status(statusCode).json({
      status: "error",
      message: message,
    });
  };
  
  // Export the function for use in other parts of the application.
  module.exports = {
    sendErrorResponse,
  };
  