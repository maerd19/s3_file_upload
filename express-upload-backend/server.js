const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

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
    // Here, req.file contains the uploaded file data in memory
    // You'd typically use an AWS SDK to upload the file to S3 from here
    // Simulating a successful upload response for now
    res.json({ status: "File received on server!" });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
