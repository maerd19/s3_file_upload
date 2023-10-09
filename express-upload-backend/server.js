const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
const port = 3001;

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// A helper function to send structured error responses
const sendErrorResponse = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    status: "error",
    message: message,
  });
};

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

const storage = multer.memoryStorage(); // Use memory storage for temporary holding
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024, // Limit file size to 1MB
  },
  // Add additional server-side file type validation if required
}).single("file"); // Moved the multer middleware out for improved error handling

app.post("/upload", (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return sendErrorResponse(
          res,
          "File size exceeds the allowable limit.",
          400
        );
      }
      return sendErrorResponse(res, "File upload failed.", 400);
    } else if (err) {
      return sendErrorResponse(res, "File upload failed.", 400);
    }

    const file = req.file;
    if (!file) {
      return sendErrorResponse(res, "No file provided.", 400);
    }

    // Generate a new unique filename based on UUID, while preserving the file extension
    const fileExtension = file.originalname.split(".").pop();
    const newFileName = `${uuidv4()}.${fileExtension}`;

    // Set up the payload to send the file to S3
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: newFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    s3.upload(uploadParams, function (s3Err, data) {
      if (s3Err) {
        console.error("S3 Error:", s3Err); // Log the detailed error on the server
        return sendErrorResponse(res, "Failed to store the file.");
      } else {
        res.json({ status: "success", url: data.Location });
      }
    });
  });
});

// Generic error handler for any other errors (e.g., database errors)
app.use((err, req, res, next) => {
  console.error("Internal Error:", err);
  sendErrorResponse(res, "Internal server error.");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
