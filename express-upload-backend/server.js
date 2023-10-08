const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();
const port = 3001;

// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

const storage = multer.memoryStorage(); // Use memory storage for temporary holding
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 // Limit file size to 1MB
    },
    fileFilter: function (req, file, callback) {
        // Add server-side file type validation here, similar to the frontend
        callback(null, true);
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;

    // Set up the payload to send the file to S3
    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file.originalname, // Filename to save as on S3
        Body: file.buffer,
        ContentType: file.mimetype
    };

    s3.upload(uploadParams, function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ status: "Success", url: data.Location });
        }
    });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
